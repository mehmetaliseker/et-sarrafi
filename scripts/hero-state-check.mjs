import { browser, delay } from './cdp.mjs';
import { writeFile } from 'node:fs/promises';

const b = await browser();
const result = {};
try {
  await b.viewport(1440, 900); await b.navigate('http://localhost:3000'); await delay(300);
  const point = await b.evaluate(`(() => { const r=document.querySelector('.hero-actions .link-button:last-child').getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`);
  await b.send('Input.dispatchMouseEvent', {type:'mouseMoved', x:point.x, y:point.y}); await delay(300);
  result.hover = await b.evaluate(`(() => { const s=getComputedStyle(document.querySelector('.hero-actions .link-button:last-child')); return {decoration:s.textDecorationLine,border:s.borderTopColor,shadow:s.boxShadow}; })()`);
  await b.shot('docs/screenshots/final-revision/hero-button-hover-1440.png');
  await b.evaluate(`document.querySelector('.hero-actions .link-button:last-child').focus()`); await delay(100);
  result.focus = await b.evaluate(`(() => { const s=getComputedStyle(document.querySelector('.hero-actions .link-button:last-child')); return {outline:s.outlineStyle,outlineWidth:s.outlineWidth,outlineColor:s.outlineColor}; })()`);
  await b.shot('docs/screenshots/final-revision/hero-button-focus-1440.png');
  result.passed = result.hover.decoration==='none' && result.hover.shadow!=='none' && result.focus.outline!=='none' && result.focus.outlineWidth==='2px';
} finally { b.close(); }
await writeFile('docs/screenshots/final-revision/hero-states.json', JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
if (!result.passed) process.exitCode=1;
