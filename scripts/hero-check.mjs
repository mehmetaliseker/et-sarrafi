import { browser, delay } from './cdp.mjs';
const b = await browser();
for (const [width,height] of [[1440,900],[390,844]]) {
  await b.viewport(width,height); await b.navigate('http://localhost:3000'); await delay(700);
  for (const [name,y] of [['opening',0],['half',Math.round(height/2)],['covered',height]]) {
    await b.evaluate(`scrollTo({top:${y},behavior:'instant'})`); await delay(750);
    await b.shot(`docs/screenshots/current/hero-${width}-${name}.png`);
    console.log(await b.evaluate("({scroll:scrollY,hero:document.querySelector('.home-hero').getBoundingClientRect().toJSON(),photo:document.querySelector('.hero-backdrop').getBoundingClientRect().toJSON(),surface:document.querySelector('.home-surface').getBoundingClientRect().top,overflow:document.documentElement.scrollWidth>innerWidth})"));
  }
}
await b.viewport(390,844); await b.navigate('https://asyadamizlik.com.tr/');
await b.evaluate(`document.querySelector('button[aria-label="Menüyü aç"]').click()`);
await delay(800); await b.shot('docs/screenshots/reference/asya-menu.png');
b.close();
