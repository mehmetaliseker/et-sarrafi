"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { navigationItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Brand } from "@/components/ui/Brand";

type MenuPhase = "closed" | "opening" | "open" | "closing";

export function SiteNavigation() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<MenuPhase>("closed");
  const phaseRef = useRef<MenuPhase>("closed");
  const dialogRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const unlockRef = useRef<((restorePosition: boolean) => void) | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const openFrameRef = useRef<number | null>(null);
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const transitionTo = useCallback((nextPhase: MenuPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  const unlock = useCallback((restorePosition = true) => {
    unlockRef.current?.(restorePosition);
    unlockRef.current = null;
    delete document.documentElement.dataset.menuOpen;
  }, []);

  const clearSchedule = useCallback(() => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    if (openFrameRef.current !== null) window.cancelAnimationFrame(openFrameRef.current);
    closeTimerRef.current = null;
    openFrameRef.current = null;
  }, []);

  const finishClose = useCallback((restorePosition: boolean) => {
    clearSchedule();
    unlock(restorePosition);
    transitionTo("closed");
    if (!window.matchMedia("(min-width: 64rem)").matches) buttonRef.current?.focus({ preventScroll: true });
  }, [clearSchedule, transitionTo, unlock]);

  const closeMenu = useCallback((restorePosition = true, immediate = false) => {
    if (phaseRef.current === "closed") return;
    clearSchedule();
    transitionTo("closing");
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 420;
    if (immediate || duration === 0) {
      finishClose(restorePosition);
      return;
    }
    closeTimerRef.current = window.setTimeout(() => finishClose(restorePosition), duration);
  }, [clearSchedule, finishClose, transitionTo]);

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || phaseRef.current !== "closed") return;
    clearSchedule();
    const y = window.scrollY;
    const old = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    Object.assign(document.body.style, { position: "fixed", top: `-${y}px`, width: "100%", overflow: "hidden" });
    unlockRef.current = restorePosition => {
      Object.assign(document.body.style, old);
      window.scrollTo({ top: restorePosition ? y : 0, behavior: "instant" });
    };
    document.documentElement.dataset.menuOpen = "true";
    transitionTo("opening");
    openFrameRef.current = window.requestAnimationFrame(() => {
      openFrameRef.current = window.requestAnimationFrame(() => {
        openFrameRef.current = null;
        transitionTo("open");
        dialog.querySelector<HTMLElement>("nav a[href]")?.focus({ preventScroll: true });
      });
    });
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }
    if (event.key !== "Tab") return;
    const items = dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
    if (!items?.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const resize = () => { if (desktop.matches) closeMenu(true, true); };
    desktop.addEventListener("change", resize);
    return () => {
      clearSchedule();
      unlock(true);
      desktop.removeEventListener("change", resize);
    };
  }, [clearSchedule, closeMenu, unlock]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => closeMenu(false, true));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, closeMenu]);

  const expanded = phase === "opening" || phase === "open";
  return <>
    <nav aria-label="Ana navigasyon" className="desktop-nav"><ul><li><Link aria-current={pathname === "/" ? "page" : undefined} href="/">Ana Sayfa</Link></li>{navigationItems.filter(item => item.href !== "/iletisim").map(item => <li key={item.href}><Link aria-current={active(item.href) ? "page" : undefined} href={item.href}>{item.label}</Link></li>)}</ul></nav>
    <Link className="header-contact" href="/iletisim">İletişim</Link>
    <div className="mobile-nav">
      <button aria-controls="mobile-navigation" aria-expanded={expanded} aria-haspopup="dialog" aria-label={expanded ? "Ana menüyü kapat" : "Ana menüyü aç"} className="menu-trigger" ref={buttonRef} type="button" onClick={() => expanded ? closeMenu(true) : openMenu()}>Menü<span aria-hidden="true"><i /><i /></span></button>
      <div id="mobile-navigation" role="dialog" aria-modal="true" aria-hidden={phase === "closed"} aria-labelledby="mobile-menu-title" className="menu-dialog" data-state={phase} inert={phase === "closed"} ref={dialogRef} onKeyDown={handleKeys}>
        <div className="menu-bar">
          <Brand onClick={() => closeMenu(true)} />
          <button aria-label="Ana menüyü kapat" className="menu-close" type="button" onClick={() => closeMenu(true)}><span aria-hidden="true"><i /><i /></span></button>
        </div>
        <div className="menu-content">
          <p className="menu-title" id="mobile-menu-title">{siteConfig.name} / Menü</p>
          <nav aria-label="Mobil navigasyon"><ul>{[{ label: "Ana sayfa", href: "/" }, ...navigationItems].map(item => <li key={item.href}><Link aria-current={(item.href === "/" ? pathname === "/" : active(item.href)) ? "page" : undefined} href={item.href} onClick={() => { if (item.href === pathname) closeMenu(true); }}>{item.label}</Link></li>)}</ul></nav>
          <a className="menu-contact" href={siteConfig.contact.phone.href}>{siteConfig.contact.phone.display}</a>
        </div>
      </div>
    </div>
  </>;
}
