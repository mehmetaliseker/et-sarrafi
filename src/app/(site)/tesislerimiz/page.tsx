import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Reveal } from "@/components/ui/Reveal";
import type { ReactNode } from "react";
import { FacilityMenu } from "@/components/sections/FacilityMenu";
import { developmentSteps, facilities, type Facility } from "@/data/facilities";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./facilities.module.css";

const description = "Yetiştiricilik, besi ve kırmızı et işleme faaliyetlerimizin yürütüldüğü tesisleri ve üretim sürecindeki görevlerini tanıyın.";
export const metadata = createPageMetadata({ title: "Tesislerimiz", description, path: "/tesislerimiz" });

function ContentBlock({ children, className, animate }: { children: ReactNode; className?: string; animate: boolean }) {
  return animate ? <Reveal className={className}>{children}</Reveal> : <div className={className}>{children}</div>;
}

function FacilityContent({ facility }: { facility: Facility }) {
  const animate = facility.id !== "bergama";
  return <section id={facility.id} className={`${styles.facility} ${facility.id === "ornekkoy" ? styles.processing : ""}`} aria-labelledby={`${facility.id}-title`}>
    <ContentBlock className={styles.facilityHeading} animate={animate}>
      <p className={styles.sequence}>{facility.sequence}</p>
      <h2 id={`${facility.id}-title`}>{facility.name}</h2>
      <p className={styles.badge}>{facility.badge}</p>
    </ContentBlock>
    <ContentBlock className={styles.metrics} animate={animate}>
      {facility.metrics.map(metric => <div className={styles.metric} key={metric.label}>
        <strong>{metric.value}</strong>
        <span>{metric.label}</span>
      </div>)}
    </ContentBlock>
    {facility.paragraphs && <div className={styles.facilityCopy}>
      {facility.paragraphs.map(paragraph => <ContentBlock animate={animate} key={paragraph}><p>{paragraph}</p></ContentBlock>)}
    </div>}
    {facility.sections && <div className={styles.processingSections}>
      {facility.sections.map(section => <Reveal className={styles.processingSection} key={section.title}>
        <h3>{section.title}</h3>
        {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </Reveal>)}
    </div>}
  </section>;
}

export default function FacilitiesPage() {
  return <article className={styles.page}>
    <div className={styles.container}>
      <header className={styles.intro}>
        <Breadcrumb items={[{ label: "Ana Sayfa", href: "/" }, { label: "Tesislerimiz" }]} />
        <h1>Tesislerimiz</h1>
        <p className={styles.description}>{description}</p>
      </header>

      <div className={styles.facilityRegion}>
        <aside className={styles.menuColumn}><FacilityMenu /></aside>
        <div className={styles.facilityList}>
          {facilities.map(facility => <FacilityContent facility={facility} key={facility.id} />)}
        </div>
      </div>

      <section className={styles.development} aria-labelledby="development-title">
        <Reveal className={styles.developmentHeading}>
          <p className={styles.eyebrow}>KİLOMETRE TAŞLARI</p>
          <h2 id="development-title">Gelişim Süreci</h2>
        </Reveal>
        <div className={styles.timeline}>
          {developmentSteps.map(step => <Reveal className={styles.timelineItem} key={step.year}>
            <div className={styles.yearLine}><span>{step.year}</span><i aria-hidden="true" /></div>
            <h3>{step.label}</h3>
            <p>{step.description}</p>
          </Reveal>)}
        </div>
      </section>
    </div>
  </article>;
}
