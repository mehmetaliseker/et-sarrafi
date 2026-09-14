import assert from 'node:assert/strict';
import { browser, delay } from './cdp.mjs';

const client = await browser();
const origin = 'http://127.0.0.1:3000';

async function inspect(path) {
  await client.navigate(origin + path);
  return client.evaluate(`(() => {
    const main = document.querySelector('main');
    const footer = document.querySelector('.site-footer');
    const links = [...footer.querySelectorAll('a')];
    const image = main.querySelector('img');
    return {
      path: location.pathname, width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
      headerBottom: document.querySelector('.site-header').getBoundingClientRect().bottom,
      titleTop: main.querySelector('h1').getBoundingClientRect().top,
      title: main.querySelector('h1').textContent,
      h1Count: main.querySelectorAll('h1').length,
      footerCount: document.querySelectorAll('.site-footer').length,
      closingCount: document.querySelectorAll('section[aria-label="Ürün ve iletişim bilgileri"]').length,
      footerPolicies: links.filter(link => link.getAttribute('href') === '/politikalarimiz').length,
      footerPrivacy: links.filter(link => link.getAttribute('href') === '/politikalarimiz#gizlilik-ve-guvenlik').length,
      navbarPolicies: [...document.querySelectorAll('.site-header a')].filter(link => link.getAttribute('href') === '/politikalarimiz').length,
      imageLoaded: image ? image.complete && image.naturalWidth > 0 : null,
      imageAlt: image?.getAttribute('alt'),
      listLength: main.querySelectorAll('#kalite-ve-helal ol li').length,
      anchors: ['kalite-ve-helal', 'gizlilik-ve-guvenlik', 'cerezler'].map(id => Boolean(document.getElementById(id))),
    };
  })()`);
}

