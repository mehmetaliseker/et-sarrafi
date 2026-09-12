import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { navigationItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return <footer className="site-footer"><Container>
    <div className="footer-main">
      <div><Link aria-label={`${siteConfig.name} ana sayfa`} className="footer-logo" href="/"><Image src="/media/et-sarrafi-logo.webp" alt={siteConfig.name} width={180} height={132} /></Link><p className="mt-3 text-sm text-ink-muted">{siteConfig.corporateLine}</p></div>
      <nav aria-label="Alt bilgi navigasyonu"><ul>{navigationItems.map(item => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></nav>
      <address className="not-italic"><a href={siteConfig.contact.phone.href}>{siteConfig.contact.phone.display}</a><a href={siteConfig.contact.email.href}>{siteConfig.contact.email.display}</a><p>{siteConfig.contact.address.display}</p></address>
    </div>
    <div className="footer-bottom"><p>© {siteConfig.name}. Tüm hakları saklıdır.</p><p>{siteConfig.legalName}</p></div>
  </Container></footer>;
}
