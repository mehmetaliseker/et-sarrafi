import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { PageIntro } from "@/components/sections/PageIntro";
import { pages, editorial } from "@/data/pages";
import { trustPillars } from "@/data/trust";
import { media } from "@/data/media";
import { createPageMetadata } from "@/lib/metadata";

const content = pages["/kalite"];
export const metadata = createPageMetadata({ title: content.metadataTitle, description: content.description, path: "/kalite" });
export default function QualityPage() {
  return <><PageIntro {...content} /><Container>
    <section className="quality-principles" aria-label="Üretim yaklaşımının temel başlıkları">{trustPillars.map(pillar => <div key={pillar.id}><h2>{pillar.title}</h2><p>{pillar.description}</p></div>)}</section>
    <section className="section-space policy-layout" aria-labelledby="policy-title"><div><p className="eyebrow">Kalite politikamız</p><h2 id="policy-title" className="section-title">{editorial.policy.title}</h2><p className="body-copy mt-6">{editorial.policy.introduction}</p><Media asset={media.quality} className="policy-image" sizes="(min-width: 768px) 45vw, 100vw" /></div><div className="policy-list">{editorial.policy.items.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></section>
  </Container></>;
}
