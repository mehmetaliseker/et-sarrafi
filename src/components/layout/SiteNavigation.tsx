"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import type { KeyboardEvent } from "react";
import { navigationItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const unlockRef = useRef<(() => void) | null>(null);
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const unlock = useCallback(() => { unlockRef.current?.(); unlockRef.current = null; }, []);
  const closeMenu = useCallback(() => { unlock(); dialogRef.current?.close(); }, [unlock]);
  function openMenu() {
    const y = window.scrollY;
    const old = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width, overflow: document.body.style.overflow };
    Object.assign(document.body.style, { position: "fixed", top: `-${y}px`, width: "100%", overflow: "hidden" });
    unlockRef.current = () => { Object.assign(document.body.style, old); window.scrollTo({ top: y, behavior: "instant" }); };
    dialogRef.current?.showModal();
    setIsOpen(true);
  }
  function handleClose() {
    unlock(); setIsOpen(false);
    if (!window.matchMedia("(min-width: 64rem)").matches) buttonRef.current?.focus({ preventScroll: true });
  }
  function handleKeys(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const items = dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
    if (!items?.length) return;
    const first = items[0]; const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const resize = () => { if (desktop.matches) closeMenu(); };
    desktop.addEventListener("change", resize);
    return () => { unlock(); desktop.removeEventListener("change", resize); };
  }, [closeMenu, unlock]);
  useEffect(() => { closeMenu(); }, [pathname, closeMenu]);
  return <>
    <nav aria-label="Ana navigasyon" className="desktop-nav"><ul><li><Link aria-current={pathname === "/" ? "page" : undefined} href="/">Ana Sayfa</Link></li>{navigationItems.filter(item => item.href !== "/iletisim").map(item => <li key={item.href}><Link aria-current={active(item.href) ? "page" : undefined} href={item.href}>{item.label}</Link></li>)}</ul></nav>
    <Link className="header-contact" href="/iletisim">İletişim</Link>
    <div className="mobile-nav">
      <button aria-controls="mobile-navigation" aria-expanded={isOpen} aria-haspopup="dialog" aria-label="Ana menüyü aç" className="menu-trigger" ref={buttonRef} type="button" onClick={openMenu}>Menü<span aria-hidden="true"><i /><i /></span></button>
      <dialog id="mobile-navigation" aria-labelledby="mobile-menu-title" className="menu-dialog" ref={dialogRef} onClose={handleClose} onCancel={event => { event.preventDefault(); closeMenu(); }} onKeyDown={handleKeys}>
        <div className="menu-heading"><p id="mobile-menu-title">{siteConfig.name} / Menü</p><button aria-label="Ana menüyü kapat" type="button" onClick={closeMenu}>Kapat <span aria-hidden="true">×</span></button></div>
        <nav aria-label="Mobil navigasyon"><ul>{[{ label: "Ana sayfa", href: "/" }, ...navigationItems].map(item => <li key={item.href}><Link aria-current={(item.href === "/" ? pathname === "/" : active(item.href)) ? "page" : undefined} href={item.href} onClick={closeMenu}>{item.label}</Link></li>)}</ul></nav>
        <a className="menu-contact" href={siteConfig.contact.phone.href}>{siteConfig.contact.phone.display}</a>
      </dialog>
    </div>
  </>;
}
