export type SitePath =
  | "/"
  | "/hakkimizda"
  | "/hizmet-alanlarimiz"
  | "/tesislerimiz"
  | "/urunler"
  | "/kalite"
  | "/politikalarimiz"
  | "/iletisim"
  | `/urunler/${string}`;

export interface NavigationItem {
  label: string;
  href: SitePath;
}

export interface TrustPillar {
  id: string;
  title: string;
  description: string;
}
