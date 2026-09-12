export interface ContentSource { url: string; checkedOn: string; status: "verified-source" | "unavailable"; }
const officialPage = (path: string): ContentSource => ({ url: `https://www.etsarrafi.com${path}`, checkedOn: "2026-09-08", status: "verified-source" });

export const contentSources = {
  home: officialPage("/"),
  about: officialPage("/sayfa/hakkimizda"),
  products: officialPage("/kategori/urunler"),
  beef: officialPage("/kategori/buyuk-bas"),
  offal: officialPage("/kategori/sakatat"),
  facilities: officialPage("/sayfa/tesislerimiz"),
  processing: officialPage("/sayfa/kirmizi-et-isleme-tesisi"),
  services: officialPage("/sayfa/servis-hizmet-yerleri"),
  policy: officialPage("/sayfa/politikalarimiz"),
  contact: officialPage("/sayfa/iletisim"),
  bonfile: officialPage("/urun/dana-dos-1"),
  kusleme: officialPage("/urun/dana-dos-1-1-1-2"),
  processed: { ...officialPage("/kategori/islenmis-etler"), status: "unavailable" },
  prepared: { ...officialPage("/kategori/mamul-grubu"), status: "unavailable" },
} as const satisfies Record<string, ContentSource>;
