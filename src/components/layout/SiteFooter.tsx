import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Brand } from "@/components/ui/Brand";
import { navigationItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return <footer className="site-footer"><Container>
    <div className="footer-main">
      <div><Brand /><p className="mt-3 text-sm text-ink-muted">{siteConfig.corporateLine}</p></div>
      <nav aria-label="Alt bilgi navigasyonu"><ul>{navigationItems.map(item => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></nav>
      <address className="not-italic"><a href={siteConfig.contact.phone.href}>{siteConfig.contact.phone.display}</a><a href={siteConfig.contact.email.href}>{siteConfig.contact.email.display}</a><p>{siteConfig.contact.address.display}</p></address>
    </div>
    <div className="footer-bottom"><p>© {siteConfig.name}. Tüm hakları saklıdır.</p><p>{siteConfig.legalName}</p></div>
  </Container></footer>;
}
