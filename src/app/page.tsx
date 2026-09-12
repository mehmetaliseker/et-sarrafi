import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { ContactCta } from "@/components/sections/ContactCta";
import { FocusZoomMedia } from "@/components/sections/FocusZoomMedia";
import { Hero } from "@/components/sections/Hero";
import { siteConfig } from "@/config/site";
import { homeContent as content } from "@/data/home";
import { media } from "@/data/media";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "Kurumsal", description: siteConfig.description, path: "/" });

export default function HomePage() {
  return <>
    <Hero />
    <div className="home-surface">
      <section aria-labelledby="home-products" className="home-split-section" id="home-products-section">
        <Container className="home-split-grid">
          <Reveal className="home-split-copy"><p className="eyebrow">Ürünlerimiz</p><h2 className="section-title" id="home-products">{content.products.title}</h2><p>{content.products.description}</p><LinkButton href="/urunler">Ürünleri İncele<Arrow /></LinkButton></Reveal>
          <Media asset={media.beef} className="home-split-image" sizes="(min-width: 768px) 52vw, 100vw" />
        </Container>
      </section>
      <section aria-labelledby="home-processing" className="home-split-section">
        <Container className="home-split-grid home-split-grid-reverse">
          <Media asset={media.processing} className="home-split-image" sizes="(min-width: 768px) 52vw, 100vw" />
          <Reveal className="home-split-copy"><p className="eyebrow">İşleme ve sevkiyat</p><h2 className="section-title" id="home-processing">{content.processing.title}</h2><p>{content.processing.description}</p></Reveal>
        </Container>
      </section>
      <section aria-labelledby="home-production" className="home-immersive-section">
        <FocusZoomMedia />
        <Container className="home-immersive-content"><Reveal className="home-immersive-copy"><p className="eyebrow">Üretim yaklaşımımız</p><h2 className="section-title" id="home-production">{content.production.title}</h2><p>{content.production.description}</p></Reveal></Container>
      </section>
      <ContactCta animated className="home-closing" title={content.contact.title} description={content.contact.description} />
    </div>
  </>;
}
