export interface MediaAsset {
  src: `/media/${string}` | null;
  mobileSrc?: `/media/${string}` | null;
  alt: string;
  ratio: string;
  mobileRatio?: string;
  position: string;
  mobilePosition: string;
  fit: "cover" | "contain";
}
export const productImageKeys = ["bonfile", "antrikot", "nuar", "dos", "kusleme", "kafes", "danaCarcass", "sigirCarcass", "duveCarcass", "koyunCarcass", "kuzuCarcass", "danaCiger", "iskembe", "bobrek", "kuzuCiger", "dil"] as const;
export type ProductImageKey = typeof productImageKeys[number];
export type MediaKey = "hero" | "about" | "aboutDetail" | "homeProcessing" | "beef" | "lamb" | "carcass" | "offal" | "processed" | "prepared" | "bergama" | "foca" | "yenikoy" | "processing" | "quality" | "horeca" | ProductImageKey;
const scene = (alt: string, ratio = "4 / 3"): MediaAsset => ({ src: null, mobileSrc: null, alt, ratio, mobileRatio: "4 / 3", position: "50% 50%", mobilePosition: "50% 50%", fit: "cover" });
const product = (alt: string): MediaAsset => ({ ...scene(alt), fit: "contain" });
// Existing public product photography. Missing subjects retain quiet reserved surfaces.
export const media: Record<MediaKey, MediaAsset> = {
  hero: { ...scene("Koyu taş zemininde dana bonfile", "16 / 9"), src: "/media/dana-bonfile.webp", mobileRatio: "3 / 4", position: "50% 48%", mobilePosition: "54% 42%" },
  about: scene("Et Sarrafı işletmesi ve ekibi", "3 / 2"),
  aboutDetail: scene("Et hazırlığından bir çalışma ayrıntısı", "3 / 4"),
  homeProcessing: scene("Et Sarrafı kırmızı et işleme alanı", "21 / 9"),
  beef: { ...product("Dana antrikot"), src: "/media/dana-antrikot.webp" }, lamb: { ...product("Kuzu küşleme"), src: "/media/kuzu-kusleme.webp" },
  carcass: product("Karkas et ürünleri"), offal: product("Sakatat çeşitleri"),
  processed: product("İşlenmiş etler"), prepared: product("Mamul ürünler"),
  bergama: scene("Bergama büyükbaş yetiştirme çiftliği", "3 / 2"),
  foca: scene("Foça yetiştirme ve besi çiftliği"),
  yenikoy: scene("Yeniköy büyükbaş besi çiftliği", "3 / 2"),
  processing: scene("Kırmızı et işleme tesisi", "21 / 9"),
  quality: scene("Üretim ve kontrol alanı"), horeca: scene("Profesyonel mutfakta et hazırlığı", "3 / 2"),
  bonfile: { ...product("Dana bonfile"), src: "/media/dana-bonfile.webp" }, antrikot: { ...product("Dana antrikot"), src: "/media/dana-antrikot.webp" }, nuar: product("Dana nuar"), dos: product("Dana döş"),
  kusleme: { ...product("Kuzu küşleme"), src: "/media/kuzu-kusleme.webp" }, kafes: product("Kuzu kafes"),
  danaCarcass: product("Dana karkas"), sigirCarcass: product("Sığır karkas"), duveCarcass: product("Düve karkas"), koyunCarcass: product("Koyun karkas"), kuzuCarcass: product("Kuzu karkas"),
  danaCiger: product("Dana ciğer"), iskembe: product("Dana işkembe"), bobrek: product("Kuzu böbrek"), kuzuCiger: product("Kuzu ciğer"), dil: product("Dil"),
};
export const brandAssets: { logo: { src: string; alt: string } | null; favicon: string | null } = { logo: null, favicon: null };
