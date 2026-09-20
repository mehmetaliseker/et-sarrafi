import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
