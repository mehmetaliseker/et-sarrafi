"use client";
import { useEffect, useRef, type ReactNode } from "react";
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element) return;
    if (preference.matches) return;
    element.classList.add("reveal-scroll-linked");
    let frame = 0;
    let offset = 0;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const top = rect.top - offset;
      const bottom = rect.bottom - offset;
      const viewport = window.innerHeight;
      const entering = clamp((viewport * .58 - top) / (viewport * .16));
      const leaving = clamp((bottom - viewport * .1) / (viewport * .28));
      const visibility = Math.min(entering, leaving);
      offset = entering < leaving ? (1 - visibility) * 18 : -(1 - visibility) * 18;
      element.style.opacity = visibility.toFixed(3);
      element.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
