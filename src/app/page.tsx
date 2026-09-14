import Image from "next/image";
import Link from "next/link";
import { HeroScrollCue, StitchHeroMotion } from "@/components/sections/HeroMotion";
import { RotatingHeroLabel } from "@/components/sections/RotatingHeroLabel";
import { StitchPhotoZoom } from "@/components/sections/StitchPhotoZoom";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { homeContent } from "@/data/home";
import { createPageMetadata } from "@/lib/metadata";
import "./stitch-home.css";

export const metadata = createPageMetadata({ title: "Kurumsal", description: siteConfig.description, path: "/" });

const photo = { hero: "/media/dana-bonfile.webp", facility: "/media/cc996b29b9e27b0778943f7f2cc17267edb88964.jpg", products: "/images/stitch/products.jpg", quality: "/media/high_quality_corporate_photography_of_a_modern_pristine_hygienic_meat.png" } as const;
const featureItems = [
  { title: "Büyükbaş ve küçükbaş ürünler", description: "Karkas, parça et ve sakatat çeşitlerimizi inceleyin." },
  { title: "İşleme ve depolama", description: "Et işleme tesisimizde yürüttüğümüz faaliyetleri tanıyın." },
  { title: "Soğuk zincirle sevkiyat", description: "Ürünlerimizi frigorifik araçlarla sevk ediyoruz." },
] as const;
const qualityItems = [
  { title: "Yerli besi", description: "Hayvanlarımızın beslenmesinde kendi kontrolümüzde üretilen yerli ham maddeleri kullanıyoruz." },
  { title: "Hijyen yaklaşımı", description: "Et ürünlerimizi hijyen koşullarını gözeterek hazırlıyoruz." },
] as const;
const categories = [
  { title: "Büyükbaş ürünleri", description: "Dana bonfile, antrikot, nuar ve döş gibi büyükbaş et kesimleri.", href: "/urunler#buyukbas", image: photo.products },
  { title: "Küçükbaş ürünleri", description: "Kuzu küşleme ve kuzu kafes gibi küçükbaş et kesimleri.", href: "/urunler#kucukbas", image: photo.products },
  { title: "Karkas et ürünleri", description: "Dana, sığır, düve, koyun ve kuzu karkas ürünleri.", href: "/urunler#karkas-et", image: photo.facility },
  { title: "Sakatat", description: "Büyükbaş ve küçükbaş sakatat çeşitleri.", href: "/urunler#sakatat", image: photo.facility },
] as const;

export default function HomePage() {
  return <div className="stitch-home">
    <section className="stitch-hero home-hero" aria-labelledby="hero-title">
      <StitchHeroMotion />
      <div className="stitch-hero-photo" aria-hidden="true"><Image src={photo.hero} alt="" fill sizes="100vw" loading="eager" fetchPriority="high" /></div>
      <div className="stitch-hero-shade" aria-hidden="true" />
      <div className="stitch-container stitch-hero-inner"><div className="stitch-hero-copy">
        <RotatingHeroLabel />
        <h1 id="hero-title">Et Ürünleri ve Kurumsal Tedarik</h1><p>{homeContent.hero.description}</p>
        <div className="stitch-hero-actions"><Link className="stitch-button stitch-button-primary" href="/urunler">Ürünlerimizi İnceleyin <span className="stitch-button-arrow" aria-hidden="true">→</span></Link><Link className="stitch-button stitch-button-glass" href="/tesislerimiz">Tesis ve Altyapı</Link></div>
      </div></div><HeroScrollCue />
    </section>

    <section className="stitch-section stitch-products" id="urunler" aria-labelledby="stitch-products-title"><div className="stitch-container stitch-split">
      <div className="stitch-copy"><Reveal><p className="stitch-eyebrow">Ürün Yaklaşımımız</p><h2 id="stitch-products-title">{homeContent.products.title}</h2></Reveal>
        <Reveal><p className="stitch-description">{homeContent.products.description}</p></Reveal>
        <div className="stitch-feature-list">{featureItems.map(item => <Reveal key={item.title}><div className="stitch-feature"><span className="stitch-feature-mark" aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.description}</p></div></div></Reveal>)}</div>
        <Reveal><Link className="stitch-text-link" href="/urunler">Tüm Ürün Gruplarını Gör <span aria-hidden="true">→</span></Link></Reveal>
      </div><Reveal className="stitch-image-frame"><Image src={photo.products} alt="Et kesimleri, temsili görsel" fill sizes="(min-width: 1024px) 48vw, 100vw" /></Reveal>
    </div></section>

    <section className="stitch-section stitch-quality" aria-labelledby="stitch-quality-title"><div className="stitch-container stitch-split stitch-split-reverse">
      <Reveal className="stitch-image-frame"><Image src={photo.quality} alt="Et işleme alanı, temsili görsel" fill sizes="(min-width: 1024px) 48vw, 100vw" /></Reveal>
      <div className="stitch-copy"><Reveal><p className="stitch-eyebrow">Üretim &amp; Kalite</p><h2 id="stitch-quality-title">{homeContent.processing.title}</h2></Reveal><Reveal><p className="stitch-description">{homeContent.processing.description}</p></Reveal><div className="stitch-quality-cards">{qualityItems.map(item => <Reveal className="stitch-quality-card" key={item.title}><span className="stitch-quality-mark" aria-hidden="true" /><h3>{item.title}</h3><p>{item.description}</p></Reveal>)}</div></div>
    </div></section>

    <section className="stitch-wide-photo" id="tesis" aria-labelledby="stitch-facility-title"><StitchPhotoZoom src={photo.facility} /><div className="stitch-container stitch-wide-inner"><div className="stitch-wide-card"><Reveal><p className="stitch-eyebrow">Üretim Altyapımız</p><h2 id="stitch-facility-title">Tesislerimizi ve Çalışma Yaklaşımımızı Keşfedin</h2></Reveal><Reveal className="stitch-wide-description"><p>{siteConfig.company.operations}</p></Reveal><Reveal><Link className="stitch-text-link" href="/tesislerimiz">Tesislerimizi İnceleyin <span aria-hidden="true">→</span></Link></Reveal></div></div></section>

    <section className="stitch-section stitch-categories" id="kategoriler" aria-labelledby="stitch-categories-title"><div className="stitch-container">
      <div className="stitch-category-heading"><Reveal><p className="stitch-eyebrow">Kurumsal Portföy</p><h2 id="stitch-categories-title">Kurumsal Ürün Kategorilerimiz</h2></Reveal><Reveal><p>Ürün gruplarımızı keşfedin; işletmenizin ihtiyacına uygun seçenekler için bizimle iletişime geçin.</p></Reveal></div>
      <div className="stitch-category-grid">{categories.map(item => <Reveal className="stitch-category-reveal" key={item.title}><article className="stitch-category-card"><Link href={item.href} aria-label={`${item.title} kategorisini inceleyin`}><div className="stitch-category-image"><Image src={item.image} alt="" fill sizes="(min-width: 1024px) 23vw, (min-width: 600px) 46vw, 100vw" /></div><div className="stitch-category-content"><h3>{item.title}</h3><p>{item.description}</p><span className="stitch-category-link">Ürünleri inceleyin <span aria-hidden="true">→</span></span></div></Link></article></Reveal>)}</div><p className="stitch-image-note">Bu bölümdeki görseller temsilidir.</p>
    </div></section>

  </div>;
}
