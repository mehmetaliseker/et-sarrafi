import { browser, delay } from './cdp.mjs';

const base = 'http://localhost:3000';
const b = await browser();
const checks = [];
const check = (name, passed, detail) => checks.push({ name, passed: Boolean(passed), detail });

try {
  await b.viewport(390, 844);
  await b.navigate(base + '/?motion=default');
  check('hero has no timed rotating text', await b.evaluate(`document.querySelector('.hero-rotator') === null`));

  await b.evaluate(`document.querySelector('.hero-scroll-cue').click()`);
  await delay(900);
  check('scroll cue reaches content', await b.evaluate(`scrollY > innerHeight * .7 && document.querySelector('.site-header').classList.contains('header-scrolled') && document.querySelector('#home-products-section').getBoundingClientRect().top >= 0`));

  await b.navigate(base + '/urunler');
  check('inner page header is immediately readable', await b.evaluate(`document.querySelector('.site-header').classList.contains('header-inner-page') && getComputedStyle(document.querySelector('.site-header')).backgroundColor === 'rgb(255, 255, 255)' && getComputedStyle(document.querySelector('.site-header')).color === 'rgb(32, 35, 36)'`));
  await b.evaluate(`document.querySelector('.menu-trigger').click()`);
  check('mobile menu retains scroll lock', await b.evaluate(`document.querySelector('dialog').open && document.body.style.position === 'fixed'`));
  await b.key('Escape'); await delay(200);
  check('mobile menu returns focus', await b.evaluate(`!document.querySelector('dialog').open && document.activeElement.classList.contains('menu-trigger') && document.body.style.position === ''`));

  await b.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await b.navigate(base + '/?motion=reduced');
  const reduced = await b.evaluate(`({cueAnimation:getComputedStyle(document.querySelector('.hero-scroll-cue span')).animationName,heroPosition:getComputedStyle(document.querySelector('.hero-backdrop')).position,immersiveScale:getComputedStyle(document.querySelector('.immersive-media .photo')).transform})`);
  check('reduced motion is static', reduced.cueAnimation === 'none' && reduced.heroPosition === 'absolute' && reduced.immersiveScale.includes('1, 0, 0, 1'), reduced);
} finally { b.close(); }

console.log(JSON.stringify(checks, null, 2));
if (checks.some(item => !item.passed)) process.exitCode = 1;
