"use client";

import { useEffect, useRef } from "react";
import { Media } from "@/components/ui/Media";
import { media } from "@/data/media";

export function FocusZoomMedia() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.parentElement?.getBoundingClientRect();
      if (!rect || preference.matches) {
        element.style.setProperty("--focus-zoom", "1");
        return;
      }
      const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
      const travel = (rect.height + window.innerHeight) / 2;
      const focus = Math.min(1, Math.max(0, 1 - distance / travel));
      const amount = window.innerWidth < 768 ? 0.05 : 0.08;
      element.style.setProperty("--focus-zoom", (1 + amount * focus).toFixed(4));
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
  return <div className="immersive-media" ref={ref} aria-hidden="true"><Media asset={media.homeImmersive} sizes="100vw" /></div>;
}
