import assert from 'node:assert/strict';
import { browser, delay } from './cdp.mjs';

const client = await browser();
const url = 'http://127.0.0.1:3000/iletisim';

async function inspect() {
  return client.evaluate(`(() => {
    const main = document.querySelector('main');
    const map = main.querySelector('iframe');
    const mapRect = map.getBoundingClientRect();
    const address = main.querySelector('address').textContent.trim();
    const directions = main.querySelector('a[target="_blank"]');
    const embedUrl = new URL(map.src);
    const directionsUrl = new URL(directions.href);
    return {
      width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
      headerBottom: document.querySelector('.site-header').getBoundingClientRect().bottom,
      titleTop: main.querySelector('h1').getBoundingClientRect().top,
      h1: main.querySelector('h1').textContent, h1Count: main.querySelectorAll('h1').length,
      legalName: main.querySelector('section[aria-labelledby="company-name"] > p').textContent,
      phone: main.querySelector('a[href^="tel:"]')?.getAttribute('href'),
      email: main.querySelector('a[href^="mailto:"]')?.getAttribute('href'),
      address, directionsTarget: directions.target, directionsRel: directions.rel,
      mapHost: embedUrl.host, mapPath: embedUrl.pathname, hasMapPb: Boolean(embedUrl.searchParams.get('pb')),
      destination: directionsUrl.searchParams.get('destination'),
      mapHeight: mapRect.height, mapWidth: mapRect.width, iframeTitle: map.title,
      footerCount: document.querySelectorAll('.site-footer').length,
      closingCount: document.querySelectorAll('section[aria-label="Ürün ve iletişim bilgileri"]').length,
      formCount: main.querySelectorAll('form').length,
    };
  })()`);
}

try {
  const report = [];
  for (const width of [1440, 768, 390, 320]) {
    await client.viewport(width, width < 500 ? 844 : 900);
    await client.navigate(url);
    const state = await inspect();
    assert.ok(state.scrollWidth <= state.width, `${width}px horizontal overflow`);
    assert.ok(state.titleTop > state.headerBottom, `${width}px navbar overlap`);
    assert.equal(state.h1, 'İletişim');
    assert.equal(state.h1Count, 1);
    assert.equal(state.footerCount, 1);
    assert.equal(state.closingCount, 1);
    assert.equal(state.formCount, 0);
    assert.ok(state.legalName.includes('Celepler Pamuk'));
    assert.equal(state.phone, 'tel:+905395179686');
    assert.equal(state.email, 'mailto:siparis@etsarrafi.com');
    assert.equal(state.directionsTarget, '_blank');
    assert.ok(state.directionsRel.includes('noopener'));
    assert.equal(state.mapHost, 'www.google.com');
    assert.equal(state.mapPath, '/maps/embed');
    assert.equal(state.hasMapPb, true);
    assert.equal(state.destination, state.address);
    assert.ok(state.iframeTitle.includes(state.address));
    assert.ok(Math.abs(state.mapHeight - (width < 768 ? 300 : 380)) <= 3);
    if (width === 1440 || width === 390) await client.shot(`docs/screenshots/contact/contact-${width}-top.png`);
    await client.evaluate(`document.querySelector('main iframe').scrollIntoView({behavior:'instant',block:'center'})`);
    await delay(1200);
    if (width === 1440 || width === 390) await client.shot(`docs/screenshots/contact/contact-${width}-map.png`);
    const tree = await client.send('Page.getFrameTree');
    const childUrls = tree.frameTree.childFrames?.map(frame => frame.frame.url) ?? [];
    report.push({ width, mapHeight: state.mapHeight, childUrls });
  }
  console.log(JSON.stringify(report, null, 2));
} finally {
  client.close();
}
