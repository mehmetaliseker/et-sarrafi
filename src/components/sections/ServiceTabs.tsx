"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { services } from "@/data/services";
import styles from "@/app/(site)/hizmet-alanlarimiz/services.module.css";

const lastIndex = services.length - 1;
const wrapIndex = (index: number) => (index + services.length) % services.length;
const trackServices = [services[lastIndex], ...services, services[0]] as const;

export function ServiceTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [physicalIndex, setPhysicalIndex] = useState(1);
  const [instant, setInstant] = useState(false);
  const activeRef = useRef(0);
  const physicalRef = useRef(1);
  const lockedRef = useRef(false);
  const resetTimer = useRef<number | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ id: number; x: number; y: number; dragging: boolean } | null>(null);
  const wheelState = useRef({ sum: 0, last: 0, lockedUntil: 0 });
  const active = services[activeIndex];

  const settle = useCallback(() => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = null;
    const current = physicalRef.current;
    if (current === 0 || current === services.length + 1) {
      const realIndex = current === 0 ? services.length : 1;
      setInstant(true);
      physicalRef.current = realIndex;
      setPhysicalIndex(realIndex);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        setInstant(false);
        lockedRef.current = false;
      }));
    } else {
      lockedRef.current = false;
    }
  }, []);

  const goTo = useCallback((nextIndex: number, direction?: -1 | 1) => {
    if (lockedRef.current || nextIndex === activeRef.current) return;
    const current = activeRef.current;
    activeRef.current = nextIndex;
    setActiveIndex(nextIndex);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true);
      physicalRef.current = nextIndex + 1;
      setPhysicalIndex(nextIndex + 1);
      window.requestAnimationFrame(() => setInstant(false));
      return;
    }

    let target = nextIndex + 1;
    if (current === lastIndex && nextIndex === 0 && direction !== -1) target = services.length + 1;
    if (current === 0 && nextIndex === lastIndex && direction !== 1) target = 0;
    lockedRef.current = true;
    physicalRef.current = target;
    setPhysicalIndex(target);
    resetTimer.current = window.setTimeout(settle, 540);
  }, [settle]);

  const step = useCallback((direction: -1 | 1) => {
    goTo(wrapIndex(activeRef.current + direction), direction);
  }, [goTo]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) * 1.15 || Math.abs(event.deltaX) < 1) return;
      event.preventDefault();
      const now = performance.now();
      const state = wheelState.current;
      if (now < state.lockedUntil) return;
      state.sum = now - state.last > 180 ? 0 : state.sum;
      state.last = now;
      state.sum += event.deltaX * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerWidth : 1);
      if (Math.abs(state.sum) < 50) return;
      step(Math.sign(state.sum) as -1 | 1);
      state.sum = 0;
      state.lockedUntil = now + 500;
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [step]);

  useEffect(() => () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
  }, []);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (lockedRef.current || !event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    if ((event.target as HTMLElement).closest("a, button")) return;
    pointerStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dragging: false };
    event.currentTarget.setPointerCapture(event.pointerId);
    if (event.pointerType === "mouse") event.preventDefault();
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    const track = trackRef.current;
    if (!start || start.id !== event.pointerId || !track) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.dragging && (Math.abs(dx) < 10 || Math.abs(dx) <= Math.abs(dy) * 1.1)) return;
    start.dragging = true;
    const limit = event.currentTarget.clientWidth * .85;
    track.dataset.dragging = "true";
    track.style.setProperty("--drag-px", `${Math.max(-limit, Math.min(limit, dx))}px`);
  }

  function finishPointer(event: PointerEvent<HTMLDivElement>, allowChange: boolean) {
    const start = pointerStart.current;
    if (!start || start.id !== event.pointerId) return;
    pointerStart.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const threshold = Math.min(96, Math.max(48, event.currentTarget.clientWidth * .12));
    const track = trackRef.current;
    if (track) {
      delete track.dataset.dragging;
      track.style.removeProperty("--drag-px");
    }
    if (allowChange && start.dragging && Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.1) step(dx < 0 ? 1 : -1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    let direction: -1 | 1 | undefined;
    switch (event.key) {
      case "ArrowRight": nextIndex = wrapIndex(index + 1); direction = 1; break;
      case "ArrowLeft": nextIndex = wrapIndex(index - 1); direction = -1; break;
      case "Home": nextIndex = 0; break;
      case "End": nextIndex = lastIndex; break;
      default: return;
    }
    event.preventDefault();
    if (lockedRef.current) return;
    goTo(nextIndex, direction);
    tabs.current[nextIndex]?.focus();
  }

  return <>
    <p className={styles.introDescription} key={active.id} aria-live="polite">{active.introLine}</p>

    <div className={styles.tabs} role="tablist" aria-label="Hizmet alanları">
      {services.map((service, index) => <button
        className={styles.tab}
        key={service.id}
        id={`service-tab-${service.id}`}
        type="button"
        role="tab"
        aria-controls={`service-panel-${service.id}`}
        aria-selected={activeIndex === index}
        tabIndex={activeIndex === index ? 0 : -1}
        ref={element => { tabs.current[index] = element; }}
        onClick={() => goTo(index)}
        onKeyDown={event => handleKeyDown(event, index)}
      ><span className={styles.tabNumber}>{service.number} /</span><span>{service.title}</span></button>)}
      <span className={styles.tabIndicator} aria-hidden="true" style={{ transform: `translateX(${activeIndex * 100}%)` }} />
    </div>

    <div className={styles.sliderShell}>
      <div
        className={styles.sliderViewport}
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={event => finishPointer(event, true)}
        onPointerCancel={event => finishPointer(event, false)}
        onDragStart={event => event.preventDefault()}
      >
        <div
          className={styles.sliderTrack}
          ref={trackRef}
          data-instant={instant || undefined}
          onTransitionEnd={event => { if (event.target === event.currentTarget && event.propertyName === "transform") settle(); }}
          style={{ "--slide-position": `-${physicalIndex * 100}%` } as CSSProperties}
        >
          {trackServices.map((service, physical) => {
            const clone = physical === 0 || physical === services.length + 1;
            const index = clone ? -1 : physical - 1;
            return <section
              className={styles.slide}
              id={clone ? undefined : `service-panel-${service.id}`}
              key={`${physical}-${service.id}`}
              role={clone ? undefined : "tabpanel"}
              aria-labelledby={clone ? undefined : `service-tab-${service.id}`}
              aria-hidden={clone || index !== activeIndex}
              inert={clone || index !== activeIndex}
              tabIndex={!clone && index === activeIndex ? 0 : -1}
            >
              <div className={styles.figure}>
                <div className={styles.imageFrame}>
                  <Image src={service.image.src} alt={service.image.alt} fill sizes="(min-width: 1200px) 490px, (min-width: 768px) 45vw, calc(100vw - 40px)" style={{ objectPosition: service.image.position }} loading={!clone && index === activeIndex ? "eager" : "lazy"} fetchPriority={!clone && index === activeIndex ? "high" : undefined} draggable={false} />
                </div>
              </div>
              <div className={styles.copy}>
                <p className={styles.eyebrow}>{service.number} / {service.label}</p>
                <h2>{service.title}</h2>
                <p className={styles.description}>{service.description}</p>
                <Link className={styles.action} href={service.href}>{service.action}<span aria-hidden="true">→</span></Link>
              </div>
            </section>;
          })}
        </div>
      </div>
    </div>
  </>;
}
