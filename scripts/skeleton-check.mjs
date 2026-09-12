import { browser, delay } from './cdp.mjs';
const b = await browser();
const report = {};
const paused = () => b.events.filter(event => event.method === 'Fetch.requestPaused');
const status = () => b.evaluate(`({ skeletons: document.querySelectorAll('.skeleton').length, ready: document.querySelectorAll('.media-ready').length, errors: document.querySelectorAll('.media-error').length, width: document.querySelector('.hero-image')?.getBoundingClientRect().width, animation: getComputedStyle(document.querySelector('.skeleton') || document.body, '::after').animationName })`);
const waitForPause = async (from) => {
  for (let i = 0; i < 80; i++) { const next = paused().slice(from); if (next.length) return next; await delay(50); }
  throw new Error('Image request was not intercepted');
};
try {
  await b.viewport(390, 844);
  await b.send('Network.setCacheDisabled', { cacheDisabled: true });
  await b.send('Fetch.enable', { patterns: [{ urlPattern: '*_next/image*', requestStage: 'Request' }] });
  let start = paused().length;
  await b.send('Page.navigate', { url: 'http://localhost:3002/?qa=slow' });
  const slowRequests = await waitForPause(start);
  await delay(950);
  report.slow = await status();
  await b.shot('docs/screenshots/revision/skeleton-slow.png');
  for (const request of slowRequests) await b.send('Fetch.continueRequest', { requestId: request.params.requestId });
  await b.send('Fetch.disable');
  await delay(800);
  report.loaded = await status();

  await b.send('Network.setCacheDisabled', { cacheDisabled: false });
  await b.send('Page.navigate', { url: 'http://localhost:3002/?qa=cached' });
  await delay(350);
  report.cached = await status();

  const failureBrowser = await browser();
  try {
    await failureBrowser.viewport(390, 844);
    await failureBrowser.navigate('http://localhost:3002/?qa=failed');
    await failureBrowser.evaluate(`(() => { const image = document.querySelector('.hero-image img'); image.removeAttribute('srcset'); image.src = '/missing-photo-for-qa.webp'; })()`);
    await delay(450);
    report.failed = await failureBrowser.evaluate(`({ skeletons: document.querySelectorAll('.skeleton').length, errors: document.querySelectorAll('.media-error').length })`);
  } finally { failureBrowser.close(); }
  await b.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await b.send('Network.setCacheDisabled', { cacheDisabled: true });
  await b.send('Fetch.enable', { patterns: [{ urlPattern: '*_next/image*', requestStage: 'Request' }] });
  start = paused().length;
  await b.send('Page.navigate', { url: 'http://localhost:3002/?qa=reduced' });
  const reducedRequests = await waitForPause(start);
  await delay(850);
  report.reduced = await status();
  for (const request of reducedRequests) await b.send('Fetch.continueRequest', { requestId: request.params.requestId });
  await b.send('Fetch.disable');
} finally { b.close(); }
console.log(JSON.stringify(report, null, 2));
if (!(report.slow?.skeletons > 0 && report.loaded?.skeletons === 0 && report.loaded?.ready > 0 && report.cached?.skeletons === 0 && report.failed?.skeletons === 0 && report.failed?.errors > 0 && report.reduced?.animation === 'none')) process.exitCode = 1;
