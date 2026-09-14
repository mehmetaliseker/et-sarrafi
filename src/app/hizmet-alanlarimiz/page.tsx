import { ServiceTabs } from "@/components/sections/ServiceTabs";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { pages } from "@/data/pages";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./services.module.css";

const content = pages["/hizmet-alanlarimiz"];
export const metadata = createPageMetadata({ title: content.metadataTitle, description: content.description, path: "/hizmet-alanlarimiz" });

export default function ServicesPage() {
  return <article className={styles.page}>
    <div className={styles.container}>
      <header className={styles.intro}>
        <Breadcrumb items={[{ label: "Ana Sayfa", href: "/" }, { label: "Hizmet Alanlarımız" }]} />
        <h1>Hizmet Alanlarımız</h1>
      </header>
      <ServiceTabs />
    </div>
  </article>;
}
