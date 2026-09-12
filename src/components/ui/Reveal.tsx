"use client";
import { useEffect, useRef, type ReactNode } from "react";
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element) return;
    let frame = 0;
    let offset = 0;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const update = () => {
      frame = 0;
      if (preference.matches) {
        element.style.opacity = "";
        element.style.transform = "";
        offset = 0;
        return;
      }
      const rect = element.getBoundingClientRect();
      const top = rect.top - offset;
      const bottom = rect.bottom - offset;
      const range = Math.max(120, window.innerHeight * 0.38);
      const entering = clamp((window.innerHeight - top) / range);
      const leaving = clamp(bottom / range);
      const opacity = Math.min(entering, leaving);
      offset = entering < leaving ? (1 - opacity) * 28 : -(1 - opacity) * 28;
      element.style.opacity = opacity.toFixed(3);
      element.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
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
  return <div ref={ref} className={className}>{children}</div>;
}
