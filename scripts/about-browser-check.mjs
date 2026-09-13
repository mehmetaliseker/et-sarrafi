import { writeFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { browser, delay } from './cdp.mjs';

const browserClient = await browser();
const output = 'docs/screenshots/about-stitch';
await mkdir(output, { recursive: true });
const report = [];

try {
  for (const width of [1440, 768, 390, 320]) {
    const height = width <= 390 ? 844 : 900;
    await browserClient.viewport(width, height);
    await browserClient.navigate('http://127.0.0.1:3000/hakkimizda');
    await browserClient.shot(`${output}/about-${width}-top.png`);
    const summary = await browserClient.evaluate(`(() => {
      const root = document.documentElement;
      const header = document.querySelector('.site-header');
      const main = document.querySelector('main article');
      const hero = document.querySelector('main article img');
      const pair = [...document.querySelectorAll('main article section')].at(-1)?.querySelectorAll('img');
      const cta = document.querySelector('#site-closing-title')?.closest('section');
      const footer = document.querySelector('.site-footer');
      return {
        width: innerWidth,
        scrollWidth: root.scrollWidth,
        headerBottom: header.getBoundingClientRect().bottom,
        contentTop: main.querySelector('p').getBoundingClientRect().top,
        active: [...document.querySelectorAll('.desktop-nav a[aria-current="page"]')].map(a => a.pathname),
        headingCount: document.querySelectorAll('main h1').length,
        images: [...document.querySelectorAll('main article img')].map(i => ({alt:i.alt,loaded:i.complete&&i.naturalWidth>0,width:i.naturalWidth,height:i.naturalHeight})),
        heroHeight: hero.getBoundingClientRect().height,
        pairHeights: [...pair].map(i => i.getBoundingClientRect().height),
        ctaPresent: !!cta,
        footerPresent: !!footer,
        link: [...document.querySelectorAll('main article a')].map(a => a.getAttribute('href')),
        breadcrumbSize: getComputedStyle(document.querySelector('main article a')).fontSize,
        closingTitleCount: document.querySelectorAll('#site-closing-title').length,
      };
    })()`);
    assert.ok(summary.scrollWidth <= summary.width, `${width}px: horizontal overflow`);
    assert.equal(summary.headingCount, 1, `${width}px: expected one h1`);
    assert.equal(summary.images.length, 3, `${width}px: expected three about photos`);
    assert.ok(summary.images.every(image => image.loaded), `${width}px: image failed to load`);
    assert.deepEqual(summary.link, ['/', '/tesislerimiz']);
    assert.equal(summary.breadcrumbSize, '11px');
    assert.equal(summary.closingTitleCount, 1);
    assert.ok(summary.contentTop > summary.headerBottom, `${width}px: intro is covered by navbar`);
    if (width === 1440) assert.deepEqual(summary.active, ['/hakkimizda']);
    for (const [name, selector] of [
      ['overview', '#about-overview-title'],
      ['approach', '#about-approach-title'],
      ['photos', 'main article section[aria-label="Üretim ve ürün görselleri"]'],
      ['footer', '.site-footer'],
    ]) {
      await browserClient.evaluate(`scrollTo(0, document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect().top + scrollY - innerHeight * .32)`);
      await delay(200);
      await browserClient.shot(`${output}/about-${width}-${name}.png`);
    }
    const approach = '#about-approach-title';
    await browserClient.evaluate(`scrollTo(0, document.querySelector('${approach}').getBoundingClientRect().top + scrollY - innerHeight * .40)`);
    await delay(100);
    const enteringOpacity = await browserClient.evaluate(`Number(getComputedStyle(document.querySelector('${approach}').parentElement).opacity)`);
    await browserClient.evaluate(`scrollTo(0, document.querySelector('${approach}').getBoundingClientRect().top + scrollY - innerHeight * .82)`);
    await delay(100);
    const reverseOpacity = await browserClient.evaluate(`Number(getComputedStyle(document.querySelector('${approach}').parentElement).opacity)`);
    assert.ok(enteringOpacity >= .9, `${width}px: reveal did not become visible`);
    assert.ok(reverseOpacity <= .1, `${width}px: reveal did not hide on reverse scroll`);
    summary.reveal = { enteringOpacity, reverseOpacity };
    report.push(summary);
  }
  await browserClient.viewport(390, 500);
  await browserClient.navigate('http://127.0.0.1:3000/hakkimizda');
  await browserClient.evaluate(`document.querySelector('.menu-trigger').click()`);
  const menuOpen = await browserClient.evaluate(`({open:document.querySelector('.menu-dialog').open,locked:document.body.style.position==='fixed',fits:document.querySelector('.menu-dialog').getBoundingClientRect().height<=innerHeight})`);
  assert.deepEqual(menuOpen, { open: true, locked: true, fits: true });
  await browserClient.key('Escape');
  await delay(100);
  const menuClosed = await browserClient.evaluate(`({open:document.querySelector('.menu-dialog').open,locked:document.body.style.position==='fixed'})`);
  assert.deepEqual(menuClosed, { open: false, locked: false });
  report.push({ menuOpen, menuClosed });
  await browserClient.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await browserClient.navigate('http://127.0.0.1:3000/hakkimizda');
  const reducedMotionOpacity = await browserClient.evaluate(`getComputedStyle(document.querySelector('#about-approach-title').parentElement).opacity`);
  assert.equal(reducedMotionOpacity, '1');
  report.push({ reducedMotionOpacity });
  await browserClient.send('Emulation.setEmulatedMedia', { features: [] });
  await browserClient.viewport(1440, 900);
  await browserClient.navigate('http://127.0.0.1:3000/');
  const homepageFooterColor = await browserClient.evaluate(`getComputedStyle(document.querySelector('.site-footer')).backgroundColor`);
  assert.equal(homepageFooterColor, 'rgb(255, 255, 255)', 'Homepage footer should be white');
  report.push({ homepageFooterColor });
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  browserClient.close();
}
