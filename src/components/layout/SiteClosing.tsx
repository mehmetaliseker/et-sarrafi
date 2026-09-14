import { closingHighlights } from "@/data/closing";
import { SiteFooter } from "./SiteFooter";
import styles from "./site-closing.module.css";

function HighlightIcon({ icon }: { icon: typeof closingHighlights[number]["icon"] }) {
  if (icon === "grid") return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>;
  if (icon === "info") return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5h.01" /></svg>;
  if (icon === "contact") return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5h16v11H8l-4 4V5Z" /><path d="M8 9h8M8 12h5" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 7h12v10H3zM15 10h3l3 3v4h-6z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></svg>;
}

export function SiteClosing() {
  return <div className={styles.closing}>
    <section className={styles.contact} aria-label="Ürün ve iletişim bilgileri">
      <div className={styles.contactLayout}>
        <div className={styles.highlights} aria-label="İletişim ve katalog bilgileri">
          {closingHighlights.map(item => <div className={styles.highlight} key={item.title}>
            <span className={styles.highlightIcon}><HighlightIcon icon={item.icon} /></span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>)}
        </div>
      </div>
    </section>
    <SiteFooter />
  </div>;
}
