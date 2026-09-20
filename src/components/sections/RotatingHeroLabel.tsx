"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { BrandMarkIcon } from "@/components/ui/BrandMarkIcon";

const labels = [
  "Endüstriyel Gıda Çözümleri",
  "Kurumsal Tedarik Çözümleri",
  "Profesyonel Mutfak Çözümleri",
] as const;

export function RotatingHeroLabel() {
  const [index, setIndex] = useState(0);
  const [labelWidth, setLabelWidth] = useState(224);
  const measureRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useLayoutEffect(() => {
    let active = true;
    const measure = () => {
      const width = measureRefs.current[index]?.getBoundingClientRect().width;
      if (active && width) setLabelWidth(Math.ceil(width));
    };
    measure();
    void document.fonts.ready.then(measure);
    return () => { active = false; };
  }, [index]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % labels.length), 5500);
    return () => window.clearInterval(timer);
  }, []);

  const style = { "--rotator-width": `${labelWidth}px` } as CSSProperties;
  return <div className="stitch-rotator" style={style} aria-live="polite">
    <span className="stitch-rotator-mark" aria-hidden="true"><BrandMarkIcon name="steak" /></span>
    <span className="stitch-rotator-window"><span className="stitch-rotator-text" key={labels[index]}>{labels[index]}</span></span>
    <span className="stitch-rotator-measures" aria-hidden="true">{labels.map((label, itemIndex) => <span key={label} ref={element => { measureRefs.current[itemIndex] = element; }}>{label}</span>)}</span>
  </div>;
}
