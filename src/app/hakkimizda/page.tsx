import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { PageIntro } from "@/components/sections/PageIntro";
import { ContactCta } from "@/components/sections/ContactCta";
import { pages, editorial } from "@/data/pages";
import { media } from "@/data/media";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

const content = pages["/hakkimizda"];
export const metadata = createPageMetadata({ title: content.metadataTitle, description: content.description, path: "/hakkimizda" });
export default function AboutPage() {
  return <><PageIntro {...content} /><Container><div className="about-visual"><Media asset={media.about} className="about-image" sizes="(min-width: 1024px) 65vw, 100vw" eager /><div className="about-caption"><Media asset={media.aboutDetail} sizes="(min-width: 768px) 22vw, 40vw" /><p>{siteConfig.corporateLine}</p></div></div>
    <section className="about-story section-space" aria-labelledby="about-story-title"><h2 className="section-title" id="about-story-title">{editorial.about.title}</h2><div className="editorial-copy">{editorial.about.paragraphs.map(text => <p key={text}>{text}</p>)}</div></section>
    <section className="about-operations section-space" aria-labelledby="operations-title"><p className="eyebrow">Kurumsal</p><h2 id="operations-title" className="section-title">{editorial.about.operationsTitle}</h2><div className="operation-list">{editorial.about.operations.map(operation => <div key={operation.title}><h3>{operation.title}</h3><p>{operation.text}</p><Link className="text-link" href={operation.href} aria-label={`${operation.title} hakkında bilgi`}>İnceleyin</Link></div>)}</div></section>
  </Container><ContactCta /></>;
}
