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
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!active || paused) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % phrases.length), 4600);
    return () => window.clearInterval(timer);
  }, [active, paused]);

  return <div className="hero-rotator" ref={ref}>
    <span className="sr-only">{phrases.join(". ")}</span>
    <span aria-hidden="true" className="hero-rotator-window">{phrases.map((phrase, phraseIndex) => <span className={phraseIndex === index ? "is-current" : ""} key={phrase}>{phrase}</span>)}</span>
    <button aria-label={paused ? "Değişen ifadeleri oynat" : "Değişen ifadeleri duraklat"} aria-pressed={paused} onClick={() => setPaused(value => !value)} type="button"><span aria-hidden="true" /></button>
  </div>;
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
