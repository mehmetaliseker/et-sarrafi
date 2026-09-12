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
export type MediaKey = "hero" | "homeImmersive" | "about" | "aboutDetail" | "beef" | "lamb" | "carcass" | "offal" | "processed" | "prepared" | "bergama" | "foca" | "yenikoy" | "processing" | "quality" | "horeca" | ProductImageKey;
const scene = (alt: string, ratio = "4 / 3"): MediaAsset => ({ src: null, mobileSrc: null, alt, ratio, mobileRatio: "4 / 3", position: "50% 50%", mobilePosition: "50% 50%", fit: "cover" });
const product = (alt: string): MediaAsset => ({ ...scene(alt), fit: "contain" });
const temporaryScene = (src: `/media/${string}`, ratio = "4 / 3"): MediaAsset => ({ ...scene("Et ürünü fotoğrafı (geçici görsel)", ratio), src });
const temporaryProduct = (src: `/media/${string}`): MediaAsset => ({ ...product("Et ürünü fotoğrafı (geçici görsel)"), src });
// Temporary pairings are kept here so approved subject photos can replace them centrally.
export const media: Record<MediaKey, MediaAsset> = {
  hero: { ...scene("Koyu taş zemininde dana bonfile", "16 / 9"), src: "/media/dana-bonfile.webp", mobileRatio: "3 / 4", position: "50% 48%", mobilePosition: "54% 42%" },
  homeImmersive: temporaryScene("/media/kuzu-kusleme.webp", "16 / 9"),
  about: temporaryScene("/media/dana-antrikot.webp", "3 / 2"),
  aboutDetail: temporaryScene("/media/kuzu-kusleme.webp", "3 / 4"),
  beef: { ...product("Dana antrikot"), src: "/media/dana-antrikot.webp" }, lamb: { ...product("Kuzu küşleme"), src: "/media/kuzu-kusleme.webp" },
  carcass: temporaryProduct("/media/dana-bonfile.webp"), offal: temporaryProduct("/media/kuzu-kusleme.webp"),
  processed: temporaryProduct("/media/dana-antrikot.webp"), prepared: temporaryProduct("/media/dana-bonfile.webp"),
  bergama: temporaryScene("/media/kuzu-kusleme.webp", "3 / 2"),
  foca: temporaryScene("/media/dana-antrikot.webp"),
  yenikoy: temporaryScene("/media/dana-bonfile.webp", "3 / 2"),
  processing: temporaryScene("/media/dana-antrikot.webp", "21 / 9"),
  quality: temporaryScene("/media/kuzu-kusleme.webp"), horeca: temporaryScene("/media/dana-bonfile.webp", "3 / 2"),
  bonfile: { ...product("Dana bonfile"), src: "/media/dana-bonfile.webp" }, antrikot: { ...product("Dana antrikot"), src: "/media/dana-antrikot.webp" }, nuar: temporaryProduct("/media/dana-bonfile.webp"), dos: temporaryProduct("/media/dana-antrikot.webp"),
  kusleme: { ...product("Kuzu küşleme"), src: "/media/kuzu-kusleme.webp" }, kafes: temporaryProduct("/media/kuzu-kusleme.webp"),
  danaCarcass: temporaryProduct("/media/dana-bonfile.webp"), sigirCarcass: temporaryProduct("/media/dana-antrikot.webp"), duveCarcass: temporaryProduct("/media/dana-bonfile.webp"), koyunCarcass: temporaryProduct("/media/kuzu-kusleme.webp"), kuzuCarcass: temporaryProduct("/media/kuzu-kusleme.webp"),
  danaCiger: temporaryProduct("/media/dana-antrikot.webp"), iskembe: temporaryProduct("/media/dana-bonfile.webp"), bobrek: temporaryProduct("/media/kuzu-kusleme.webp"), kuzuCiger: temporaryProduct("/media/kuzu-kusleme.webp"), dil: temporaryProduct("/media/dana-antrikot.webp"),
};
export const brandAssets: { logo: { src: string; alt: string } | null; favicon: string | null } = { logo: null, favicon: null };
