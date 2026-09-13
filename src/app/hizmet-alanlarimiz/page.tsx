import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { PageIntro } from "@/components/sections/PageIntro";
import { services } from "@/data/services";
import { media } from "@/data/media";
import { pages } from "@/data/pages";
import { createPageMetadata } from "@/lib/metadata";
const content = pages["/hizmet-alanlarimiz"];
export const metadata = createPageMetadata({ title: content.metadataTitle, description: content.description, path: "/hizmet-alanlarimiz" });
export default function ServicesPage() {
  return <><PageIntro {...content} /><Container><div className="services-editorial">{services.map(service => <section id={service.id} className="service-entry" key={service.id} aria-labelledby={`${service.id}-title`}>
    <div className="service-entry-copy"><p className="eyebrow">{service.subtitle}</p><h2 id={`${service.id}-title`}>{service.title}</h2><p className="body-copy">{service.description}</p><Link href={service.link} className="text-link">{service.action}</Link></div>
    {service.media && <Media asset={media[service.media]} sizes="(min-width: 768px) 55vw, 100vw" />}
  </section>)}</div></Container></>;
}
