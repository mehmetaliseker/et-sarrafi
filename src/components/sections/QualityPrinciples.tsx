"use client";

import { useEffect, useRef, useState } from "react";
import { qualityContent } from "@/data/policy";
import styles from "@/app/kalite/quality.module.css";

export function QualityPrinciples() {
  const groupRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const group = groupRef.current;
    if (!group || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = false;
    let secondTimer = 0;
    let thirdTimer = 0;
    const clearSequence = () => {
      window.clearTimeout(secondTimer);
      window.clearTimeout(thirdTimer);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !active) {
        active = true;
        setVisibleCount(1);
        secondTimer = window.setTimeout(() => setVisibleCount(2), 300);
        thirdTimer = window.setTimeout(() => setVisibleCount(3), 600);
      } else if (!entry.isIntersecting && active) {
        active = false;
        clearSequence();
        setVisibleCount(0);
      }
    }, { rootMargin: "0px 0px -40% 0px", threshold: 0.15 });

    setReady(true);
    observer.observe(group);
    return () => {
      observer.disconnect();
      clearSequence();
    };
  }, []);

  return <div className={styles.principleSequence} data-ready={ready || undefined} ref={groupRef}>
    {qualityContent.principles.map((principle, index) => <div className={styles.principle} data-visible={visibleCount > index || undefined} key={principle.number}>
      <div className={styles.principleHeading}><span>{principle.number}</span><h3>{principle.title}</h3></div>
      <p>{principle.description}</p>
    </div>)}
  </div>;
}
