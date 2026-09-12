import { browser, delay } from './cdp.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const b = await browser();
const routes = ['/hakkimizda', '/urunler', '/urunler/dana-bonfile', '/tesislerimiz', '/hizmet-alanlarimiz', '/kalite', '/iletisim'];
const report = [];
try {
  await mkdir('docs/screenshots/hero-revision/pages', { recursive: true });
  for (const [width, height] of [[390, 844], [1440, 900]]) {
    await b.viewport(width, height);
    for (const route of routes) {
      await b.navigate('http://localhost:3002' + route); await delay(350);
      const result = await b.evaluate(`(() => ({route:location.pathname,width:document.documentElement.clientWidth,overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,font:getComputedStyle(document.querySelector('h1')).fontFamily,numbered:/\\b0[1-9]\\s*\\//.test(document.body.innerText),broken:[...document.images].filter(image=>image.complete&&image.naturalWidth===0).length,header:document.querySelector('.site-header').className}))()`);
      report.push(result);
      await b.shot(`docs/screenshots/hero-revision/pages/${route.slice(1).replaceAll('/','-')}-${width}.png`);
    }
  }
} finally {
  await writeFile('docs/screenshots/hero-revision/pages-report.json', JSON.stringify(report, null, 2));
  b.close();
}
const failures = report.filter(item => item.overflow || item.h1 !== 1 || !item.font.toLowerCase().includes('onest') || item.numbered || item.broken || !item.header.includes('header-inner-page'));
console.log(JSON.stringify({ checked: report.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