try {
  const report = [];
  for (const width of [1440, 768, 390, 320]) {
    await client.viewport(width, width < 500 ? 844 : 900);
    for (const path of ['/kalite', '/politikalarimiz']) {
      const result = await inspect(path);
      assert.ok(result.scrollWidth <= result.width, `${width}px ${path} horizontal overflow`);
      assert.ok(result.titleTop > result.headerBottom, `${width}px ${path} header overlap`);
      assert.equal(result.h1Count, 1);
      assert.equal(result.footerCount, 1);
      assert.equal(result.closingCount, 1);
      assert.equal(result.footerPolicies, 1);
      assert.equal(result.footerPrivacy, 1);
      assert.equal(result.navbarPolicies, 0);
      if (path === '/kalite') {
        assert.equal(result.title, 'Kalite');
        assert.equal(result.imageLoaded, true);
        assert.ok(result.imageAlt.includes('çiğ et'));
      } else {
        assert.equal(result.title, 'Politikalarımız');
        assert.equal(result.listLength, 12);
        assert.deepEqual(result.anchors, [true, true, true]);
      }
      if (width === 1440 || width === 390) await client.shot(`docs/screenshots/policies/${path.slice(1)}-${width}.png`);
      report.push(result);
    }
  }

  await client.viewport(1440, 900);
  await inspect('/kalite');
  const initialReveal = await client.evaluate(`(() => {
    const rows = [...document.querySelectorAll('main section[aria-label="Kalite yaklaşımımızın temel başlıkları"] > div > div')];
    return { firstTop: rows[0].getBoundingClientRect().top, opacities: rows.map(row => getComputedStyle(row).opacity), lineLeft: getComputedStyle(document.querySelector('.desktop-nav a[href="/kalite"]'), '::after').left };
  })()`);
  assert.deepEqual(initialReveal.opacities, ['0', '0', '0'], 'quality rows appeared before scroll');
  assert.equal(initialReveal.lineLeft, '12px', 'quality navbar underline did not match the label width');
  await client.evaluate(`window.scrollTo({ top: ${Math.round(initialReveal.firstTop - 900 * .6 + 80)}, behavior: 'instant' })`);
  await delay(350);
  const partialReveal = await client.evaluate(`([...document.querySelectorAll('main section[aria-label="Kalite yaklaşımımızın temel başlıkları"] > div > div')].map(row => getComputedStyle(row).opacity))`);
  assert.ok(Number(partialReveal[0]) > 0.5, 'first quality row did not reveal');
  assert.ok(Number(partialReveal[1]) < 0.1, 'second quality row revealed too early');
  await delay(350);
  const secondReveal = await client.evaluate(`([...document.querySelectorAll('main section[aria-label="Kalite yaklaşımımızın temel başlıkları"] > div > div')].map(row => getComputedStyle(row).opacity))`);
  assert.ok(Number(secondReveal[1]) > 0.5, 'second quality row did not reveal after 300ms');
  assert.ok(Number(secondReveal[2]) < 0.5, 'third quality row revealed too early');
  await delay(350);
  const thirdReveal = await client.evaluate(`([...document.querySelectorAll('main section[aria-label="Kalite yaklaşımımızın temel başlıkları"] > div > div')].map(row => getComputedStyle(row).opacity))`);
  assert.ok(Number(thirdReveal[2]) > 0.5, 'third quality row did not reveal after next 300ms');
  await client.evaluate(`window.scrollTo({ top: 0, behavior: 'instant' })`);
  await delay(650);
  const reversedReveal = await client.evaluate(`([...document.querySelectorAll('main section[aria-label="Kalite yaklaşımımızın temel başlıkları"] > div > div')].map(row => getComputedStyle(row).opacity))`);
  assert.deepEqual(reversedReveal, ['0', '0', '0'], 'quality rows did not hide on reverse scroll');
  await client.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  const reducedReveal = await client.evaluate(`([...document.querySelectorAll('main section[aria-label="Kalite yaklaşımımızın temel başlıkları"] > div > div')].map(row => getComputedStyle(row).opacity))`);
  assert.deepEqual(reducedReveal, ['1', '1', '1'], 'quality rows hidden with reduced motion');
  await client.send('Emulation.setEmulatedMedia', { features: [] });

  await inspect('/politikalarimiz');
  await client.evaluate(`window.scrollTo({ top: 900, behavior: 'instant' })`);
  await delay(150);
  const sticky = await client.evaluate(`(() => { const menu=document.querySelector('nav[aria-label="Politika bölümleri"]'); return { position:getComputedStyle(menu.parentElement).position, top:menu.parentElement.getBoundingClientRect().top, header:document.querySelector('.site-header').getBoundingClientRect().bottom }; })()`);
  assert.equal(sticky.position, 'sticky');
  assert.ok(sticky.top > sticky.header, 'policy menu overlaps navbar');
  await client.evaluate(`document.getElementById('gizlilik-ve-guvenlik').scrollIntoView({behavior:'instant'})`);
  await delay(150);
  assert.equal(await client.evaluate(`document.querySelector('nav[aria-label="Politika bölümleri"] a[aria-current="location"]')?.getAttribute('href')`), '#gizlilik-ve-guvenlik');
  await client.evaluate(`document.getElementById('cerezler').scrollIntoView({behavior:'instant'})`);
  await delay(150);
  assert.equal(await client.evaluate(`document.querySelector('nav[aria-label="Politika bölümleri"] a[aria-current="location"]')?.getAttribute('href')`), '#cerezler');
  await client.evaluate(`window.scrollTo({ top: 0, behavior: 'instant' })`);
  await delay(150);
  assert.equal(await client.evaluate(`document.querySelector('nav[aria-label="Politika bölümleri"] a[aria-current="location"]')?.getAttribute('href')`), '#kalite-ve-helal');
  await client.evaluate(`window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })`);
  await delay(150);
  const boundary = await client.evaluate(`(() => ({ menuBottom:document.querySelector('nav[aria-label="Politika bölümleri"]').getBoundingClientRect().bottom, closingTop:document.querySelector('section[aria-label="Ürün ve iletişim bilgileri"]').getBoundingClientRect().top }))()`);
  assert.ok(boundary.menuBottom <= boundary.closingTop, 'policy menu overlaps shared closing');

  await client.viewport(390, 844);
  await inspect('/politikalarimiz');
  await client.evaluate(`document.querySelector('a[href="#gizlilik-ve-guvenlik"]').click()`);
  await delay(2000);
  const target = await client.evaluate(`(() => ({
    hash: location.hash,
    top: document.getElementById('gizlilik-ve-guvenlik').getBoundingClientRect().top,
    header: document.querySelector('.site-header').getBoundingClientRect().bottom,
    scrollY, scrollHeight: document.documentElement.scrollHeight, viewportHeight: innerHeight,
    behavior: getComputedStyle(document.documentElement).scrollBehavior,
    margin: getComputedStyle(document.getElementById('gizlilik-ve-guvenlik')).scrollMarginTop
  }))()`);
  assert.equal(target.hash, '#gizlilik-ve-guvenlik');
  assert.ok(target.top > target.header && target.top < target.header + 100, 'hash section did not settle below navbar');
  assert.equal(await client.evaluate(`document.querySelector('nav[aria-label="Politika bölümleri"] a[aria-current="location"]')?.getAttribute('href')`), '#gizlilik-ve-guvenlik');

  await client.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  assert.equal(await client.evaluate(`getComputedStyle(document.documentElement).scrollBehavior`), 'auto');
  await client.send('Emulation.setEmulatedMedia', { features: [] });

  await client.navigate(origin + '/politikalarimiz#gizlilik-ve-guvenlik');
  await delay(500);
  const direct = await client.evaluate(`(() => ({ hash: location.hash, top: document.getElementById('gizlilik-ve-guvenlik').getBoundingClientRect().top, header: document.querySelector('.site-header').getBoundingClientRect().bottom }))()`);
  assert.equal(direct.hash, '#gizlilik-ve-guvenlik');
  assert.ok(direct.top > direct.header && direct.top < direct.header + 100, 'direct footer hash covered by navbar');

  await inspect('/politikalarimiz');
  await client.evaluate(`document.querySelector('nav[aria-label="Politika bölümleri"] a[href="#gizlilik-ve-guvenlik"]').click()`);
  await delay(900);
  await client.evaluate(`document.querySelector('nav[aria-label="Politika bölümleri"] a[href="#cerezler"]').click()`);
  await delay(900);
  await client.evaluate(`history.back()`);
  await delay(1200);
  assert.equal(await client.evaluate(`location.hash`), '#gizlilik-ve-guvenlik');
  assert.equal(await client.evaluate(`document.querySelector('nav[aria-label="Politika bölümleri"] a[aria-current="location"]')?.getAttribute('href')`), '#gizlilik-ve-guvenlik');

  await inspect('/kalite');
  await client.evaluate(`document.querySelector('a[href="/politikalarimiz"]').click()`);
  await delay(1200);
  const qualityLink = await client.evaluate(`({ path:location.pathname, hash:location.hash, scrollY })`);
  assert.equal(qualityLink.path, '/politikalarimiz');
  assert.equal(qualityLink.hash, '');
  assert.ok(qualityLink.scrollY < 20, 'quality link did not open policy page at top');

  console.log(JSON.stringify({ checked: report.map(item => `${item.path}:${item.width}`), qualityReveal: { initialReveal, partialReveal, secondReveal, thirdReveal, reversedReveal }, sticky, boundary, hashTarget: target, directHash: direct, backNavigation: true, qualityLink }, null, 2));
} finally {
  client.close();
}
