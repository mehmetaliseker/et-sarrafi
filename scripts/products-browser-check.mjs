import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { browser, delay } from './cdp.mjs';

const client = await browser();
const output = 'docs/screenshots/products';
await mkdir(output, { recursive: true });
const report = [];

try {
  for (const width of [1440, 768, 390, 320]) {
    const height = width <= 390 ? 844 : 900;
    await client.viewport(width, height);
    await client.navigate('http://127.0.0.1:3000/urunler');
    const initial = await client.evaluate(`(() => {
      const h1 = document.querySelector('main h1');
      const cards = [...document.querySelectorAll('main article article')];
      const filters = [...document.querySelectorAll('main button[aria-pressed]')];
      const search = document.querySelector('main input[type="search"]').closest('label');
      return {
        width: innerWidth,
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        h1: h1.textContent,
        h1Left: h1.getBoundingClientRect().left,
        cardCount: cards.length,
        cardWidths: cards.slice(0, 3).map(card => card.getBoundingClientRect().width),
        filterHeights: filters.map(button => button.getBoundingClientRect().height),
        searchWidth: search.getBoundingClientRect().width,
        searchHeight: search.getBoundingClientRect().height,
        closingCount: document.querySelectorAll('section[aria-label="Ürün ve iletişim bilgileri"]').length,
        footerCount: document.querySelectorAll('.site-footer').length,
        closingCards: document.querySelectorAll('[aria-label="İletişim ve katalog bilgileri"] > div').length,
        removedContactCopy: !document.body.textContent.includes('Et tedariki için bizimle iletişime geçin'),
        breadcrumb: [...document.querySelectorAll('main nav[aria-label="Sayfa yolu"] li')].map(item => item.textContent.trim()),
        revealCount: document.querySelectorAll('main .reveal-scroll-linked').length,
        imageButtons: document.querySelectorAll('main article article button:has(img)').length,
        loadedImages: [...document.querySelectorAll('main article article img')].every(image => image.complete && image.naturalWidth > 0),
      };
    })()`);
    assert.ok(initial.scrollWidth <= initial.width, `${width}px horizontal overflow`);
    assert.equal(initial.h1, 'Ürünlerimiz');
    assert.equal(initial.cardCount, 6);
    assert.ok(initial.filterHeights.every(value => value >= 44));
    assert.ok(initial.searchHeight >= 44);
    assert.equal(initial.closingCount, 1);
    assert.equal(initial.footerCount, 1);
    assert.equal(initial.closingCards, 4);
    assert.equal(initial.removedContactCopy, true);
    assert.deepEqual(initial.breadcrumb, ['Ana Sayfa/', 'Ürünlerimiz']);
    assert.equal(initial.revealCount, 0);
    assert.equal(initial.imageButtons, 6);
    assert.equal(initial.loadedImages, true);
    if (width === 1440) {
      assert.ok(Math.abs(initial.h1Left - (initial.clientWidth - 1136) / 2) < 1);
      assert.ok(initial.cardWidths.every(value => Math.abs(value - 357.328125) < 1));
      assert.equal(initial.searchWidth, 288);
    }
    await client.shot(`${output}/products-${width}.png`);

    await client.evaluate(`(() => { const input=document.querySelector('main input[type="search"]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'kusbasi'); input.dispatchEvent(new Event('input',{bubbles:true})); })()`);
    await delay(120);
    const normalizedSearchCount = await client.evaluate(`document.querySelectorAll('main article article').length`);
    assert.equal(normalizedSearchCount, 1, `${width}px Turkish search normalization`);
    await client.evaluate(`(() => { const input=document.querySelector('main input[type="search"]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,''); input.dispatchEvent(new Event('input',{bubbles:true})); [...document.querySelectorAll('main button[aria-pressed]')].find(button=>button.textContent==='Kuzu').click(); })()`);
    await delay(120);
    assert.equal(await client.evaluate(`document.querySelectorAll('main article article').length`), 1);

    await client.evaluate(`(() => { const input=document.querySelector('main input[type="search"]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'dana'); input.dispatchEvent(new Event('input',{bubbles:true})); })()`);
    await delay(120);
    assert.equal(await client.evaluate(`document.querySelectorAll('main article article').length`), 0);
    assert.equal(await client.evaluate(`[...document.querySelectorAll('main button')].some(button=>button.textContent==='Filtreleri temizle')`), true);
    await client.evaluate(`[...document.querySelectorAll('main button')].find(button=>button.textContent==='Filtreleri temizle').click()`);
    await delay(120);
    assert.equal(await client.evaluate(`document.querySelectorAll('main article article').length`), 6);
    await client.evaluate(`[...document.querySelectorAll('main button[aria-pressed]')].find(button=>button.textContent==='Kuzu').click()`);
    await delay(120);

    await client.evaluate(`[...document.querySelectorAll('main article article button:not(:has(img))')][0].click()`);
    await delay(120);
    const modalState = await client.evaluate(`(() => {
      const trigger = [...document.querySelectorAll('main article article button:not(:has(img))')][0];
      const dialog = document.querySelector('main dialog');
      const images = [trigger.closest('article').querySelector('img'), dialog.querySelector('img')];
      const source = image => new URL(image.currentSrc).searchParams.get('url');
      const backdrop = getComputedStyle(dialog, '::backdrop');
      return {open:dialog.open, locked:document.body.style.overflow==='hidden', sameImage:source(images[0])===source(images[1]), focusInside:dialog.contains(document.activeElement), backdrop:backdrop.backgroundColor, imageBackground:getComputedStyle(dialog.querySelector('img').parentElement).backgroundColor};
    })()`);
    assert.deepEqual(modalState, { open: true, locked: true, sameImage: true, focusInside: true, backdrop: 'rgba(0, 0, 0, 0.5)', imageBackground: 'rgba(0, 0, 0, 0)' });
    if (width === 1440) {
      const closePosition = await client.evaluate(`(() => { const r=document.querySelector('main dialog button[aria-label]').getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; })()`);
      await client.send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...closePosition });
      await delay(300);
      const closeHover = await client.evaluate(`(() => { const style=getComputedStyle(document.querySelector('main dialog button[aria-label]')); return {color:style.color,transform:style.transform,filter:style.filter}; })()`);
      assert.equal(closeHover.color, 'rgb(136, 19, 55)');
      assert.equal(closeHover.transform, 'none');
      assert.notEqual(closeHover.filter, 'none');
      report.push({ closeHover });
    }
    await client.shot(`${output}/products-${width}-modal.png`);
    await client.key('Escape');
    await delay(120);
    const closedState = await client.evaluate(`({dialog:!!document.querySelector('main dialog'),locked:document.body.style.overflow==='hidden',focusText:document.activeElement.textContent.trim()})`);
    assert.equal(closedState.dialog, false);
    assert.equal(closedState.locked, false);
    assert.ok(closedState.focusText.startsWith('Ürünü İncele'));
    await client.evaluate(`[...document.querySelectorAll('main article article button:has(img)')][0].click()`);
    await delay(120);
    assert.equal(await client.evaluate(`document.querySelector('main dialog')?.open`), true);
    await client.key('Escape');
    await delay(120);
    await client.evaluate(`[...document.querySelectorAll('main article article button:not(:has(img))')][0].click()`);
    await delay(120);
    await client.evaluate(`document.querySelector('main dialog').dispatchEvent(new MouseEvent('mousedown',{bubbles:true}))`);
    await delay(120);
    assert.equal(await client.evaluate(`!!document.querySelector('main dialog')`), false);
    await client.evaluate(`scrollTo(0, document.querySelector('[aria-label="İletişim ve katalog bilgileri"]').getBoundingClientRect().top + scrollY - innerHeight * .4)`);
    await delay(150);
    await client.shot(`${output}/products-${width}-highlights.png`);
    report.push({ width, ...initial, normalizedSearchCount, modalState, closedState });
  }
  await client.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await client.viewport(390, 844);
  await client.navigate('http://127.0.0.1:3000/urunler');
  await client.evaluate(`[...document.querySelectorAll('main article article button:not(:has(img))')][0].click()`);
  await delay(120);
  const reducedMotionAnimation = await client.evaluate(`getComputedStyle(document.querySelector('main dialog > div')).animationName`);
  assert.equal(reducedMotionAnimation, 'none');
  report.push({ reducedMotionAnimation });
  await client.send('Emulation.setEmulatedMedia', { features: [] });
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  client.close();
}
