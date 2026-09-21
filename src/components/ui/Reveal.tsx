"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./reveal.module.css";

const visibleThreshold = 0.15;

export function Reveal({ children, className = "", bottomViewportFraction = 0, waitForScroll = false, staticOnMobile = false }: { children: ReactNode; className?: string; bottomViewportFraction?: number; waitForScroll?: boolean; staticOnMobile?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (staticOnMobile && window.matchMedia("(max-width: 47.99rem)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let initialFrame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const transform = new DOMMatrixReadOnly(window.getComputedStyle(element).transform);
      const top = rect.top - transform.m42;
      const bottom = rect.bottom - transform.m42;
      const visibleBottom = window.innerHeight * (1 - bottomViewportFraction);
      const visibleHeight = Math.max(0, Math.min(bottom, visibleBottom) - Math.max(top, 0));
      element.classList.toggle(styles.hidden, (waitForScroll && window.scrollY < 8) || visibleHeight / rect.height < visibleThreshold);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    element.classList.add(styles.enabled, styles.initial);
    update();
    initialFrame = window.requestAnimationFrame(() => element.classList.remove(styles.initial));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
      if (initialFrame) window.cancelAnimationFrame(initialFrame);
      element.classList.remove(styles.enabled, styles.initial, styles.hidden);
    };
  }, [bottomViewportFraction, staticOnMobile, waitForScroll]);

  return <div ref={ref} className={className}>{children}</div>;
}
