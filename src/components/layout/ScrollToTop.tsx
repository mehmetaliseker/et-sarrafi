"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function ScrollToTop() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  useEffect(() => {
    if (previous.current !== pathname) {
      window.history.scrollRestoration = "manual";
      const frame = window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
      previous.current = pathname;
      return () => window.cancelAnimationFrame(frame);
    }
    previous.current = pathname;
  }, [pathname]);
  return null;
}
