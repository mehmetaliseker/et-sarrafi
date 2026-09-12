import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/sections/Hero";
import { ContactCta } from "@/components/sections/ContactCta";
import { siteConfig } from "@/config/site";
import { homeContent as content } from "@/data/home";
import { media } from "@/data/media";
import { productGroups } from "@/data/products";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({ title: "Kurumsal", description: siteConfig.description, path: "/" });
export default function HomePage() {
  return <>
    <Hero />
    <div className="home-surface">
      <section aria-labelledby="home-story" className="section-space" id="home-story-section"><Container><Reveal className="story-grid"><div><h2 id="home-story" className="section-title">Bir mesleğin birikimi. Üretimin her aşamasında.</h2><p className="statement">{content.story.description}</p><Link className="text-link" href="/hakkimizda">Hikâyemizi keşfedin</Link></div></Reveal></Container></section>
      <section aria-labelledby="home-products" className="section-space home-products"><Container>
        <div className="section-top"><div><p className="eyebrow">Ürünlerimiz</p><h2 className="section-title" id="home-products">Her kesimiyle et.</h2></div><div><p className="body-copy">{content.products.description}</p><Link href="/urunler" className="text-link">Ürün kataloğunu inceleyin<Arrow /></Link></div></div>
        <Reveal className="product-feature-grid">{productGroups.slice(0, 2).map((group, index) => <Link href={`/urunler?kategori=${group.id}`} className={`product-feature product-feature-${index}`} key={group.id}><Media asset={media[group.media]} sizes="(min-width: 768px) 50vw, 100vw" /><div className="feature-caption"><div><span className="eyebrow">Ürün grubu</span><h3>{group.title}</h3></div></div></Link>)}</Reveal>
        <div className="family-links">{productGroups.slice(2).map(group => <Link key={group.id} href={`/urunler?kategori=${group.id}`}>{group.title}</Link>)}</div>
      </Container></section>
      <section aria-labelledby="home-facilities" className="home-production">
        <Media asset={media.homeProcessing} className="production-panorama" sizes="100vw" />
        <Container><Reveal className="production-copy"><div><p className="eyebrow">Tesislerimiz</p><h2 className="section-title" id="home-facilities">Çiftlikten başlayan bir bütün.</h2></div><div><p className="body-copy">{siteConfig.company.farms} {siteConfig.company.operations}</p><Link className="text-link" href="/tesislerimiz">Üretim alanlarımızı tanıyın</Link></div></Reveal></Container>
      </section>
      <section className="section-space" aria-labelledby="home-services"><Container className="services-summary"><div><p className="eyebrow">Hizmet alanlarımız</p><h2 className="section-title" id="home-services">Profesyonel mutfaklara ve kurumsal iş ortaklarına.</h2><p className="body-copy mt-6">{siteConfig.company.supply}</p><Link href="/hizmet-alanlarimiz" className="text-link">Hizmet alanlarımız</Link></div><div className="service-links">{services.map(service => <Link href={`/hizmet-alanlarimiz#${service.id}`} key={service.id}>{service.title}</Link>)}<Link className="quality-link" href="/kalite">Kalite yaklaşımımızı inceleyin</Link></div></Container></section>
      <ContactCta />
    </div>
  </>;
}
