import { browser, delay } from './cdp.mjs';
import { readFile, writeFile } from 'node:fs/promises';
const base = process.argv[2] || 'http://localhost:3001';
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw new Error('Local preview required');
const products = [...(await readFile('src/data/products.ts', 'utf8')).matchAll(/"slug": "([^"]+)"/g)].map(m => '/urunler/' + m[1]);
const mainRoutes = ['/', '/hakkimizda', '/urunler', '/tesislerimiz', '/hizmet-alanlarimiz', '/kalite', '/iletisim'];
const routes = [...mainRoutes, ...products, '/olmayan-sayfa', '/urunler/olmayan-urun'];
const b = await browser();
const report = { checkedOn: new Date().toISOString(), base, layouts: [], interactions: [], hero: [], errors: [], failures: [] };
const check = (ok, name, details) => { report.interactions.push({ name, passed: !!ok, details }); if (!ok) report.failures.push(name); };
async function inspect(route, width, height, capture = true) {
  await b.viewport(width,height); await b.navigate(base + route); await delay(600);
  const result = await b.evaluate(`(() => {
    const visible = el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden' && !el.closest('dialog:not([open])');
    return { route:location.pathname, width:innerWidth, height:innerHeight, scrollWidth:document.documentElement.scrollWidth,
      title:document.title,h1:[...document.querySelectorAll('h1')].map(el=>el.textContent),description:document.querySelector('meta[name=description]')?.content,
      canonical:document.querySelector('link[rel=canonical]')?.href,
      overflow:[...document.querySelectorAll('body *')].filter(visible).filter(el=>!el.classList.contains('skip-link')).filter(el=>{ const r=el.getBoundingClientRect(); return r.left < -1 || r.right > innerWidth+1; }).map(el=>el.tagName+'.'+el.className).slice(0,10),
      smallTargets:[...document.querySelectorAll('a,button,input')].filter(visible).filter(el=>!el.classList.contains('skip-link')).filter(el=>{const r=el.getBoundingClientRect();return r.width<44 || r.height<44}).map(el=>el.textContent),
      brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),
      technicalText:/placeholder|önizleme|onay bekleniyor|fotoğraf alanı|logo gelecek|skeleton/i.test(document.body.innerText),
      forms:document.querySelectorAll('form').length,
      hero:!!document.querySelector('.home-hero'),
      links:[...new Set([...document.querySelectorAll('a[href]')].filter(a=>a.origin===location.origin).map(a=>a.pathname+a.search+a.hash))]
    };
  })()`);
  report.layouts.push(result);
  if (result.scrollWidth > width || result.overflow.length) report.failures.push(route+' '+width+': overflow');
  if (result.h1.length !== 1) report.failures.push(route+' '+width+': h1');
  if (result.smallTargets.length) report.failures.push(route+' '+width+': small targets');
  if (result.brokenImages.length || result.technicalText || result.forms || result.hero !== (route==='/')) report.failures.push(route+' '+width+': content');
  if (capture) {
    const name = route === '/' ? 'home' : route.slice(1).replaceAll('/','-');
    await b.shot(`docs/screenshots/final/${name}-${width}.png`);
    if (mainRoutes.includes(route)) await b.shot(`docs/screenshots/final/${name}-${width}-full.png`, true);
  }
}
try {
  for (const [width,height] of [[1440,900],[390,844]]) for (const route of routes) await inspect(route,width,height);
  for (const [width,height] of [[320,740],[768,1024],[1920,1080],[844,390]]) for (const route of ['/', '/urunler']) await inspect(route,width,height);
  for (const [width,height] of [[320,740],[390,844],[768,1024],[1440,900],[1920,1080],[844,390]]) {
    await b.viewport(width,height); await b.navigate(base);
    for (const [state,y] of [['opening',0],['half',Math.round(height/2)],['covered',height]]) {
      await b.evaluate(`scrollTo({top:${y},behavior:'instant'})`); await delay(650);
      const result=await b.evaluate(`(() => {const photo=document.querySelector('.hero-backdrop').getBoundingClientRect();const surface=document.querySelector('.home-surface').getBoundingClientRect();return {y:scrollY,photoY:photo.y,photoHeight:photo.height,surfaceY:surface.y,hitHero:!!document.elementFromPoint(innerWidth/2,innerHeight/2)?.closest('.home-hero'),headerY:document.querySelector('header').getBoundingClientRect().y,initialEnd:document.querySelector('.home-hero').getBoundingClientRect().bottom};})()`);
      report.hero.push({width,height,state,...result});
      if (result.headerY !== 0 || (state==='covered' && result.hitHero)) report.failures.push('hero layers '+width+' '+state);
      await b.shot(`docs/screenshots/final/hero-${width}-${state}.png`);
    }
    if (width >= 1024) continue;
    await b.evaluate("scrollTo({top:260,behavior:'instant'})");
    await b.evaluate("document.querySelector('.menu-trigger').click()");
    await delay(300);
    const menu=await b.evaluate("({open:document.querySelector('dialog').open,locked:document.body.style.position==='fixed',width:document.querySelector('dialog').getBoundingClientRect().width,height:document.querySelector('dialog').getBoundingClientRect().height,viewport:innerHeight,scrollHeight:document.querySelector('dialog').scrollHeight})");
    check(menu.open && menu.locked && menu.width<=width && menu.height<=height,'menu dimensions '+width,menu);
    await b.shot(`docs/screenshots/final/menu-${width}.png`);
    await b.evaluate("document.querySelector('dialog .brand').focus()"); await b.key('Tab',8);
    check(await b.evaluate("document.activeElement.classList.contains('menu-contact')"),'menu reverse focus trap '+width);
    await b.key('Tab');
    check(await b.evaluate("document.activeElement.classList.contains('brand')"),'menu forward focus trap '+width);
    await b.key('Escape'); await delay(500);
    check(await b.evaluate("!document.querySelector('dialog').open && document.activeElement.classList.contains('menu-trigger') && Math.abs(scrollY-260)<2 && document.body.style.position===''"),'menu Escape/scroll/focus '+width);
    await b.evaluate("document.querySelector('.menu-trigger').click();document.querySelector('dialog a[href=\"/urunler\"]').click()");
    await delay(900);
    check(await b.evaluate("location.pathname==='/urunler' && !document.querySelector('dialog').open && document.body.style.position===''"),'menu navigation '+width);
  }
  await b.viewport(1440,900); await b.navigate(base+'/urunler');
  await b.evaluate("document.querySelector('#kucukbas').click()"); await delay(300);
  check(await b.evaluate("document.querySelectorAll('.product-card').length===2 && location.search.includes('kucukbas')"),'category filter');
  await b.evaluate("document.querySelector('#buyukbas').click()"); await delay(200);
  await b.evaluate("history.back()"); await delay(350);
  check(await b.evaluate("document.querySelectorAll('.product-card').length===2"),'filter back');
  await b.evaluate("history.forward()"); await delay(350);
  check(await b.evaluate("document.querySelectorAll('.product-card').length===4"),'filter forward');
  async function search(value) {
    await b.evaluate(`(() => {const input=document.querySelector('#product-search');const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;setter.call(input,${JSON.stringify(value)});input.dispatchEvent(new Event('input',{bubbles:true}));})()`);
    await delay(300);
  }
  await search('BONFİLE');
  check(await b.evaluate("document.querySelectorAll('.product-card').length===1 && document.querySelector('.product-card h3').textContent==='Dana bonfile'"),'Turkish search');
  await search('xyzbulunmaz');
  check(await b.evaluate("document.querySelectorAll('.product-card').length===0 && !!document.querySelector('.catalog-empty button')"),'zero results');
  await b.shot('docs/screenshots/final/catalog-zero.png');
  await b.evaluate("document.querySelector('.catalog-empty button').click()"); await delay(250);
  check(await b.evaluate(`document.querySelectorAll('.product-card').length===${products.length}`),'clear filters');
  await b.evaluate("document.querySelector('#islenmis-etler').click()"); await delay(200);
  check(await b.evaluate("!!document.querySelector('.catalog-empty a[href=\"/iletisim\"]')"),'undocumented category contact');
  await b.navigate(base+'/urunler?kategori=sakatat&q=CIGER');
  check(await b.evaluate("document.querySelectorAll('.product-card').length===2"),'shared search URL');
  await b.evaluate("document.querySelector('.product-card').click()"); await delay(800);
  check(await b.evaluate("location.pathname==='/urunler/dana-ciger' && document.querySelectorAll('.related-products .product-card').length===3"),'product/related navigation');
  await b.evaluate('history.back()'); await delay(650);
  check(await b.evaluate("location.pathname==='/urunler' && document.querySelectorAll('.product-card').length===2"),'product back retains query');
  await b.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await b.navigate(base);
  check(await b.evaluate("getComputedStyle(document.querySelector('.hero-backdrop')).position==='absolute' && document.getAnimations().length===0"),'reduced motion');
  await b.shot('docs/screenshots/final/reduced-motion.png');
  await b.send('Emulation.setEmulatedMedia',{features:[]});
  await b.navigate(base);
  await b.key('Tab');
  check(await b.evaluate("document.activeElement.classList.contains('skip-link')"),'skip link keyboard');
  await b.key('Enter');
  check(await b.evaluate("document.activeElement.id==='ana-icerik'"),'skip link destination');
  await b.send('Emulation.setScriptExecutionDisabled',{value:true});
  await b.navigate(base+'/urunler');
  check(await b.evaluate(`document.querySelectorAll('.product-card').length===${products.length}`),'catalog available without JS');
  await b.navigate(base);
  check(await b.evaluate("getComputedStyle(document.querySelector('h1')).visibility==='visible' && getComputedStyle(document.querySelector('.hero-copy')).opacity==='1'"),'hero readable without JS');
  await b.send('Emulation.setScriptExecutionDisabled',{value:false});
  const links = [...new Set(report.layouts.flatMap(l=>l.links))];
  for (const link of links) {
    const response = await fetch(base+link);
    const expected404 = ['/olmayan-sayfa#ana-icerik','/urunler/olmayan-urun#ana-icerik'].includes(link);
    if (!response.ok && !(expected404 && response.status===404)) report.failures.push('broken internal link '+link+' '+response.status);
    if (link.includes('#')) {
      const id = link.split('#')[1]; const text = await response.text();
      if (!text.includes(`id="${id}"`)) report.failures.push('missing anchor '+link);
    }
  }
  for (const route of ['/olmayan-sayfa','/urunler/olmayan-urun']) {
    const response=await fetch(base+route); check(response.status===404,'HTTP 404 '+route,response.status);
  }
  const sitemap = await fetch(base+'/sitemap.xml').then(r=>r.text());
  check([...mainRoutes,...products].every(route=>sitemap.includes('https://www.etsarrafi.com'+route)),'sitemap all routes');
  check((await fetch(base+'/robots.txt').then(r=>r.text())).includes('Disallow: /'),'preview robots');
  report.errors=b.events.filter(e=>e.method==='Runtime.exceptionThrown'||e.method==='Runtime.consoleAPICalled'&&['error','warning'].includes(e.params.type));
  if(report.errors.length) report.failures.push('browser console errors');
} finally {
  await writeFile('docs/screenshots/final/report.json',JSON.stringify(report,null,2)); b.close();
}
console.log(JSON.stringify({layouts:report.layouts.length,interactions:report.interactions.length,failures:report.failures,errors:report.errors.length},null,2));
if(report.failures.length) process.exitCode=1;
