import { siteConfig } from "@/config/site";

export const homeContent = {
  hero: {
    eyebrow: "Kırmızı et üretimi ve tedariki",
    title: "Kaynağından",
    secondLine: "başlayan özen.",
    description: "Çiftlikten et işlemeye uzanan birikimimizle, büyükbaş ve küçükbaş et ürünlerini bir araya getiriyoruz.",
  },
  story: { eyebrow: "Kurumsal", title: "Bir mesleğin birikimi.", description: siteConfig.company.introduction },
  products: { eyebrow: "Ürünlerimiz", title: "Ürün ailesinden\nkesim detayına.", description: "Büyükbaş ve küçükbaş kesimlerinden karkas ürünlere uzanan ürün grupları." },
  facilities: { eyebrow: "Tesislerimiz", title: "Yetiştirmeden\nişleme faaliyetlerine.", description: siteConfig.company.farms },
  quality: { eyebrow: "Kalite yaklaşımımız", title: "Sürecin her aşamasına\nbütüncül bakış.", description: "Yerli besi, üretimde hijyen ve soğuk tedarik zinciri, çalışma yaklaşımımızın temel başlıklarıdır." },
} as const;
