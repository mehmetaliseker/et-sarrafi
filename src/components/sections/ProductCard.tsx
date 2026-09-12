import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { media } from "@/data/media";
import type { ProductDetail } from "@/data/products";
export function ProductCard({ product }: { product: ProductDetail }) {
  return <Link className="product-card" href={`/urunler/${product.slug}`}>
    <Media asset={media[product.media]} sizes="(min-width: 1600px) 480px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw" />
    <div className="product-card-caption"><div><p className="eyebrow">{product.family}</p><h3>{product.title}</h3></div></div>
  </Link>;
}
