"use client";

import { SiteNavigation } from "@/components/layout/SiteNavigation";
import { Container } from "@/components/ui/Container";
import { Brand } from "@/components/ui/Brand";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setIsScrolled(current => window.scrollY > (current ? 36 : 84));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isHome]);

  const stateClass = isHome ? (isScrolled ? "header-home header-scrolled" : "header-home header-top") : "header-inner-page";
  return <header className={`site-header ${stateClass}${isHome && isScrolled ? " backdrop-blur-md" : ""}`}><Container className="header-inner"><Brand /><SiteNavigation /></Container></header>;
}
