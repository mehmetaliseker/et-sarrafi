import { browser, delay } from './cdp.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const base = 'http://localhost:3000';
const b = await browser();
const report = { viewports: [], tabs: [], failures: [], errors: [] };
const check = (name, pass, detail) => { if (!pass) report.failures.push({ name, detail }); };

try {
  await mkdir('docs/screenshots/final-revision', { recursive: true });
  for (const [width, height] of [[390, 844], [768, 900], [1440, 900], [1920, 1080], [844, 390]]) {
    await b.viewport(width, height); await b.navigate(base); await delay(450);
    const opening = await b.evaluate(`(() => {
      const rect = s => { const r=document.querySelector(s).getBoundingClientRect(); return {left:r.left,right:r.right,top:r.top,width:r.width,height:r.height}; };
      return {width:document.documentElement.clientWidth, overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,
        gutter:getComputedStyle(document.documentElement).getPropertyValue('--page-gutter').trim(), header:rect('.header-inner .brand'), navEnd:rect('.desktop-nav li:last-child a'), hero:rect('.hero-copy'), story:rect('#home-products-section .home-split-copy'), footer:rect('.footer-main'),
        scale:getComputedStyle(document.querySelector('.hero-image .photo')).transform, rotatingText:document.querySelectorAll('.hero-rotator').length,
        actions:[...document.querySelectorAll('.hero-actions .link-button')].map(x=>({height:x.getBoundingClientRect().height,border:getComputedStyle(x).borderTopWidth,radius:getComputedStyle(x).borderRadius,decoration:getComputedStyle(x).textDecorationLine}))};
    })()`);
    check(`overflow ${width}`, !opening.overflow, opening);
    check(`aligned ${width}`, [opening.hero.left, opening.story.left, opening.footer.left].every(x => Math.abs(x-opening.header.left)<1.01) && (width < 1024 || Math.abs(opening.navEnd.right-(opening.width-opening.header.left))<1.01), opening);
    check(`rotating hero text removed ${width}`, opening.rotatingText === 0, opening);
    check(`button family ${width}`, opening.actions.length === 2 && Math.abs(opening.actions[0].height-opening.actions[1].height)<1 && opening.actions.every(x=>x.border==='1px'&&x.decoration==='none'), opening.actions);
    await b.shot(`docs/screenshots/final-revision/home-${width}-opening.png`);
    await b.evaluate(`scrollTo({top:innerHeight*.25,behavior:'instant'})`); await delay(100);
    const middleScale = await b.evaluate(`getComputedStyle(document.querySelector('.hero-image .photo')).transform`);
    await b.shot(`docs/screenshots/final-revision/home-${width}-mid.png`);
    await b.evaluate(`scrollTo({top:innerHeight*.5,behavior:'instant'})`); await delay(100);
    const finalScale = await b.evaluate(`getComputedStyle(document.querySelector('.hero-image .photo')).transform`);
    check(`scroll zoom ${width}`, opening.scale !== middleScale && middleScale !== finalScale && finalScale.includes('1, 0, 0, 1'), {opening:opening.scale,middleScale,finalScale});
    report.viewports.push({width,height,...opening,middleScale,finalScale});
  }

  for (const width of [390,768,1440,1920]) {
    await b.viewport(width, width===390?844:900); await b.navigate(base+'/tesislerimiz'); await delay(350);
    const initial = await b.evaluate(`({overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth, selected:document.querySelector('[role=tab][aria-selected=true]').textContent, tabLeft:document.querySelector('.facility-tablist').getBoundingClientRect().left, panelLeft:document.querySelector('.facility-panel').getBoundingClientRect().left, gutter:getComputedStyle(document.documentElement).getPropertyValue('--page-gutter').trim()})`);
    check(`facility initial ${width}`, initial.selected==='Et İşleme Tesisi' && !initial.overflow && Math.abs(initial.tabLeft-initial.panelLeft)<1, initial);
    const labels = [];
    for (let index=0; index<4; index++) {
      await b.evaluate(`document.querySelectorAll('[role=tab]')[${index}].click()`); await delay(300);
      labels.push(await b.evaluate(`document.querySelector('[role=tabpanel] h2').textContent`));
    }
    check(`facility tabs ${width}`, labels.join('|')==='Et İşleme Tesisi|Bergama|Foça|Yeniköy', labels);
    report.tabs.push({width,...initial,labels});
    await b.shot(`docs/screenshots/final-revision/facilities-${width}.png`, true);
  }
  for (const width of [390,768,1440,1920]) {
    await b.viewport(width, width===390?844:900);
    for (const route of ['/hakkimizda','/urunler','/hizmet-alanlarimiz','/kalite','/iletisim','/urunler/dana-bonfile']) {
      await b.navigate(base+route); await delay(100);
      const edges = await b.evaluate(`(() => {
        const left = s => { const node=document.querySelector(s); return node?.getBoundingClientRect().left ?? null; };
        const right = s => { const node=document.querySelector(s); return node?.getBoundingClientRect().right ?? null; };
        return {viewport:document.documentElement.clientWidth, overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,
          brand:left('.header-inner .brand'), intro:left('.page-intro .eyebrow'), content:left('main .site-container:not(.page-intro .site-container):not(.header-inner) > :first-child'),
          footer:left('.footer-main'), footerRight:right('.footer-main'), navRight:right('.desktop-nav li:last-child a'),
          catalog:left('.catalog-toolbar'), filters:left('.catalog-filters'), grid:left('.product-grid')};
      })()`);
      const expected = width<390?18:width<768?24:width<1024?36:Math.min(112,Math.max(56,width*.055));
      check(`page edges ${width} ${route}`, !edges.overflow && Math.abs(edges.brand-expected)<1.01 && Math.abs(edges.footer-expected)<1.01 && Math.abs(edges.footerRight-(edges.viewport-expected))<1.01 && (edges.intro===null || Math.abs(edges.intro-expected)<1.01) && (edges.catalog===null || [edges.catalog,edges.filters,edges.grid].every(x=>Math.abs(x-expected)<1.01)) && (width<1024 || Math.abs(edges.navRight-(edges.viewport-expected))<1.01), edges);
    }
  }
  report.errors = b.events.filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error'));
  check('console errors', report.errors.length===0, report.errors);
} finally {
  await writeFile('docs/screenshots/final-revision/report.json', JSON.stringify(report,null,2));
  b.close();
}
console.log(JSON.stringify({failures:report.failures, viewports:report.viewports.map(x=>({width:x.width,gutter:x.gutter,left:x.header.left,scales:[x.scale,x.middleScale,x.finalScale]})),tabs:report.tabs,errors:report.errors.length},null,2));
if (report.failures.length) process.exitCode=1;
