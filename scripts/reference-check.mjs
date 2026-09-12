import { browser, delay } from './cdp.mjs';
import { writeFile } from 'node:fs/promises';
const b = await browser();
const report = [];
for (const [name, url] of [['asya', 'https://asyadamizlik.com.tr/'], ['et', 'https://www.etsarrafi.com/']]) {
  await b.viewport(1440, 900);
  const navigation = await b.navigate(url);
  await delay(1500);
  report.push({ name, navigation, state: await b.evaluate("({url:location.href,title:document.title,text:document.body.innerText.slice(0,4500),buttons:[...document.querySelectorAll('button')].map(x=>({text:x.innerText,aria:x.getAttribute('aria-label'),class:x.className}))})") });
  await b.shot(`docs/screenshots/reference/${name}-opening.png`);
  for (const y of [650, 1350, 2200]) { await b.evaluate(`scrollTo(0,${y})`); await delay(450); await b.shot(`docs/screenshots/reference/${name}-${y}.png`); }
  await b.viewport(390, 844); await b.evaluate('scrollTo(0,0)'); await delay(400);
  await b.shot(`docs/screenshots/reference/${name}-mobile.png`);
  report.push({ name: name + '-mobile', buttons: await b.evaluate("[...document.querySelectorAll('button,[role=button]')].map(x=>({text:x.innerText,aria:x.getAttribute('aria-label'),class:x.className}))") });
}
await writeFile('docs/screenshots/reference/report.json', JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2)); b.close();
