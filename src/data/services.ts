import type { MediaKey } from "@/data/media";
export interface Service { id: string; title: string; subtitle: string; description: string; link: string; action: string; media?: MediaKey; }
export const services: readonly Service[] = [
  { id: "horeca", title: "Horeca", subtitle: "Profesyonel mutfaklar", description: "Horeca, kurumsal iş ortaklarımıza yönelik hizmet alanlarımızdan biridir. Et ve et ürünü ihtiyaçlarınız için ürün gruplarımızı inceleyebilirsiniz.", link: "/urunler", action: "Ürünleri inceleyin", media: "horeca" },
  { id: "karkas", title: "Karkas tedariki", subtitle: "Büyükbaş ve küçükbaş", description: "Dana, sığır ve düve ile koyun ve kuzu karkas ürünleri, karkas tedariki kapsamında yer alır.", link: "/urunler?kategori=karkas-et", action: "Karkas ürünlerini inceleyin" },
  { id: "sicak-satis", title: "Sıcak satış", subtitle: "Doğrudan iletişim", description: "Sıcak satış, hizmet alanlarımız arasında yer alır. Güncel ürün seçenekleri ve hizmet ayrıntıları için bizimle iletişime geçebilirsiniz.", link: "/iletisim", action: "İletişime geçin" },
];
