import Link from "next/link";
import { siteConfig } from "@/config/site";
import { homeContent } from "@/data/home";
import { SiteFooter } from "./SiteFooter";
import styles from "./site-closing.module.css";

export function SiteClosing() {
  return <div className={styles.closing}>
    <section className={styles.contact} aria-labelledby="site-closing-title">
      <div className={styles.contactInner}>
        <div className={styles.contactCopy}>
          <p className={styles.eyebrow}>İş Ortaklığı &amp; Tedarik</p>
          <h2 id="site-closing-title">{homeContent.contact.title}</h2>
          <p>{homeContent.contact.description}</p>
        </div>
        <div className={styles.actions}>
          <Link className={styles.lightButton} href="/iletisim">İletişim Bilgileri</Link>
          <a className={styles.outlineButton} href={siteConfig.contact.phone.href}>{siteConfig.contact.phone.display}</a>
        </div>
      </div>
    </section>
    <SiteFooter />
  </div>;
}
