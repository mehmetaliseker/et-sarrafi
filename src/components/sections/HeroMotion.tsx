"use client";

import { useEffect, useRef, useState } from "react";

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

export function StitchHeroMotion() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".stitch-hero");
    if (!hero) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (preference.matches) {
        hero.style.setProperty("--stitch-hero-scale", "1");
        hero.style.setProperty("--stitch-hero-tilt", "0deg");
        hero.style.setProperty("--stitch-hero-lift", "0%");
        return;
      }
      const progress = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * .82)));
      const startScale = window.innerWidth < 768 ? 1.1 : 1.13;
      hero.style.setProperty("--stitch-hero-scale", (startScale - (startScale - 1.015) * progress).toFixed(4));
      hero.style.setProperty("--stitch-hero-tilt", `${(2.1 * progress).toFixed(3)}deg`);
      hero.style.setProperty("--stitch-hero-lift", `${(-1.4 * progress).toFixed(3)}%`);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}

export function HeroScrollCue() {
  const { ref, active, reducedMotion } = useHeroActivity();
  return <div ref={ref} className={`hero-scroll-wrap${active ? " is-active" : ""}`}>
    <a aria-label="İçeriğe geç" className="hero-scroll-cue" href="#urunler" onClick={event => {
      event.preventDefault();
      document.querySelector("#urunler, #home-products-section")?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });
    }}><span aria-hidden="true" /></a>
  </div>;
}
