import { browser, delay } from './cdp.mjs';

const base = 'http://localhost:3002';
const b = await browser();
const checks = [];
const check = (name, passed, detail) => checks.push({ name, passed: Boolean(passed), detail });

try {
  await b.viewport(390, 844);
  await b.navigate(base + '/?motion=default');
  const firstPhrase = await b.evaluate(`document.querySelector('.hero-rotator-window .is-current').textContent`);
  await b.evaluate(`document.querySelector('.hero-rotator button').click()`);
  await delay(4900);
  const pausedPhrase = await b.evaluate(`document.querySelector('.hero-rotator-window .is-current').textContent`);
  check('rotating text pauses', pausedPhrase === firstPhrase, { firstPhrase, pausedPhrase });
  await b.evaluate(`document.querySelector('.hero-rotator button').click()`);
  await delay(4800);
  check('rotating text resumes', await b.evaluate(`document.querySelector('.hero-rotator-window .is-current').textContent`) !== pausedPhrase);

  await b.evaluate(`document.querySelector('.hero-scroll-cue').click()`);
  await delay(900);
  check('scroll cue reaches content', await b.evaluate(`scrollY > innerHeight * .7 && document.querySelector('.site-header').classList.contains('header-scrolled') && document.querySelector('#home-story-section').getBoundingClientRect().top >= 0`));

  await b.navigate(base + '/urunler');
  check('inner page header is immediately readable', await b.evaluate(`document.querySelector('.site-header').classList.contains('header-inner-page') && getComputedStyle(document.querySelector('.site-header')).backgroundColor === 'rgb(255, 255, 255)' && getComputedStyle(document.querySelector('.site-header')).color === 'rgb(32, 35, 36)'`));
  await b.evaluate(`document.querySelector('.menu-trigger').click()`);
  check('mobile menu retains scroll lock', await b.evaluate(`document.querySelector('dialog').open && document.body.style.position === 'fixed'`));
  await b.key('Escape'); await delay(200);
  check('mobile menu returns focus', await b.evaluate(`!document.querySelector('dialog').open && document.activeElement.classList.contains('menu-trigger') && document.body.style.position === ''`));

  await b.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await b.navigate(base + '/?motion=reduced');
  const reducedStart = await b.evaluate(`document.querySelector('.hero-rotator-window .is-current').textContent`);
  await delay(4900);
  const reduced = await b.evaluate(`({phrase:document.querySelector('.hero-rotator-window .is-current').textContent,cueAnimation:getComputedStyle(document.querySelector('.hero-scroll-cue span')).animationName,heroPosition:getComputedStyle(document.querySelector('.hero-backdrop')).position})`);
  check('reduced motion is static', reduced.phrase === reducedStart && reduced.cueAnimation === 'none' && reduced.heroPosition === 'absolute', reduced);
} finally { b.close(); }

console.log(JSON.stringify(checks, null, 2));
if (checks.some(item => !item.passed)) process.exitCode = 1;
