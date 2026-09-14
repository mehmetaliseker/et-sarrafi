import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { browser, delay } from './cdp.mjs';

const client = await browser();
const output = 'docs/screenshots/facilities';
await mkdir(output, { recursive: true });
const report = [];

try {
  for (const width of [1440, 768, 390, 320]) {
    await client.viewport(width, width <= 390 ? 844 : 900);
    await client.navigate('http://127.0.0.1:3000/tesislerimiz');
    const initial = await client.evaluate(`(() => {
      const article = document.querySelector('main article');
      const nav = article.querySelector('nav[aria-label="Tesisler arasında gezinme"]');
      const links = [...nav.querySelectorAll('a')];
      return {
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        heading: article.querySelector('h1').textContent,
        headingCount: article.querySelectorAll('h1').length,
        links: links.map(link => link.getAttribute('href')),
        sectionCount: ['bergama','foca','yenikoy','ornekkoy'].filter(id => !!article.querySelector('#'+id)).length,
        imageCount: article.querySelectorAll('img').length,
        sourceCount: article.textContent.split('Tesis bilgileri:').length - 1,
        breadcrumb: [...article.querySelectorAll('nav[aria-label="Sayfa yolu"] li')].map(item => item.textContent.trim()),
        footerCount: document.querySelectorAll('.site-footer').length,
        closingCount: document.querySelectorAll('section[aria-label="Ürün ve iletişim bilgileri"]').length,
        menuPosition: getComputedStyle(nav.parentElement).position,
      };
    })()`);
    assert.ok(initial.scrollWidth <= initial.width, `${width}px horizontal overflow`);
    assert.equal(initial.heading, 'Tesislerimiz');
    assert.equal(initial.headingCount, 1);
    assert.deepEqual(initial.links, ['#bergama','#foca','#yenikoy','#ornekkoy']);
    assert.equal(initial.sectionCount, 4);
    assert.equal(initial.imageCount, 0);
    assert.equal(initial.sourceCount, 0);
    assert.deepEqual(initial.breadcrumb, ['Ana Sayfa/', 'Tesislerimiz']);
    assert.equal(initial.footerCount, 1);
    assert.equal(initial.closingCount, 1);
    assert.equal(initial.menuPosition, width > 699 ? 'sticky' : 'static');
    await client.shot(`${output}/facilities-${width}-top.png`);

    await client.evaluate(`scrollTo({top:document.querySelector('#yenikoy').offsetTop - 180,behavior:'instant'})`);
    await delay(130);
    const activeAtYenikoy = await client.evaluate(`document.querySelector('nav[aria-label="Tesisler arasında gezinme"] a[aria-current="location"]')?.getAttribute('href')`);
    assert.equal(activeAtYenikoy, '#yenikoy');
    await client.shot(`${output}/facilities-${width}-yenikoy.png`);

    await client.evaluate(`scrollTo({top:document.querySelector('#foca').offsetTop - 180,behavior:'instant'})`);
    await delay(130);
    const activeReverse = await client.evaluate(`document.querySelector('nav[aria-label="Tesisler arasında gezinme"] a[aria-current="location"]')?.getAttribute('href')`);
    assert.equal(activeReverse, '#foca');

    await client.evaluate(`scrollTo({top:document.querySelector('section[aria-labelledby="development-title"]').offsetTop - innerHeight * .3,behavior:'instant'})`);
    await delay(130);
    const boundary = await client.evaluate(`(() => { const menu=document.querySelector('nav[aria-label="Tesisler arasında gezinme"]'); const timeline=document.querySelector('section[aria-labelledby="development-title"]'); return {menuBottom:menu.getBoundingClientRect().bottom,timelineTop:timeline.getBoundingClientRect().top}; })()`);
    assert.ok(boundary.menuBottom <= boundary.timelineTop, `${width}px menu overlaps timeline`);
    await client.shot(`${output}/facilities-${width}-timeline.png`);

    report.push({ ...initial, activeAtYenikoy, activeReverse, boundary });
  }

  await client.viewport(1440, 900);
  await client.navigate('http://127.0.0.1:3000/tesislerimiz#ornekkoy');
  await delay(250);
  const directHash = await client.evaluate(`({hash:location.hash,active:document.querySelector('nav[aria-label="Tesisler arasında gezinme"] a[aria-current="location"]')?.getAttribute('href'),top:document.querySelector('#ornekkoy').getBoundingClientRect().top,headerBottom:document.querySelector('.site-header').getBoundingClientRect().bottom})`);
  assert.equal(directHash.hash, '#ornekkoy');
  assert.equal(directHash.active, '#ornekkoy');
  assert.ok(directHash.top >= directHash.headerBottom, 'hash heading covered by navbar');
  report.push({ directHash });
  for (const id of ['bergama', 'foca', 'yenikoy', 'ornekkoy']) {
    await client.evaluate(`document.querySelector('nav[aria-label="Tesisler arasında gezinme"] a[href="#${id}"]').click()`);
    await delay(900);
    const result = await client.evaluate(`({hash:location.hash,active:document.querySelector('nav[aria-label="Tesisler arasında gezinme"] a[aria-current="location"]')?.getAttribute('href'),top:document.querySelector('#${id}').getBoundingClientRect().top,headerBottom:document.querySelector('.site-header').getBoundingClientRect().bottom})`);
    assert.equal(result.hash, `#${id}`);
    assert.equal(result.active, `#${id}`);
    assert.ok(result.top >= result.headerBottom, `${id} heading covered by navbar`);
    report.push({ clicked: id, ...result });
  }
  await client.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await client.navigate('http://127.0.0.1:3000/tesislerimiz');
  const reducedMotionOpacity = await client.evaluate(`getComputedStyle(document.querySelector('#foca > div')).opacity`);
  assert.equal(reducedMotionOpacity, '1');
  report.push({ reducedMotionOpacity });
  await client.send('Emulation.setEmulatedMedia', { features: [] });
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  client.close();
}
