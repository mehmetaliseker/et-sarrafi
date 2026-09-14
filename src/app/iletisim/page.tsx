import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./contact.module.css";

const description = "Ürün bilgisi ve kurumsal tedarik talepleriniz için bize ulaşın.";
export const metadata = createPageMetadata({ title: "İletişim", description, path: "/iletisim" });

function ContactIcon({ kind }: { kind: "phone" | "email" | "address" }) {
  if (kind === "phone") return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6.5 3.5h3l1.2 4.2-1.8 1.6a15 15 0 0 0 5.8 5.8l1.6-1.8 4.2 1.2v3A2.5 2.5 0 0 1 18 20C9.7 20 4 14.3 4 6a2.5 2.5 0 0 1 2.5-2.5Z" /></svg>;
  if (kind === "email") return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}

export default function ContactPage() {
  const { contact } = siteConfig;

  return <article className={styles.page}>
    <div className={styles.container}>
      <header className={styles.intro}>
        <Breadcrumb items={[{ label: "Ana Sayfa", href: "/" }, { label: "İletişim" }]} />
        <h1>İletişim</h1>
        <p>{description}</p>
      </header>

      <div className={styles.layout}>
        <section className={styles.details} aria-labelledby="company-name">
          <h2 id="company-name">{siteConfig.name}</h2>
          <p className={styles.legalName}>{siteConfig.legalName}</p>

          <div className={styles.channels}>
            <div className={styles.channel}>
              <div className={styles.channelTitle}><ContactIcon kind="phone" /><h3>Telefon</h3></div>
              <a href={contact.phone.href}>{contact.phone.display}</a>
            </div>
            <div className={styles.channel}>
              <div className={styles.channelTitle}><ContactIcon kind="email" /><h3>E-posta</h3></div>
              <a href={contact.email.href}>{contact.email.display}</a>
            </div>
            <div className={styles.channel}>
              <div className={styles.channelTitle}><ContactIcon kind="address" /><h3>Adres</h3></div>
              <address>{contact.address.display}</address>
            </div>
          </div>

          <a className={styles.directions} href={contact.address.directionsUrl} target="_blank" rel="noopener noreferrer">Yol Tarifi Al <span aria-hidden="true">→</span></a>
        </section>

        <section className={styles.map} aria-label="Konum haritası">
          <iframe
            title={`${siteConfig.name} — ${contact.address.display} konum haritası`}
            src={contact.address.embedUrl}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </section>
      </div>
    </div>
  </article>;
}
