import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PolicyMenu } from "@/components/sections/PolicyMenu";
import { siteConfig } from "@/config/site";
import { policyContent, type PolicySection } from "@/data/policy";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./policies.module.css";

export const metadata = createPageMetadata({ title: policyContent.title, description: policyContent.introduction, path: "/politikalarimiz" });

function SectionHeading({ section, headingId }: { section: PolicySection; headingId: string }) {
  return <header className={styles.sectionHeading}>
    <div className={styles.sectionNumber}><span>BÖLÜM {section.number}</span><i aria-hidden="true" /></div>
    <h2 id={headingId}>{section.title}</h2>
  </header>;
}

export default function PoliciesPage() {
  const [quality, privacy, cookies] = policyContent.sections;

  return <article className={styles.page}>
    <div className={styles.container}>
      <header className={styles.intro}>
        <Breadcrumb items={[{ label: "Ana Sayfa", href: "/" }, { label: policyContent.title }]} />
        <h1>{policyContent.title}</h1>
        <p>{policyContent.introduction}</p>
      </header>

      <div className={styles.policyRegion}>
        <aside className={styles.menuColumn}><PolicyMenu /></aside>
        <div className={styles.policyBody}>
          <section id={quality.id} className={styles.section} aria-labelledby="quality-policy-title">
            <SectionHeading section={quality} headingId="quality-policy-title" />
            <ol className={styles.qualityList}>
              {policyContent.qualityItems.map((item, index) => <li key={item}>
                <span className={styles.itemNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>)}
            </ol>
          </section>

          <section id={privacy.id} className={styles.section} aria-labelledby="privacy-policy-title">
            <SectionHeading section={privacy} headingId="privacy-policy-title" />
            <div className={styles.privacyCopy}>
              {policyContent.privacy.map(block => <div key={block.title}>
                <h3>{block.title}</h3>
                {block.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              </div>)}
              <div>
                <h3>İletişim</h3>
                <p>Gizlilik ve güvenlik konusundaki sorularınız için <a href={siteConfig.contact.email.href}>{siteConfig.contact.email.display}</a> adresinden bize ulaşabilirsiniz.</p>
              </div>
            </div>
          </section>

          <section id={cookies.id} className={styles.section} aria-labelledby="cookies-policy-title">
            <SectionHeading section={cookies} headingId="cookies-policy-title" />
            <div className={styles.cookieCopy}>{policyContent.cookies.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>
        </div>
      </div>
    </div>
  </article>;
}
