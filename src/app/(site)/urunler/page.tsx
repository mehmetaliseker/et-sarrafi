import { ProductsCatalog } from "@/components/sections/ProductsCatalog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./products.module.css";

const description = "Kırmızı et ürünlerimizi inceleyin; ürün bilgisi ve tedarik talepleriniz için bizimle iletişime geçin.";
export const metadata = createPageMetadata({ title: "Ürünlerimiz", description, path: "/urunler" });

export default function ProductsPage() {
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.intro}`}>
      <Breadcrumb items={[{ label: "Ana Sayfa", href: "/" }, { label: "Ürünlerimiz" }]} />
      <h1>Ürünlerimiz</h1>
      <p className={styles.introDescription}>{description}</p>
    </header>
    <ProductsCatalog />
  </article>;
}
