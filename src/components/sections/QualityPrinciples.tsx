"use client";

import { useEffect, useRef, useState } from "react";
import { qualityContent } from "@/data/policy";
import styles from "@/app/(site)/kalite/quality.module.css";

export function QualityPrinciples() {
  const groupRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const playedRef = useRef(false);

  useEffect(() => {
    const group = groupRef.current;
    if (!group || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let secondTimer = 0;
    let thirdTimer = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || playedRef.current) return;
      playedRef.current = true;
      setVisibleCount(1);
      secondTimer = window.setTimeout(() => setVisibleCount(2), 450);
      thirdTimer = window.setTimeout(() => setVisibleCount(3), 900);
      observer.disconnect();
    }, { rootMargin: "0px 0px -20% 0px", threshold: 0.2 });

    observer.observe(group);
    return () => {
      observer.disconnect();
      window.clearTimeout(secondTimer);
      window.clearTimeout(thirdTimer);
    };
  }, []);

  return <div className={styles.principleSequence} data-ready="true" ref={groupRef}>
    {qualityContent.principles.map((principle, index) => <div className={styles.principle} data-visible={visibleCount > index || undefined} key={principle.number}>
      <div className={styles.principleHeading}><span>{principle.number}</span><h3>{principle.title}</h3></div>
      <p>{principle.description}</p>
    </div>)}
  </div>;
}
