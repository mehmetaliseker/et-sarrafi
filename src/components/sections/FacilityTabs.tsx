"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { facilities } from "@/data/facilities";
import { media } from "@/data/media";
import { Media } from "@/components/ui/Media";

export function FacilityTabs() {
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const facility = facilities[selected];

  function select(index: number) {
    setSelected(index);
    tabsRef.current[index]?.focus({ preventScroll: true });
    tabsRef.current[index]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % facilities.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + facilities.length) % facilities.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = facilities.length - 1;
    else return;
    event.preventDefault();
    select(next);
  }

  return <div className="facility-tabs">
    <div aria-label="Tesis seçimi" className="facility-tablist" role="tablist">
      {facilities.map((item, index) => <button
        aria-controls="facility-panel" aria-selected={selected === index} className="facility-tab"
        id={`facility-tab-${item.id}`} key={item.id} onClick={() => select(index)}
        onKeyDown={event => onKeyDown(event, index)} ref={element => { tabsRef.current[index] = element; }}
        role="tab" tabIndex={selected === index ? 0 : -1} type="button"
      >{item.name}</button>)}
    </div>
    <div aria-labelledby={`facility-tab-${facility.id}`} className="facility-panel" id="facility-panel" role="tabpanel" tabIndex={0}>
      <div className="facility-panel-content" key={facility.id}>
        <Media asset={media[facility.media]} className="facility-panel-image" sizes="(min-width: 768px) 62vw, 100vw" />
        <div className="facility-panel-copy"><p className="eyebrow">{facility.activity}</p><h2>{facility.name}</h2><p>{facility.description}</p></div>
      </div>
    </div>
  </div>;
}
