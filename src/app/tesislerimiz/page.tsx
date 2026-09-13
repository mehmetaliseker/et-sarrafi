import { Container } from "@/components/ui/Container";
import { FacilityTabs } from "@/components/sections/FacilityTabs";
import { PageIntro } from "@/components/sections/PageIntro";
import { pages } from "@/data/pages";
import { createPageMetadata } from "@/lib/metadata";

const content = pages["/tesislerimiz"];
export const metadata = createPageMetadata({ title: content.metadataTitle, description: content.description, path: "/tesislerimiz" });
export default function FacilitiesPage() {
  return <><PageIntro {...content} /><section className="facilities-section" id="isleme" aria-label="Tesisler"><Container><FacilityTabs /></Container></section></>;
}
