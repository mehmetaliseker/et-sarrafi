import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Reveal } from "@/components/ui/Reveal";
import { qualityContent } from "@/data/policy";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./quality.module.css";

export const metadata = createPageMetadata({ title: qualityContent.title, description: qualityContent.introduction, path: "/kalite" });

export default function QualityPage() {
  return <article className={styles.page}>
    <div className={styles.container}>
      <header className={styles.intro}>
        <Breadcrumb items={[{ label: "Ana Sayfa", href: "/" }, { label: qualityContent.title }]} />
        <h1>{qualityContent.title}</h1>
        <p>{qualityContent.introduction}</p>
      </header>

      <section className={styles.approach} aria-labelledby="quality-approach-title">
        <div className={styles.imageFrame}>
          <Image src={qualityContent.image.src} alt={qualityContent.image.alt} fill sizes="(min-width: 768px) 40vw, calc(100vw - 40px)" style={{ objectPosition: qualityContent.image.position }} priority />
        </div>
        <div className={styles.approachCopy}>
          <h2 id="quality-approach-title">{qualityContent.approach.title}</h2>
          {qualityContent.approach.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className={styles.principles} aria-label="Kalite yaklaşımımızın temel başlıkları">
        <h2 className={styles.visuallyHidden}>Kalite ilkelerimiz</h2>
        {qualityContent.principles.map(principle => <Reveal className={styles.principle} bottomViewportFraction={0.4} waitForScroll key={principle.number}>
          <div className={styles.principleHeading}><span>{principle.number}</span><h3>{principle.title}</h3></div>
          <p>{principle.description}</p>
        </Reveal>)}
        <Link className={styles.policyLink} href="/politikalarimiz">Tüm Politikaları Görüntüle <span aria-hidden="true">→</span></Link>
      </section>
    </div>
  </article>;
}
