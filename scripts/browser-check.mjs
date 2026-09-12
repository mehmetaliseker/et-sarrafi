import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const baseUrl = process.argv[2] || 'http://127.0.0.1:3000';
if (!['localhost', '127.0.0.1'].includes(new URL(baseUrl).hostname)) throw new Error('Only local preview servers may be tested.');
const routes = ['/', '/hakkimizda', '/urunler', '/tesislerimiz', '/kalite', '/iletisim', '/urunler/dana-bonfile', '/urunler/kuzu-kusleme', '/olmayan-sayfa'];
const outputDirectory = 'docs/screenshots/redesign';
await mkdir(outputDirectory, { recursive: true });
const target = await fetch('http://127.0.0.1:9224/json/new?about:blank', { method: 'PUT' }).then(r => r.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
let nextId = 0;
let currentRoute = '/';
const pending = new Map();
const errors = [];
const failedRequests = [];
const report = { baseUrl, checkedOn: new Date().toISOString(), layouts: [], links: [], menu: [], errors, failedRequests, reducedMotion: null, noJavaScript: [], failures: [] };
socket.onmessage = event => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const request = pending.get(message.id);
    if (!request) return;
    clearTimeout(request.timer);
    pending.delete(message.id);
    if (message.error) request.reject(new Error(JSON.stringify(message.error)));
    else request.resolve(message.result);
  } else if (message.method === 'Runtime.exceptionThrown') errors.push({ route: currentRoute, error: message.params.exceptionDetails });
  else if (message.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(message.params.type)) errors.push({ route: currentRoute, error: message.params });
  else if (message.method === 'Network.responseReceived' && message.params.response.status >= 400) {
    const response = message.params.response;
    if (!(response.status === 404 && new URL(response.url).pathname === '/olmayan-sayfa')) failedRequests.push({ route: currentRoute, url: response.url, status: response.status });
  }
};
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error('Timed out: ' + method)); }, 20000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function waitFor(expression) {
  for (let i = 0; i < 80; i++) {
    if (await evaluate(expression)) return;
    await delay(100);
  }
  throw new Error('Condition not reached: ' + expression);
}
async function navigate(route) {
  currentRoute = route;
  await send('Page.navigate', { url: baseUrl + route });
  await waitFor(`location.pathname === ${JSON.stringify(route)} && document.readyState === 'complete' && !!document.querySelector('h1')`);
  await delay(200);
}
async function key(key, modifiers = 0) {
  const virtualKey = { Tab: 9, Enter: 13, Escape: 27 }[key];
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key, code: key, modifiers, windowsVirtualKeyCode: virtualKey, text: key === 'Enter' ? '\r' : undefined });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code: key, modifiers, windowsVirtualKeyCode: virtualKey });
}
function assert(condition, label) { if (!condition) report.failures.push(label); }
try {
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  for (const width of [1440, 390, 320, 768]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: width < 768 ? 844 : 1000, deviceScaleFactor: 1, mobile: width < 768 });
    for (const route of routes) {
      await navigate(route);
      const layout = await evaluate(`(() => {
        const visible = el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden';
        const anchors = [...document.querySelectorAll('a')];
        const controls = [...document.querySelectorAll('a,button')].filter(visible).filter(el => !el.classList.contains('skip-link'));
        return {
          route: location.pathname, width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
          title: document.title, h1: document.querySelector('h1')?.innerText, h1Count: document.querySelectorAll('h1').length,
          robots: document.querySelector('meta[name="robots"]')?.content,
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          ogTitle: document.querySelector('meta[property="og:title"]')?.content,
          ogDescription: document.querySelector('meta[property="og:description"]')?.content,
          active: [...document.querySelectorAll('.desktop-nav a[aria-current="page"]')].map(a => a.pathname),
          missingHashes: anchors.filter(a => a.hash && a.pathname === location.pathname && !document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a => a.href),
          emptyLinks: anchors.filter(a => !a.getAttribute('href') || a.getAttribute('href') === '#').map(a => a.textContent),
          smallTargets: controls.filter(el => { const r = el.getBoundingClientRect(); return r.width < 44 || r.height < 44; }).map(el => ({ text: el.textContent.trim(), width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height })),
          overflows: [...document.querySelectorAll('body *')].filter(visible).filter(el => !el.classList.contains('skip-link')).filter(el => { const r = el.getBoundingClientRect(); return r.right > innerWidth + 1 || r.left < -1; }).map(el => el.tagName + '.' + el.className).slice(0, 12),
          images: [...document.images].map(i => ({ src: i.currentSrc, loaded: i.complete && i.naturalWidth > 0, alt: i.alt })),
          forms: document.querySelectorAll('form').length,
          hiddenContent: [...document.querySelectorAll('main h1, main h2, main p')].filter(el => !visible(el) || getComputedStyle(el).opacity === '0').map(el => el.textContent),
          prohibitedText: /Tanışalım|Konuşalım|Sohbet edelim|Bir kahve|merhaba de|harikalar yaratalım|Lezzet yolculuğuna|sektör lideri/i.test(document.body.innerText),
          internalLinks: [...new Set(anchors.filter(a => a.origin === location.origin).map(a => a.pathname + a.hash))],
          contactLinks: anchors.filter(a => /^(tel:|mailto:)/.test(a.href)).map(a => a.getAttribute('href')),
          legacyAssets: performance.getEntriesByType('resource').map(r => r.name).filter(url => /et-sarrafi-logo|dana-bonfile.webp|dana-antrikot.webp|kuzu-kusleme.webp|favicon.ico/.test(url)),
        };
      })()`);
      report.layouts.push(layout);
      assert(layout.scrollWidth <= layout.width && !layout.overflows.length, `${route} at ${width}: overflow`);
      assert(layout.h1Count === 1 && !layout.hiddenContent.length, `${route} at ${width}: headings/content`);
      assert(!layout.smallTargets.length, `${route} at ${width}: small touch targets`);
      assert(!layout.missingHashes.length && !layout.emptyLinks.length, `${route} at ${width}: broken anchors`);
      assert(layout.robots?.includes('noindex') && !layout.canonical, `${route}: indexing`);
      assert(!layout.legacyAssets.length && !layout.prohibitedText && !layout.forms, `${route}: scope/content`);
      assert(layout.contactLinks.length >= 2 && layout.contactLinks.every(href => /^tel:\+\d{12}$/.test(href) || /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(href)), `${route}: phone/email links`);
      assert(layout.images.every(image => image.loaded && image.alt), `${route}: image load/alt`);
      if (route !== '/olmayan-sayfa') assert(layout.ogTitle && layout.ogDescription, `${route}: sharing metadata`);
      const expectedActive = route === '/' || route === '/olmayan-sayfa' ? [] : [route.startsWith('/urunler/') ? '/urunler' : route];
      assert(JSON.stringify(layout.active) === JSON.stringify(expectedActive), `${route}: active navigation`);
      if ([1440, 390].includes(width)) {
        const slug = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
        const metrics = await send('Page.getLayoutMetrics');
        const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: metrics.cssContentSize.height, scale: 1 } });
        await writeFile(`${outputDirectory}/${slug}-${width}.png`, Buffer.from(shot.data, 'base64'));
      }
    }
    console.log('Checked all routes at', width);
  }
  const links = [...new Set(report.layouts.flatMap(layout => layout.internalLinks))];
  for (const href of links) {
    const response = await fetch(baseUrl + href);
    const html = await response.text();
    const hash = href.split('#')[1];
    const expectedStatus = href.split('#')[0] === '/olmayan-sayfa' ? 404 : 200;
    const valid = response.status === expectedStatus && (!hash || html.includes(`id="${hash}"`));
    report.links.push({ href, status: response.status, valid });
    assert(valid, 'Broken internal link: ' + href);
  }
  const robots = await fetch(baseUrl + '/robots.txt').then(r => r.text());
  const sitemap = await fetch(baseUrl + '/sitemap.xml').then(r => r.text());
  assert(robots.includes('Disallow: /') && !sitemap.includes('<loc>'), 'Robots/sitemap preview guard');
  assert((await fetch(baseUrl + '/olmayan-sayfa')).status === 404, '404 HTTP status');
  assert((await fetch(baseUrl + '/urunler/olmayan-urun')).status === 404, 'Unknown product HTTP status');
  for (const height of [844, 360]) {
    await send('Emulation.setDeviceMetricsOverride', { width: 390, height, deviceScaleFactor: 1, mobile: true });
    await navigate('/urunler');
    await evaluate('document.querySelector(".menu-trigger").focus()');
    await key('Enter');
    await waitFor('document.querySelector("dialog").open && document.body.style.overflow === "hidden"');
    const opened = await evaluate(`({ expanded: document.querySelector('.menu-trigger').getAttribute('aria-expanded'), focusInside: !!document.activeElement.closest('dialog'), locked: document.body.style.overflow === 'hidden', fits: document.querySelector('dialog').getBoundingClientRect().bottom <= innerHeight })`);
    await evaluate('document.querySelector("dialog button").focus()');
    await key('Tab', 8);
    const backwards = await evaluate('document.activeElement === [...document.querySelectorAll("dialog a")].at(-1)');
    await key('Tab');
    const forwards = await evaluate('document.activeElement === document.querySelector("dialog button")');
    await key('Escape');
    await waitFor('!document.querySelector("dialog").open && document.body.style.overflow !== "hidden"');
    const restored = await evaluate('document.activeElement === document.querySelector(".menu-trigger")');
    await key('Enter');
    await waitFor('document.querySelector("dialog").open');
    await evaluate('document.querySelector("dialog a[href=\\"/iletisim\\"]").focus()');
    const lastReachable = await evaluate('document.activeElement.getBoundingClientRect().bottom <= innerHeight');
    await key('Enter');
    await waitFor('location.pathname === "/iletisim" && !document.querySelector("dialog").open && document.body.style.overflow !== "hidden"');
    report.menu.push({ height, opened, backwards, forwards, restored, lastReachable, navigationCloses: true });
    assert(opened.expanded === 'true' && opened.focusInside && opened.locked && opened.fits && backwards && forwards && restored && lastReachable, 'Mobile keyboard/menu at height ' + height);
  }
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await navigate('/');
  report.reducedMotion = await evaluate('({ scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior, transition: getComputedStyle(document.querySelector(".link-button svg")).transitionDuration })');
  assert(report.reducedMotion.scrollBehavior === 'auto', 'Reduced motion scroll');
  await evaluate('document.activeElement.blur()');
  await send('Page.navigate', { url: baseUrl + '/' });
  await delay(400);
  await key('Tab');
  const skipFocused = await evaluate('document.activeElement.classList.contains("skip-link")');
  await key('Enter');
  const skipWorks = await evaluate('document.activeElement.id === "ana-icerik"');
  report.skipLink = { skipFocused, skipWorks };
  assert(skipFocused && skipWorks, 'Skip link keyboard navigation');
  await send('Emulation.setScriptExecutionDisabled', { value: true });
  for (const route of routes.slice(0, -1)) {
    await navigate(route);
    const state = await evaluate('({ h1Visible: !!document.querySelector("h1").getClientRects().length && getComputedStyle(document.querySelector("h1")).opacity !== "0", footerLinks: [...document.querySelectorAll("footer nav a")].filter(a => a.getClientRects().length).length })');
    report.noJavaScript.push({ route, ...state });
    assert(state.h1Visible && state.footerLinks === 5, 'No-JS access: ' + route);
  }
  await send('Emulation.setScriptExecutionDisabled', { value: false });
  assert(!errors.length && !failedRequests.length, 'Browser console/network errors');
} finally {
  await writeFile(`${outputDirectory}/browser-report.json`, JSON.stringify(report, null, 2));
  socket.close();
  await fetch('http://127.0.0.1:9224/json/close/' + target.id);
}
console.log(JSON.stringify({ layouts: report.layouts.length, links: report.links.length, errors: errors.length, failedRequests: failedRequests.length, failures: report.failures }, null, 2));
if (report.failures.length) process.exitCode = 1;
