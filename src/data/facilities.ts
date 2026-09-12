import type { MediaKey } from "@/data/media";

interface Facility { id: string; name: string; activity: string; description: string; media: MediaKey; }
export const facilities: readonly Facility[] = [
  { id: "bergama", name: "Bergama", activity: "Büyükbaş yetiştirme", description: "Büyükbaş hayvan üretim çiftliği olarak faaliyet gösterir.", media: "bergama" },
  { id: "foca", name: "Foça", activity: "Yetiştirme ve besi", description: "Bergama’daki çiftlikte doğan hayvanların beslenme süreçleri Yeni Foça’daki çiftlik alanında sürdürülür.", media: "foca" },
  { id: "yenikoy", name: "Yeniköy", activity: "Büyükbaş besi", description: "Büyükbaş besi çiftliği olarak faaliyet gösterir. Hayvanların beslenme ve bakım süreçleri burada yürütülür.", media: "yenikoy" },
];
