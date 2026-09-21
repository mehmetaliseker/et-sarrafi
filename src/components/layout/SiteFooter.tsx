import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { footerPolicyItems, navigationItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";

function MailIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
}

export function SiteFooter() {
  return <footer className="site-footer"><Container>
    <div className="footer-main">
      <div>
        <Link aria-label={`${siteConfig.name} ana sayfa`} className="footer-logo" href="/"><Image src="/media/et-sarrafi-logo.webp" alt={siteConfig.name} width={360} height={261} sizes="150px" /></Link>
        <p className="mt-3 text-sm text-ink-muted">{siteConfig.corporateLine}</p>
        <div className="footer-brand-links">
          <SocialLinks className="footer-social" variant="icons" />
          <a className="footer-mail" href={siteConfig.contact.email.href} aria-label={`E-posta: ${siteConfig.contact.email.display}`} title={siteConfig.contact.email.display}>
            <MailIcon />
          </a>
        </div>
      </div>
      <nav aria-label="Alt bilgi navigasyonu"><ul>{[...navigationItems, ...footerPolicyItems].map(item => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></nav>
      <address className="not-italic"><a href={siteConfig.contact.phone.href}>{siteConfig.contact.phone.display}</a><a href={siteConfig.contact.email.href}>{siteConfig.contact.email.display}</a><p>{siteConfig.contact.address.display}</p></address>
    </div>
    <div className="footer-bottom"><p>© {siteConfig.name}. Tüm hakları saklıdır.</p><p>{siteConfig.legalName}</p></div>
  </Container></footer>;
}
