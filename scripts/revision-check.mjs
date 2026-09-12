import { browser, delay } from './cdp.mjs';
import { writeFile } from 'node:fs/promises';
const base = 'http://localhost:3002';
const b = await browser();
const report = { widths: [], images: [], states: [], errors: [], failures: [] };
const assert = (pass, name) => { if (!pass) report.failures.push(name); };
const routes = ['/', '/hakkimizda', '/urunler', '/urunler/dana-bonfile', '/urunler/dana-antrikot', '/urunler/kuzu-kusleme', '/tesislerimiz', '/hizmet-alanlarimiz', '/kalite', '/iletisim'];
try {
  for (const [width,height] of [[320,740],[390,844],[768,1024],[1440,900],[1920,1080],[844,390]]) {
    await b.viewport(width,height);
    for (const route of routes) {
      await b.navigate(base+route); await delay(450);
      const result=await b.evaluate(`(() => {
        const c=document.querySelector('.site-container'),r=c.getBoundingClientRect();
        return {route:location.pathname,width:innerWidth,containerWidth:r.width,contentWidth:r.width-2*parseFloat(getComputedStyle(c).paddingLeft),left:r.left+parseFloat(getComputedStyle(c).paddingLeft),scrollWidth:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),skeletons:document.querySelectorAll('.skeleton').length,photos:document.querySelectorAll('.media-frame img').length,headerWidth:document.querySelector('.header-inner').getBoundingClientRect().width,footerWidth:document.querySelector('.footer-main').parentElement.getBoundingClientRect().width,rad:[...document.querySelectorAll('.media-frame')].slice(0,2).map(i=>getComputedStyle(i).borderRadius)};
      })()`);
      report.widths.push(result);
      assert(result.scrollWidth<=result.width,route+' '+width+' overflow');
      assert(!result.broken.length,route+' '+width+' broken image');
      if (route === '/') {
        await b.shot(`docs/screenshots/revision/home-${width}.png`);
        if (width===1440||width===1920) for(const [state,y] of [['half',height/2],['covered',height]]) {await b.evaluate(`scrollTo({top:${y},behavior:'instant'})`);await delay(300);await b.shot(`docs/screenshots/revision/home-${width}-${state}.png`);}
      }
      if (['/urunler','/hakkimizda','/tesislerimiz','/urunler/dana-bonfile'].includes(route) && [390,1440,1920].includes(width)) await b.shot(`docs/screenshots/revision/${route.slice(1).replaceAll('/','-')}-${width}.png`);
    }
    if (width===1440||width===1920) {
      const r=report.widths.find(x=>x.width===width&&x.route==='/');
      const target=width===1440?1360:1792;
      assert(Math.abs(r.contentWidth-target)<=16,'grid '+width+' target');
      assert(r.headerWidth===r.containerWidth && r.footerWidth===r.containerWidth,'shared grid '+width);
    }
  }
  await b.viewport(1440,900);await b.navigate(base);
  const opening=await b.evaluate("document.querySelector('.hero-backdrop').getBoundingClientRect().y");
  await b.evaluate("scrollTo({top:450,behavior:'instant'})");await delay(150);
  const half=await b.evaluate("({photo:document.querySelector('.hero-backdrop').getBoundingClientRect().y,surface:document.querySelector('.home-surface').getBoundingClientRect().top,header:document.querySelector('header').getBoundingClientRect().top})");
  await b.evaluate("scrollTo({top:900,behavior:'instant'})");await delay(150);
  const covered=await b.evaluate("({surface:document.querySelector('.home-surface').getBoundingClientRect().top,hit:!!document.elementFromPoint(innerWidth/2,innerHeight/2)?.closest('.home-hero')})");
  report.states.push({opening,half,covered});assert(Math.abs(opening-half.photo)<1&&half.surface>0&&half.header===0&&!covered.hit,'hero cover fixed');
  report.errors=b.events.filter(e=>e.method==='Runtime.exceptionThrown'||e.method==='Runtime.consoleAPICalled'&&['error','warning'].includes(e.params.type));
  assert(!report.errors.length,'console/hydration errors');
} finally {await writeFile('docs/screenshots/revision/report.json',JSON.stringify(report,null,2));b.close();}
console.log(JSON.stringify({checked:report.widths.length,grid:report.widths.filter(x=>x.route==='/'&&[1440,1920].includes(x.width)),failures:report.failures,errors:report.errors.length},null,2));
if(report.failures.length) process.exitCode=1;
