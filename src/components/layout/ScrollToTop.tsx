"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

function resetInnerScrollers() {
  document.querySelectorAll<HTMLElement>("body *").forEach((element) => {
    if (element.scrollTop === 0 && element.scrollLeft === 0) return;
    const { overflowX, overflowY } = window.getComputedStyle(element);
    if (/auto|scroll/.test(`${overflowX} ${overflowY}`)) element.scrollTo({ top: 0, left: 0, behavior: "instant" });
  });
}

export function ScrollToTop() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  useEffect(() => {
    const restoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = restoration; };
  }, []);

  useLayoutEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    resetInnerScrollers();
    const frame = window.requestAnimationFrame(() => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ block: "start", behavior: "instant" });
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);
  return null;
}
