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
export const sitePaths: readonly SitePath[] = ["/", ...navigationItems.map(item => item.href), ...productDetails.map(item => `/urunler/${item.slug}` as const)];
