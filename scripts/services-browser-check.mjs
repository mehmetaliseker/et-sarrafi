import assert from 'node:assert/strict';
import { browser, delay } from './cdp.mjs';

const client = await browser();
const url = 'http://127.0.0.1:3000/hizmet-alanlarimiz';
const expected = [
  { title: 'Horeca', intro: 'Horeca faaliyetlerimizi tanıyın; ürün ihtiyaçlarınız için doğrudan iletişim kurun.', image: 'horeca-product-selection.png', href: '/urunler' },
  { title: 'Karkas Et Tedariği', intro: 'Karkas et tedariki faaliyetlerimizi tanıyın; ürün ihtiyaçlarınız için doğrudan iletişim kurun.', image: 'carcass-cuts.png', href: '/iletisim' },
  { title: 'Sıcak Satış', intro: 'Sıcak satış faaliyetlerimizi tanıyın; ürün ihtiyaçlarınız için doğrudan iletişim kurun.', image: 'direct-sales-cuts.png', href: '/iletisim' },
];

async function state() {
  return client.evaluate(`(() => {
    const tabs = [...document.querySelectorAll('[role="tab"]')];
    const panels = [...document.querySelectorAll('[role="tabpanel"]')];
    const active = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
    const viewport = panels[0].parentElement.parentElement;
    const track = panels[0].parentElement;
    const indicator = tabs[0].parentElement.querySelector('[aria-hidden="true"]');
    const panel = panels[active];
    const image = panel.querySelector('img');
    const closing = document.querySelector('section[aria-label="Ürün ve iletişim bilgileri"]');
    return {
      width: innerWidth, scrollWidth: document.documentElement.scrollWidth, height: innerHeight,
      active, intro: document.querySelector('[aria-live="polite"]').textContent,
      h1: document.querySelector('main h1')?.textContent,
      tabs: tabs.length, panels: panels.length, inert: panels.map(item => item.inert),
      ariaHidden: panels.map(item => item.getAttribute('aria-hidden')),
      panelX: panels.map(item => item.getBoundingClientRect().left),
      viewportX: viewport.getBoundingClientRect().left, viewportWidth: viewport.getBoundingClientRect().width,
      overflow: getComputedStyle(viewport).overflowX,
      trackX: new DOMMatrixReadOnly(getComputedStyle(track).transform).m41,
      indicatorX: new DOMMatrixReadOnly(getComputedStyle(indicator).transform).m41,
      indicatorWidth: indicator.getBoundingClientRect().width,
      transition: getComputedStyle(track).transitionDuration,
      title: panel.querySelector('h2').textContent,
      href: panel.querySelector('a').getAttribute('href'),
      image: image.getAttribute('src'), imageLoaded: image.complete && image.naturalWidth > 0,
      captionCount: document.querySelectorAll('main figcaption').length,
      arrowButtonCount: document.querySelectorAll('button[aria-label="Önceki hizmet"], button[aria-label="Sonraki hizmet"]').length,
      closingTop: closing.getBoundingClientRect().top,
      closingCount: document.querySelectorAll('section[aria-label="Ürün ve iletişim bilgileri"]').length,
      footerCount: document.querySelectorAll('.site-footer').length,
      scrollY,
    };
  })()`);
}

async function select(index) {
  await client.evaluate(`document.querySelectorAll('[role="tab"]')[${index}].click()`);
}

async function press(name, code) {
  await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: name, code: name, windowsVirtualKeyCode: code });
  await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: name, code: name, windowsVirtualKeyCode: code });
}

