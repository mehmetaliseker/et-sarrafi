"use client";

import { useEffect, useRef, useState } from "react";

const phrases = [
  "Büyükbaş ve küçükbaş et ürünleri",
  "Profesyonel mutfaklara tedarik",
  "Et işleme ve sevkiyat",
] as const;

function useHeroActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const hero = ref.current?.closest(".home-hero");
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setIsPageVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.05 });
    if (hero) observer.observe(hero);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  return { ref, active: isVisible && isPageVisible && !reducedMotion, reducedMotion };
}

export function HeroRotatingText() {
  const { ref, active } = useHeroActivity();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % phrases.length), 4600);
    return () => window.clearInterval(timer);
  }, [active]);

  return <div className="hero-rotator" ref={ref}>
    <span className="sr-only">{phrases[0]}</span>
    <span aria-hidden="true" className="hero-rotator-window">{phrases.map((phrase, phraseIndex) => <span className={phraseIndex === index ? "is-current" : ""} key={phrase}>{phrase}</span>)}</span>
  </div>;
}

export function HeroZoom() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".home-hero");
    if (!hero) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const start = window.innerWidth < 768 ? 0.06 : 0.08;
      const progress = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.5)));
      hero.style.setProperty("--hero-zoom", motion.matches ? "1" : (1 + start * (1 - progress)).toFixed(4));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}

export function HeroScrollCue() {
  const { ref, active, reducedMotion } = useHeroActivity();
  return <div ref={ref} className={`hero-scroll-wrap${active ? " is-active" : ""}`}>
    <a aria-label="İçeriğe geç" className="hero-scroll-cue" href="#home-story-section" onClick={event => {
      event.preventDefault();
      document.querySelector("#home-story-section")?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });
    }}><span aria-hidden="true" /></a>
  </div>;
}
