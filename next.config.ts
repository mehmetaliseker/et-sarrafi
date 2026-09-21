import type { NextConfig } from "next";

const legacyImages = [
  ["/images/arac.webp", "/images/corporate/arac.webp"],
  ["/images/isletme.webp", "/images/corporate/isletme.webp"],
  ["/images/ciftlik.webp", "/images/corporate/ciftlik.webp"],
] as const;

const nextConfig: NextConfig = {
  async rewrites() {
    return { beforeFiles: legacyImages.map(([source, destination]) => ({ source, destination })) };
  },
  redirects() {
    return [
      ["/sayfa/hakkimizda", "/hakkimizda"],
      ["/sayfa/iletisim", "/iletisim"],
      ["/sayfa/tesislerimiz", "/tesislerimiz"],
      ["/sayfa/kirmizi-et-isleme-tesisi", "/tesislerimiz#ornekkoy"],
      ["/sayfa/servis-hizmet-yerleri", "/hizmet-alanlarimiz"],
      ["/sayfa/politikalarimiz", "/politikalarimiz"],
      ["/sayfa/gizlilik-ve-guvenlik", "/politikalarimiz#gizlilik-ve-guvenlik"],
      ["/kategori/urunler", "/urunler"],
      ["/kategori/buyuk-bas", "/urunler?kategori=buyukbas"],
      ["/kategori/sakatat", "/urunler?kategori=sakatat"],
      ["/urun/dana-dos-1", "/urunler/dana-bonfile"],
      ["/urun/dana-dos-1-1-1-2", "/urunler/kuzu-kusleme"],
    ].map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
