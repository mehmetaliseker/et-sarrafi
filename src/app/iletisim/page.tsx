import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { PageIntro } from "@/components/sections/PageIntro";
import { pages, editorial } from "@/data/pages";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

const content = pages["/iletisim"];
const labels = editorial.contact;
export const metadata = createPageMetadata({ title: content.metadataTitle, description: content.description, path: "/iletisim" });
export default function ContactPage() {
  return <><PageIntro {...content} className="contact-intro" /><Container>
    <div className="contact-layout"><section className="contact-channels" aria-label="İletişim kanalları"><div><h2>{labels.phone}</h2><a href={siteConfig.contact.phone.href}>{siteConfig.contact.phone.display}</a></div><div><h2>{labels.email}</h2><a href={siteConfig.contact.email.href}><span>{siteConfig.contact.email.display}</span></a></div></section><section className="address-panel" aria-labelledby="address-title"><p className="eyebrow">{siteConfig.contact.address.city} / {siteConfig.contact.address.district}</p><h2 id="address-title">{labels.address}</h2><address>{siteConfig.contact.address.display}</address><LinkButton href={siteConfig.contact.address.mapUrl}>{labels.directions}</LinkButton><p className="map-note">{labels.addressNote}</p></section></div>
    <section className="company-details" aria-labelledby="company-title"><h2 id="company-title">{labels.company}</h2><dl><div><dt>{labels.legalName}</dt><dd>{siteConfig.legalName}</dd></div><div><dt>{labels.brand}</dt><dd>{siteConfig.name}</dd></div></dl></section>
  </Container></>;
}
