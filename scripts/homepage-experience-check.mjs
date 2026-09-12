import { browser, delay } from './cdp.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const b = await browser();
const base = 'http://localhost:3000';
const report = { viewports: [], motion: {}, immersive: {}, navigation: {}, hover: {}, failures: [], errors: [] };
const check = (name, passed, detail) => { if (!passed) report.failures.push({ name, detail }); };

try {
  await mkdir('docs/screenshots/homepage-experience', { recursive: true });
  for (const [width, height] of [[390,844],[768,900],[1440,900],[1920,1080],[844,390]]) {
    await b.viewport(width,height); await b.navigate(base); await delay(400);
    const layout = await b.evaluate(`(() => {
      const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return {left:r.left,right:r.right,height:r.height}};
      const cs=s=>getComputedStyle(document.querySelector(s));
      return {clientWidth:document.documentElement.clientWidth, overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,
        brand:rect('.header-inner .brand'), hero:rect('.hero-copy'), story:rect('#home-products-section .home-split-copy'), footer:rect('.footer-main'),
        sections:[...document.querySelectorAll('.home-surface > section')].map(x=>x.getBoundingClientRect().height),
        topHeader:{background:cs('.site-header').backgroundColor,color:cs('.site-header').color}, navFont:${width}>=1024?cs('.desktop-nav a').fontSize:null,
        emptyMedia:document.querySelectorAll('.media-empty').length, footerLogo:!!document.querySelector('.footer-logo img'), headerLogo:!!document.querySelector('.site-header img')};
    })()`);
    const expectedRight = layout.clientWidth-layout.brand.left;
    check(`layout ${width}`, !layout.overflow && [layout.hero.left,layout.story.left,layout.footer.left].every(x=>Math.abs(x-layout.brand.left)<1.01) && Math.abs(layout.footer.right-expectedRight)<1.01, layout);
    check(`sections ${width}`, layout.sections.length===4 && layout.sections.slice(0,3).every(x=>x>=height-.5) && layout.sections[3]>=height*.5-.5, layout.sections);
    check(`media and logo ${width}`, layout.emptyMedia===0 && layout.footerLogo && !layout.headerLogo, layout);
    check(`transparent header ${width}`, layout.topHeader.background==='rgba(0, 0, 0, 0)' && layout.topHeader.color==='rgb(255, 255, 255)', layout.topHeader);
    if(width>=1024) check(`nav size ${width}`, parseFloat(layout.navFont)>=15, layout.navFont);
    await b.evaluate(`scrollTo({top:120,behavior:'instant'})`); await delay(350);
    const scrolled = await b.evaluate(`(() => {const s=getComputedStyle(document.querySelector('.site-header'));return {background:s.backgroundColor,backdrop:s.backdropFilter}})()`);
    check(`blur header ${width}`, scrolled.background.includes('0.82') && scrolled.backdrop!=='none', scrolled);
    report.viewports.push({width,height,gutter:layout.brand.left,...layout,scrolled});
    await b.shot(`docs/screenshots/homepage-experience/home-${width}.png`);
  }

  await b.viewport(1440,900); await b.navigate(base); await delay(250);
  const sample = async scroll => { await b.evaluate(`scrollTo({top:${scroll},behavior:'instant'})`); await delay(80); return b.evaluate(`(() => {const e=document.querySelector('.home-split-copy');const s=getComputedStyle(e);const r=e.getBoundingClientRect();const image=document.querySelector('.home-split-image');const ir=image.getBoundingClientRect();return {scrollY,opacity:parseFloat(s.opacity),transform:s.transform,top:r.top,bottom:r.bottom,imageTransform:getComputedStyle(image).transform,imageDocumentTop:ir.top+scrollY}})()`); };
  const below = await sample(0), entered = await sample(1050), above = await sample(1900), reentered = await sample(1450), belowAgain = await sample(0);
  report.motion = {below,entered,above,reentered,belowAgain};
  check('bidirectional motion', below.opacity<.1 && entered.opacity>.95 && above.opacity<.2 && reentered.opacity>above.opacity && reentered.opacity<1 && belowAgain.opacity<.1 && below.transform!==entered.transform && above.transform!==entered.transform && [below,entered,above,reentered,belowAgain].every(x=>x.imageTransform==='none') && [entered,above,reentered].every(x=>Math.abs(x.imageDocumentTop-below.imageDocumentTop)<1), report.motion);

  const immersiveTop = await b.evaluate(`{const r=document.querySelector('.home-immersive-section').getBoundingClientRect();r.top+scrollY}`);
  const immersiveSample = async scroll => { await b.evaluate(`scrollTo({top:${scroll},behavior:'instant'})`); await delay(80); return b.evaluate(`(()=>{const photo=document.querySelector('.immersive-media .photo'),media=document.querySelector('.immersive-media'),copy=document.querySelector('.home-immersive-copy');return{scrollY,scale:getComputedStyle(photo).transform,mediaPosition:getComputedStyle(media).position,mediaTop:media.getBoundingClientRect().top,copyTransform:getComputedStyle(copy).transform}})()`); };
  const approaching = await immersiveSample(immersiveTop-900), focused = await immersiveSample(immersiveTop), leaving = await immersiveSample(immersiveTop+900), focusedAgain = await immersiveSample(immersiveTop);
  report.immersive = {approaching,focused,leaving,focusedAgain};
  const imageScale = value => Number(value.match(/matrix\(([^,]+)/)?.[1] ?? 1);
  check('independent immersive zoom', approaching.mediaPosition==='absolute' && Math.abs(approaching.mediaTop-900)<1 && Math.abs(focused.mediaTop)<1 && Math.abs(leaving.mediaTop+900)<1 && imageScale(focused.scale)>imageScale(approaching.scale) && Math.abs(imageScale(approaching.scale)-imageScale(leaving.scale))<.002 && Math.abs(imageScale(focused.scale)-imageScale(focusedAgain.scale))<.002, report.immersive);

  await b.evaluate(`scrollTo({top:1600,behavior:'instant'})`); await b.evaluate(`document.querySelector('.desktop-nav a[href="/hakkimizda"]').click()`); await delay(900);
  report.navigation.scrollY = await b.evaluate('scrollY');
  check('route starts at top', report.navigation.scrollY===0, report.navigation);
  const nav = await b.evaluate(`(() => {const a=document.querySelector('.desktop-nav a[aria-current="page"]');return {active:a.textContent,line:getComputedStyle(a,'::after').transform}})()`);
  check('active nav line', nav.active==='Hakkımızda' && nav.line.includes('1, 0, 0, 1'), nav);
  report.navigation.active = nav;
  const hoverPoint = await b.evaluate(`(()=>{const r=document.querySelector('.desktop-nav a[href="/urunler"]').getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()`);
  await b.send('Input.dispatchMouseEvent',{type:'mouseMoved',x:hoverPoint.x,y:hoverPoint.y}); await delay(130);
  report.hover.opening = await b.evaluate(`(()=>{const a=document.querySelector('.desktop-nav a[href="/urunler"]'),s=getComputedStyle(a,'::after');return{transform:s.transform,origin:s.transformOrigin,width:parseFloat(s.width),transition:s.transitionDuration}})()`);
  await b.send('Input.dispatchMouseEvent',{type:'mouseMoved',x:10,y:300}); await delay(130);
  report.hover.closing = await b.evaluate(`getComputedStyle(document.querySelector('.desktop-nav a[href="/urunler"]'),'::after').transform`);
  const scale = value => Number(value.match(/matrix\(([^,]+)/)?.[1] ?? 0);
  check('centered reversible nav hover', Math.abs(parseFloat(report.hover.opening.origin)*2-report.hover.opening.width)<1 && report.hover.opening.transition==='0.26s' && scale(report.hover.opening.transform)>0 && scale(report.hover.opening.transform)<1 && scale(report.hover.closing)>0 && scale(report.hover.closing)<scale(report.hover.opening.transform), report.hover);
  report.errors = b.events.filter(e=>e.method==='Runtime.exceptionThrown'||(e.method==='Runtime.consoleAPICalled'&&e.params.type==='error'));
  check('console errors', report.errors.length===0, report.errors);
} finally {
  await writeFile('docs/screenshots/homepage-experience/report.json', JSON.stringify(report,null,2));
  b.close();
}
console.log(JSON.stringify({failures:report.failures,motion:report.motion,immersive:report.immersive,navigation:report.navigation,hover:report.hover,viewports:report.viewports.map(x=>({width:x.width,gutter:x.gutter,sections:x.sections,scrolled:x.scrolled})),errors:report.errors.length},null,2));
if(report.failures.length) process.exitCode=1;
