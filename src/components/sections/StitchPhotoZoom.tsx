"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function StitchPhotoZoom({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = element.parentElement?.getBoundingClientRect();
      if (!section || preference.matches || window.innerWidth < 768) { element.style.setProperty("--stitch-zoom", "1"); return; }
      const distance = Math.abs(section.top + section.height / 2 - window.innerHeight / 2);
      const travel = (section.height + window.innerHeight) / 2;
      const focus = Math.min(1, Math.max(0, 1 - distance / travel));
      element.style.setProperty("--stitch-zoom", (1 + .06 * focus).toFixed(4));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); preference.removeEventListener("change", schedule); if (frame) cancelAnimationFrame(frame); };
  }, []);
  return <div className="stitch-wide-media" ref={ref} aria-hidden="true"><Image src={src} alt="" fill sizes="100vw" /></div>;
}
