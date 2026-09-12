import { LinkButton } from "@/components/ui/LinkButton";
import { Media } from "@/components/ui/Media";
import { Arrow } from "@/components/ui/Arrow";
import { HeroScrollCue, HeroZoom } from "@/components/sections/HeroMotion";
import { homeContent } from "@/data/home";
import { media } from "@/data/media";
export function Hero() {
  const content = homeContent.hero;
  return <section className="home-hero" aria-labelledby="hero-title">
    <HeroZoom />
    <div className="hero-backdrop" aria-hidden="true"><Media asset={media.hero} eager sizes="100vw" className="hero-image" /></div>
    <div className="hero-content"><div className="hero-copy">
      <p className="eyebrow">{content.eyebrow}</p>
      <h1 id="hero-title">{content.title} {content.secondLine}</h1>
      <p className="hero-description">{content.description}</p>
      <div className="hero-actions"><LinkButton href="/urunler">Ürünleri İncele<Arrow /></LinkButton><LinkButton variant="secondary" href="/iletisim">İletişime Geç</LinkButton></div>
    </div><HeroScrollCue /></div>
  </section>;
}
