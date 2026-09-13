import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/sections/PageIntro";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { ProductCard } from "@/components/sections/ProductCard";
import { pages } from "@/data/pages";
import { productDetails } from "@/data/products";
import { createPageMetadata } from "@/lib/metadata";
const content = pages["/urunler"];
export const metadata = createPageMetadata({ title: content.metadataTitle, description: content.description, path: "/urunler" });
export default function ProductsPage() {
  return <><PageIntro {...content} className="catalog-intro" /><Container><ProductCatalog cards={productDetails.map(product => <ProductCard key={product.slug} product={product} />)} /></Container></>;
}
