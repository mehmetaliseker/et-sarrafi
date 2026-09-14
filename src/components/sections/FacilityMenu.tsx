"use client";

import { useEffect, useState } from "react";
import { facilities, type FacilityId } from "@/data/facilities";
import styles from "@/app/tesislerimiz/facilities.module.css";

export function FacilityMenu() {
  const [active, setActive] = useState<FacilityId>("bergama");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
      const activationLine = headerBottom + 160;
      let current = facilities[0].id;
      for (const facility of facilities) {
        const section = document.getElementById(facility.id);
        if (section && section.getBoundingClientRect().top <= activationLine) current = facility.id;
      }
      setActive(previous => previous === current ? previous : current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <nav className={styles.menu} aria-label="Tesisler arasında gezinme">
    <p className={styles.menuLabel}>TESİSLER</p>
    <ul>{facilities.map(facility => <li key={facility.id}>
      <a href={`#${facility.id}`} className={styles.menuLink} aria-current={active === facility.id ? "location" : undefined} onClick={() => setActive(facility.id)}>
        <span>{facility.name}</span>
        <small>{facility.menuDescription}</small>
      </a>
    </li>)}</ul>
  </nav>;
}
