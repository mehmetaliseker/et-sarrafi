"use client";
import { useEffect, useRef, type ReactNode } from "react";
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !("IntersectionObserver" in window)) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      animation = element.animate([{ opacity: 0.5, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 580, easing: "cubic-bezier(.2,.7,.2,1)" });
      observer.disconnect();
    }, { threshold: 0.12 });
    const stop = () => { if (preference.matches) { observer.disconnect(); animation?.cancel(); } };
    observer.observe(element); preference.addEventListener("change", stop);
    return () => { observer.disconnect(); animation?.cancel(); preference.removeEventListener("change", stop); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
