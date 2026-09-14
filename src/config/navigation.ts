import type { NavigationItem, SitePath } from "@/types/content";
import { productDetails } from "@/data/products";
export const navigationItems = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Tesislerimiz", href: "/tesislerimiz" },
  { label: "Hizmet Alanlarımız", href: "/hizmet-alanlarimiz" },
  { label: "Kalite", href: "/kalite" },
  { label: "İletişim", href: "/iletisim" },
] as const satisfies readonly NavigationItem[];
export const footerPolicyItems = [
  { label: "Politikalarımız", href: "/politikalarimiz" },
  { label: "Gizlilik ve Güvenlik", href: "/politikalarimiz#gizlilik-ve-guvenlik" },
] as const;
export const sitePaths: readonly SitePath[] = ["/", ...navigationItems.map(item => item.href), "/politikalarimiz", ...productDetails.map(item => `/urunler/${item.slug}` as const)];
