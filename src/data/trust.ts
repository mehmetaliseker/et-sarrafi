import type { TrustPillar } from "@/types/content";

export const trustPillars = [
  {
    id: "yerli-besi",
    title: "Yerli besi",
    description:
      "Hayvanlarımızın beslenmesinde kendi kontrolümüzde üretilen yerli ham maddeleri kullanıyoruz.",
  },
  {
    id: "hijyenik-uretim",
    title: "Hijyenik üretim",
    description:
      "Et ürünlerinin hazırlanmasında hijyeni üretim yaklaşımımızın bir parçası olarak ele alıyoruz.",
  },
  {
    id: "soguk-tedarik",
    title: "Soğuk tedarik zinciri",
    description:
      "Ürünlerimizin tedarikini soğuk zincir sistemiyle gerçekleştiriyoruz.",
  },
] as const satisfies readonly TrustPillar[];
