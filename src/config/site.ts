const siteUrl = new URL("https://www.etsarrafi.com");
const phoneDisplay = "+90 539 517 96 86";
const emailAddress = "siparis@etsarrafi.com";
const streetAddress = "7401 Sokak No:78/A";
const district = "Karşıyaka";
const city = "İzmir";
const addressDisplay = `${streetAddress}, ${district}/${city}`;
const encodedAddress = encodeURIComponent(addressDisplay);

export type SocialPlatform = "instagram" | "facebook" | "x";
export interface SocialAccount {
  platform: SocialPlatform;
  label: string;
  href: string;
}

const indexable = process.env.NODE_ENV === "production";

export const siteConfig = {
  name: "Et Sarrafı",
  corporateLine: "Bir Celepler Kuruluşudur",
  company: {
    introduction: "Et Sarrafı, Celepler ailesinin hayvancılık ve kasaplık birikiminden doğan bir kırmızı et markasıdır.",
    story: "Ailenin Foça’daki hayvancılık ve kasaplık faaliyetleri, bugün Et Sarrafı markasının kurumsal anlatısının temelini oluşturur.",
    operations: "Karşıyaka–Örnekköy’deki et entegre tesisinde kırmızı et işleme, parçalama, depolama ve sevkiyat faaliyetleri yürütülür.",
    farms: "Bergama, Foça ve Yeniköy’deki çiftliklerde yetiştirme ve besi faaliyetleri yürütülür.",
    supply: "Et ve et ürünleri, kurumsal iş ortaklarına tedarik edilir.",
  },
  legalName: "Celepler Pamuk Sanayi ve Ticaret Ltd. Şti.",
  description:
    "Et Sarrafı’nın büyükbaş ve küçükbaş et ürünlerini, Bergama, Foça ve Yeniköy çiftliklerini ve çalışma yaklaşımını tanıyın. İletişim bilgilerine ulaşın.",
  url: siteUrl.origin,
  indexable,
  locale: "tr_TR",
  language: "tr",
  contact: {
    phone: {
      display: phoneDisplay,
      href: `tel:${phoneDisplay.replaceAll(" ", "")}`,
    },
    email: {
      display: emailAddress,
      href: `mailto:${emailAddress}`,
    },
    address: {
      display: addressDisplay,
      streetAddress,
      district,
      city,
      countryCode: "TR",
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        addressDisplay,
      )}`,
      directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`,
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1313.1916020687754!2d27.113363617732023!3d38.48040527023036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd72cc71050d3%3A0xbf6315110603d7a1!2sEt%20Sarraf%C4%B1!5e0!3m2!1str!2str!4v1789375176351!5m2!1str!2str",
    },
  },
  /** Verified brand accounts only. X/Twitter handle was not found. */
  social: [
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/etsarrafi/",
    },
    {
      platform: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/etsarrafi",
    },
  ] as const satisfies ReadonlyArray<SocialAccount>,
} as const;