try {
  const results = [];
  for (const width of [1440, 768, 390, 320]) {
    await client.viewport(width, width < 500 ? 844 : 900);
    await client.navigate(url);
    const first = await state();
    assert.ok(first.scrollWidth <= first.width, `${width}px horizontal overflow`);
    assert.equal(first.h1, 'Hizmet Alanlarımız');
    assert.equal(first.tabs, 3);
    assert.equal(first.panels, 3);
    assert.equal(first.overflow, 'hidden');
    assert.equal(first.active, 0);
    assert.equal(first.captionCount, 0);
    assert.equal(first.arrowButtonCount, 0);
    assert.equal(first.closingCount, 1);
    assert.equal(first.footerCount, 1);
    assert.ok(first.closingTop >= first.height, `${width}px closing initially visible`);
    assert.ok(first.imageLoaded, `${width}px first image not loaded`);
    assert.ok(Math.abs(first.panelX[0] - first.viewportX) < 1);
    assert.ok(Math.abs(first.panelX[1] - first.panelX[0] - first.viewportWidth) < 1);
    for (const index of [0, 1, 2]) {
      if (index !== 0) {
        await select(index);
        await delay(550);
      }
      const current = await state();
      assert.equal(current.active, index);
      assert.equal(current.title, expected[index].title);
      assert.equal(current.intro, expected[index].intro);
      assert.equal(current.href, expected[index].href);
      assert.ok(current.image.includes(expected[index].image));
      assert.ok(current.imageLoaded, `${width}px image ${index} not loaded`);
      assert.deepEqual(current.inert, [0, 1, 2].map(i => i !== index));
      assert.deepEqual(current.ariaHidden, [0, 1, 2].map(i => String(i !== index)));
      assert.ok(Math.abs(current.trackX + (index + 1) * current.viewportWidth) < 1, `${width}px track did not land on ${index}`);
      assert.ok(Math.abs(current.indicatorX - index * current.indicatorWidth) < 1, `${width}px indicator did not follow ${index}`);
      assert.ok(Math.abs(current.closingTop - first.closingTop) < 1, `${width}px page height jumped`);
      assert.equal(current.scrollY, 0, `${width}px tab changed scroll`);
    }
    results.push({ width, viewportWidth: first.viewportWidth, closingTop: first.closingTop });
  }

  await client.viewport(1440, 900);
  await client.navigate(url);
  await select(1);
  await delay(220);
  const midpoint = await state();
  const trackProgress = -midpoint.trackX / midpoint.viewportWidth - 1;
  const indicatorProgress = midpoint.indicatorX / midpoint.indicatorWidth;
  assert.ok(trackProgress > .15 && trackProgress < .9, `track animation midpoint ${trackProgress}`);
  assert.ok(Math.abs(trackProgress - indicatorProgress) < .06, 'track and indicator animation out of sync');
  await delay(350);

  await client.evaluate(`document.querySelectorAll('[role="tab"]')[2].focus()`);
  await press('ArrowRight', 39);
  assert.equal((await state()).active, 0);
  await delay(550);
  assert.ok(Math.abs((await state()).trackX + (await state()).viewportWidth) < 1, 'forward wrap did not settle on first panel');
  await press('ArrowLeft', 37);
  assert.equal((await state()).active, 2);
  await delay(550);
  assert.ok(Math.abs((await state()).trackX + 3 * (await state()).viewportWidth) < 1, 'reverse wrap did not settle on last panel');
  await press('Home', 36);
  assert.equal((await state()).active, 0);
  await delay(550);
  await press('End', 35);
  assert.equal((await state()).active, 2);
  assert.equal(await client.evaluate('document.activeElement.id'), 'service-tab-sicak-satis');

  await client.navigate(url);
  const point = await client.evaluate(`(() => { const r=document.querySelector('[role="tabpanel"] img').getBoundingClientRect(); return {x:r.left+r.width*.7,y:r.top+r.height*.5}; })()`);
  await client.send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
  await client.send('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', buttons: 1, clickCount: 1, ...point });
  await client.send('Input.dispatchMouseEvent', { type: 'mouseMoved', button: 'left', buttons: 1, x: point.x - 170, y: point.y });
  await delay(80);
  const dragging = await state();
  assert.ok(dragging.trackX < -dragging.viewportWidth - 140 && dragging.trackX > -dragging.viewportWidth - 200, `panel did not follow pointer: ${dragging.trackX}`);
  await client.send('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', buttons: 0, clickCount: 1, x: point.x - 170, y: point.y });
  await delay(550);
  assert.equal((await state()).active, 1, 'mouse drag did not advance');
  await client.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: point.x, y: point.y, deltaX: 80, deltaY: 0 });
  await delay(550);
  assert.equal((await state()).active, 2, 'horizontal wheel did not advance');
  await client.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: point.x, y: point.y, deltaX: -80, deltaY: 0 });
  await delay(550);
  assert.equal((await state()).active, 1, 'reverse wheel did not return');

  await client.viewport(390, 844);
  await client.navigate(url);
  const touch = await client.evaluate(`(() => { const r=document.querySelector('[role="tabpanel"] img').getBoundingClientRect(); return {x:Math.round(r.left+r.width*.7),y:Math.round(r.top+r.height*.5)}; })()`);
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...touch, id: 1 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: touch.x - 100, y: touch.y, id: 1 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await delay(550);
  assert.equal((await state()).active, 1, 'touch swipe did not advance');
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: touch.x - 100, y: touch.y, id: 2 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ ...touch, id: 2 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await delay(550);
  assert.equal((await state()).active, 0, 'reverse touch swipe did not return');
  await select(2);
  await delay(550);
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...touch, id: 3 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: touch.x - 100, y: touch.y, id: 3 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await delay(550);
  const forwardWrap = await state();
  assert.equal(forwardWrap.active, 0, 'last-to-first touch wrap failed');
  assert.ok(Math.abs(forwardWrap.trackX + forwardWrap.viewportWidth) < 1, 'forward touch wrap did not normalize');
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: touch.x - 100, y: touch.y, id: 4 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ ...touch, id: 4 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await delay(550);
  const reverseWrap = await state();
  assert.equal(reverseWrap.active, 2, 'first-to-last touch wrap failed');
  assert.ok(Math.abs(reverseWrap.trackX + 3 * reverseWrap.viewportWidth) < 1, 'reverse touch wrap did not normalize');

  await client.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  const reduced = await state();
  assert.ok(parseFloat(reduced.transition) <= .001, `reduced-motion transition ${reduced.transition}`);
  await client.send('Emulation.setEmulatedMedia', { features: [] });
  console.log(JSON.stringify({ widths: results, midpoint: { trackProgress, indicatorProgress }, keyboard: true, pointer: true, wheel: true, touch: true, reducedMotion: true }, null, 2));
} finally {
  client.close();
}
