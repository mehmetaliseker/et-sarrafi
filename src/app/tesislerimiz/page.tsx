import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { PageIntro } from "@/components/sections/PageIntro";
import { ContactCta } from "@/components/sections/ContactCta";
import { pages, editorial } from "@/data/pages";
import { facilities } from "@/data/facilities";
import { media } from "@/data/media";
import { createPageMetadata } from "@/lib/metadata";

const content = pages["/tesislerimiz"];
export const metadata = createPageMetadata({ title: content.metadataTitle, description: content.description, path: "/tesislerimiz" });
export default function FacilitiesPage() {
  return <><PageIntro {...content} /><Container>
    <nav className="facility-jumps" aria-label="Tesisler"><ul>{facilities.map(f => <li key={f.id}><a href={`#${f.id}`}>{f.name}</a></li>)}<li><a href="#isleme">Et işleme tesisi</a></li></ul></nav>
    <div className="facilities-editorial">{facilities.map(facility => <section className="facility-entry" id={facility.id} key={facility.id} aria-labelledby={`${facility.id}-title`}><Media asset={media[facility.media]} sizes="(min-width: 768px) 55vw, 100vw" /><div className="facility-copy"><p className="eyebrow">{facility.activity}</p><h2 id={`${facility.id}-title`}>{facility.name}</h2><p>{facility.description}</p></div></section>)}</div>
  </Container><section className="section-space surface" id="isleme" aria-labelledby="processing-title"><Container><div className="section-top"><h2 className="section-title" id="processing-title">{editorial.processing.title}</h2><p className="body-copy max-w-lg">{editorial.processing.description}</p></div><Media asset={media.processing} className="processing-image" sizes="100vw" /><ul className="processing-steps">{editorial.processing.steps.map(step => <li key={step}>{step}</li>)}</ul></Container></section><ContactCta /></>;
}
