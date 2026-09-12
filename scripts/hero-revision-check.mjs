import { browser, delay } from './cdp.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const base = 'http://localhost:3002';
const b = await browser();
const report = { layouts: [], interactions: [], failures: [], errors: [] };
const check = (name, passed, detail) => { report.interactions.push({ name, passed: Boolean(passed), detail }); if (!passed) report.failures.push(name); };

try {
  await mkdir('docs/screenshots/hero-revision', { recursive: true });
  for (const [width, height] of [[390, 844], [1440, 900], [1920, 1080], [844, 390]]) {
    await b.viewport(width, height);
    await b.navigate(`${base}?qa=${width}`);
    await b.evaluate(`scrollTo({top:0,behavior:'instant'})`);
    await delay(750);
    const opening = await b.evaluate(`(() => {
      const hero = document.querySelector('.home-hero').getBoundingClientRect();
      const photo = document.querySelector('.hero-backdrop').getBoundingClientRect();
      const header = document.querySelector('.site-header');
      const cue = document.querySelector('.hero-scroll-cue').getBoundingClientRect();
      const rotator = document.querySelector('.hero-rotator').getBoundingClientRect();
      return { width: document.documentElement.clientWidth, height: innerHeight, hero: { x: hero.x, y: hero.y, width: hero.width, height: hero.height }, photo: { x: photo.x, y: photo.y, width: photo.width, height: photo.height }, headerClass: header.className, headerBackground: getComputedStyle(header).backgroundColor, headerColor: getComputedStyle(header).color, cue: { x: cue.x, y: cue.y, width: cue.width, height: cue.height }, rotator: { x: rotator.x, y: rotator.y, width: rotator.width, height: rotator.height }, overflow: document.documentElement.scrollWidth > innerWidth, font: getComputedStyle(document.querySelector('h1')).fontFamily, h1: document.querySelector('h1').textContent };
    })()`);
    report.layouts.push(opening);
    check(`full viewport ${width}`, opening.hero.x === 0 && opening.hero.y === 0 && opening.hero.width === opening.width && opening.hero.height >= height && opening.photo.x === 0 && opening.photo.y === 0 && opening.photo.width === opening.width, opening);
    check(`transparent header ${width}`, opening.headerClass.includes('header-top') && opening.headerBackground === 'rgba(0, 0, 0, 0)' && opening.headerColor === 'rgb(255, 255, 255)', opening);
    check(`centered cue ${width}`, height <= 540 ? opening.cue.width === 0 : Math.abs(opening.cue.x + opening.cue.width / 2 - opening.width / 2) < 1 && opening.cue.y > 0 && opening.cue.y + opening.cue.height <= height, opening.cue);
    check(`Onest and Turkish ${width}`, opening.font.toLowerCase().includes('onest') && opening.h1.includes('Kaynağından başlayan özen.'), opening);
    check(`no overflow ${width}`, !opening.overflow, opening);
    await b.shot(`docs/screenshots/hero-revision/home-${width}-opening.png`);

    await delay(4800);
    const rotatorAfter = await b.evaluate(`(() => { const r=document.querySelector('.hero-rotator').getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height,current:document.querySelector('.hero-rotator-window .is-current').textContent}; })()`);
    check(`rotator stable ${width}`, opening.rotator.x === rotatorAfter.x && opening.rotator.width === rotatorAfter.width && opening.rotator.height === rotatorAfter.height, { before: opening.rotator, after: rotatorAfter });

    await b.evaluate(`scrollTo({top:120,behavior:'instant'})`); await delay(450);
    const scrolled = await b.evaluate(`({className:document.querySelector('.site-header').className,background:getComputedStyle(document.querySelector('.site-header')).backgroundColor,color:getComputedStyle(document.querySelector('.site-header')).color,photoY:document.querySelector('.hero-backdrop').getBoundingClientRect().y})`);
    check(`scrolled header ${width}`, scrolled.className.includes('header-scrolled') && scrolled.background === 'rgb(255, 255, 255)' && scrolled.color === 'rgb(32, 35, 36)' && scrolled.photoY === 0, scrolled);
    await b.shot(`docs/screenshots/hero-revision/home-${width}-scrolled.png`);
    await b.evaluate(`scrollTo({top:0,behavior:'instant'})`); await delay(450);
    check(`header resets ${width}`, await b.evaluate(`document.querySelector('.site-header').classList.contains('header-top')`));
  }

  await b.viewport(1440, 900); await b.navigate(base + '/urunler'); await delay(500);
  const catalog = await b.evaluate(`(() => ({ cards:[...document.querySelectorAll('.product-card')].slice(0,3).map(card=>{const frame=card.querySelector('.media-frame').getBoundingClientRect(); const image=card.querySelector('img'); return {width:frame.width,height:frame.height,padding:getComputedStyle(card.querySelector('.media-frame')).padding,fit:image?getComputedStyle(image).objectFit:null};}),arrows:document.querySelectorAll('.product-card svg').length,overflow:document.documentElement.scrollWidth>innerWidth }))()`);
  check('square filled catalog images', catalog.cards.every(card => Math.abs(card.width-card.height)<1 && card.padding==='0px' && (card.fit===null || card.fit==='contain')) && catalog.arrows===0 && !catalog.overflow, catalog);
  await b.shot('docs/screenshots/hero-revision/catalog-1440.png');

  await b.navigate(base + '/iletisim'); await delay(400);
  check('contact arrows removed', await b.evaluate(`document.querySelectorAll('.contact-channels svg, .address-panel svg').length===0`));
  check('numbered section labels removed', !(await b.evaluate(`document.body.innerText`)).match(/\b0[1-9]\s*\//));
  report.errors = b.events.filter(event => event.method === 'Runtime.exceptionThrown' || event.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(event.params.type));
  check('no console errors', report.errors.length === 0, report.errors);
} finally {
  await writeFile('docs/screenshots/hero-revision/report.json', JSON.stringify(report, null, 2));
  b.close();
}
console.log(JSON.stringify({ layouts: report.layouts.length, interactions: report.interactions.length, failures: report.failures, errors: report.errors.length }, null, 2));
if (report.failures.length) process.exitCode = 1;
