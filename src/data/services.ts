export interface Service {
  id: "horeca" | "karkas" | "sicak-satis";
  number: "01" | "02" | "03";
  title: string;
  introLine: string;
  label: string;
  description: string;
  action: string;
  href: "/urunler" | "/iletisim";
  image: {
    src: `/images/services/${string}.png`;
    alt: string;
    position: string;
  };
}

export const services = [
  {
    id: "horeca",
    number: "01",
    title: "Horeca",
    introLine: "Horeca faaliyetlerimizi tanıyın; ürün ihtiyaçlarınız için doğrudan iletişim kurun.",
    label: "KURUMSAL TEDARİK",
    description: "Otel, restoran ve catering işletmelerinin et ve et ürünü ihtiyaçlarına yönelik kurumsal tedarik hizmeti sunuyoruz. Ürün çeşidi, miktar ve teslimat ihtiyaçlarınızı ekibimizle paylaşabilirsiniz.",
    action: "Ürünlerimizi İnceleyin",
    href: "/urunler",
    image: {
      src: "/images/services/horeca-product-selection.png",
      alt: "Tezgâhta sergilenen çeşitli çiğ et kesimleri",
      position: "50% 55%",
    },
  },
  {
    id: "karkas",
    number: "02",
    title: "Karkas Et Tedariği",
    introLine: "Karkas et tedariki faaliyetlerimizi tanıyın; ürün ihtiyaçlarınız için doğrudan iletişim kurun.",
    label: "TOPTAN ALIM",
    description: "Büyükbaş ve küçükbaş karkas ürün gruplarımızla kurumsal alım ihtiyaçlarına yanıt veriyoruz. Ürün seçenekleri ve tedarik koşulları hakkında bilgi almak için bizimle iletişime geçebilirsiniz.",
    action: "Karkas Ürünler İçin Bilgi Alın",
    href: "/iletisim",
    image: {
      src: "/images/services/carcass-cuts.png",
      alt: "Kemikli çiğ et kesimlerinin yakın görünümü",
      position: "50% 50%",
    },
  },
  {
    id: "sicak-satis",
    number: "03",
    title: "Sıcak Satış",
    introLine: "Sıcak satış faaliyetlerimizi tanıyın; ürün ihtiyaçlarınız için doğrudan iletişim kurun.",
    label: "SATIŞ KANALI",
    description: "Sıcak satış kanalımızın hizmet kapsamı, ürün seçenekleri ve bölgenize ilişkin bilgi almak için satış ekibimizle iletişime geçebilirsiniz.",
    action: "Satış Ekibimizle Görüşün",
    href: "/iletisim",
    image: {
      src: "/images/services/direct-sales-cuts.png",
      alt: "Çiğ antrikot ve bonfile kesimlerinin yakın görünümü",
      position: "50% 52%",
    },
  },
] as const satisfies readonly Service[];
