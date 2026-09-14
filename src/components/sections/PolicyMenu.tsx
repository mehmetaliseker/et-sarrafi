"use client";

import { useEffect, useState } from "react";
import { policyContent } from "@/data/policy";
import styles from "@/app/politikalarimiz/policies.module.css";

type PolicyId = (typeof policyContent.sections)[number]["id"];

export function PolicyMenu() {
  const [active, setActive] = useState<PolicyId>(policyContent.sections[0].id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
      const activationLine = headerBottom + 150;
      let current: PolicyId = policyContent.sections[0].id;
      for (const section of policyContent.sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= activationLine) current = section.id;
      }
      setActive(previous => previous === current ? previous : current);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    window.addEventListener("popstate", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      window.removeEventListener("popstate", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <nav className={styles.menu} aria-label="Politika bölümleri">
    <ul>{policyContent.sections.map(section => <li key={section.id}>
      <a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined} onClick={() => setActive(section.id)}>{section.title === "Kalite ve Helal Politikamız" ? "Kalite ve Helal Politikası" : section.title}</a>
    </li>)}</ul>
  </nav>;
}
