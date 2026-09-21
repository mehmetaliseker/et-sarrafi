"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { closingHighlights } from "@/data/closing";
import { SiteFooter } from "./SiteFooter";
import styles from "./site-closing.module.css";

const defaultBackgroundImage = "/media/professional_food_photography_of_fresh_premium_raw_beef_cuts_ribeye_steak_and.png";

function HighlightIcon({ icon }: { icon: typeof closingHighlights[number]["icon"] }) {
  switch (icon) {
    case "grid":
      return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>;
    case "info":
      return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5h.01" /></svg>;
    case "contact":
      return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5h16v11H8l-4 4V5Z" /><path d="M8 9h8M8 12h5" /></svg>;
    case "supply":
      return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 7h12v10H3zM15 10h3l3 3v4h-6z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></svg>;
    default: {
      const _exhaustive: never = icon;
      return _exhaustive;
    }
  }
}

interface SiteClosingProps {
  backgroundImage?: string;
}

export function SiteClosing({ backgroundImage = defaultBackgroundImage }: SiteClosingProps) {
  const bandRef = useRef<HTMLElement>(null);
  const isVehicle = backgroundImage.includes("/arac.");
  const bandStyle = {
    "--closing-photo": `url("${backgroundImage}")`,
    "--vehicle-y": "0px",
  } as CSSProperties;

  useEffect(() => {
    if (!isVehicle) return;
    const band = bandRef.current;
    if (!band) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = band.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        band.style.setProperty("--vehicle-y", "0px");
        return;
      }

      const progress = Math.min(1, Math.max(0, (viewHeight - rect.top) / (viewHeight + rect.height)));
      const offsetY = (progress - 0.5) * 28;
      band.style.setProperty("--vehicle-y", `${offsetY}px`);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isVehicle]);

  return <div className={styles.closing}>
    <section
      ref={bandRef}
      className={isVehicle ? `${styles.contact} ${styles.contactVehicle}` : styles.contact}
      aria-label="Ürün ve iletişim bilgileri"
      style={bandStyle}
    >
      <div className={styles.contactLayout}>
        <div className={styles.highlights} aria-label="İletişim ve katalog bilgileri">
          {closingHighlights.map(item => <div className={styles.highlight} key={item.title}>
            <span className={styles.highlightIcon}><HighlightIcon icon={item.icon} /></span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>)}
        </div>
      </div>
    </section>
    <SiteFooter />
  </div>;
}

export type { SiteClosingProps };
