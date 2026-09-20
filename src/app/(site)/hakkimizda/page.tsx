import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { aboutContent, aboutImages, type AboutImage } from "@/data/about";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./about.module.css";

export const metadata = createPageMetadata({
  title: "Hakkımızda",
  description: aboutContent.intro.description,
  path: "/hakkimizda",
});

function AboutPhoto({ image, className, sizes, eager = false }: {
  image: AboutImage;
  className: string;
  sizes: string;
  eager?: boolean;
}) {
  const style = {
    "--about-ratio-desktop": image.desktopRatio,
    "--about-ratio-mobile": image.mobileRatio,
    "--about-position-desktop": image.desktopPosition,
    "--about-position-mobile": image.mobilePosition,
  } as CSSProperties;
  return <div className={`${styles.photo} ${className}`} style={style}>
    <Image src={image.src} alt={image.alt} fill sizes={sizes} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} />
  </div>;
}

export default function AboutPage() {
  const content = aboutContent;
  return <article className={styles.page}>
      <div className={styles.container}>
        <section className={styles.intro} aria-labelledby="about-title">
          <Breadcrumb items={[{ label: "Ana Sayfa", href: "/" }, { label: "Hakkımızda" }]} />
          <div className={styles.introGrid}>
            <h1 id="about-title">{content.intro.title}</h1>
            <p>{content.intro.description}</p>
          </div>
        </section>

        <section className={styles.overview} aria-labelledby="about-overview-title">
          <Reveal className={styles.overviewHeading}>
            <p className={styles.eyebrow}>{content.overview.eyebrow}</p>
            <h2 id="about-overview-title">{content.overview.title}</h2>
          </Reveal>
          <div className={styles.overviewCopy}>
            {content.overview.paragraphs.map((paragraph, index) =>
              <Reveal key={paragraph} className={index === 0 ? styles.leadParagraph : styles.paragraph}><p>{paragraph}</p></Reveal>
            )}
          </div>
        </section>

        <section className={styles.approach} aria-labelledby="about-approach-title">
          <Reveal className={styles.approachHeading}>
            <p className={styles.eyebrow}>{content.approach.eyebrow}</p>
            <h2 id="about-approach-title">{content.approach.title}</h2>
          </Reveal>
          <div className={styles.approachRows}>
            {content.approach.items.map(item => <Reveal className={styles.approachRow} key={item.number}>
              <div className={styles.approachName}><span aria-hidden="true">{item.number}</span><h3>{item.title}</h3></div>
              <p>{item.description}</p>
            </Reveal>)}
          </div>
        </section>

        <section className={styles.photoPair} aria-label="Üretim ve ürün görselleri">
          <div className={styles.photoGrid}>
            <Reveal><AboutPhoto image={aboutImages.facility} className={styles.pairPhoto} sizes="(min-width: 800px) 57vw, calc(100vw - 40px)" /></Reveal>
            <Reveal><AboutPhoto image={aboutImages.meat} className={styles.pairPhoto} sizes="(min-width: 800px) 40vw, calc(100vw - 40px)" /></Reveal>
          </div>
          <Reveal className={styles.photoFoot}>
            <p>{content.photoCaption}</p>
            <Link href="/tesislerimiz">{content.photoLink}<span aria-hidden="true">→</span></Link>
          </Reveal>
        </section>
      </div>
    </article>;
}
