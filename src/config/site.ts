const defaultSiteUrl = "https://www.etsarrafi.com";
const phoneDisplay = "+90 539 517 96 86";
const emailAddress = "siparis@etsarrafi.com";
const streetAddress = "7401 Sokak No:78/A";
const district = "Karşıyaka";
const city = "İzmir";
const addressDisplay = `${streetAddress}, ${district}/${city}`;
const encodedAddress = encodeURIComponent(addressDisplay);

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = new URL(configuredSiteUrl || defaultSiteUrl);
if (!['https:', 'http:'].includes(siteUrl.protocol) || siteUrl.username || siteUrl.password || siteUrl.pathname !== '/' || siteUrl.search || siteUrl.hash) {
  throw new Error('NEXT_PUBLIC_SITE_URL yalnızca geçerli bir HTTP(S) alan adı içermelidir.');
}
// Release requires approved identity, photographs, content and domain.
const releaseApproved = false;
const indexable = releaseApproved && process.env.SITE_INDEXABLE === "true" && process.env.NODE_ENV === "production" && Boolean(configuredSiteUrl);

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
      embedUrl: `https://maps.google.com/maps?hl=tr&q=${encodedAddress}&z=16&output=embed`,
    },
  },
} as const;
