import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Media } from "@/components/ui/Media";
import { LinkButton } from "@/components/ui/LinkButton";
import { Arrow } from "@/components/ui/Arrow";
import { ProductCard } from "@/components/sections/ProductCard";
import { media } from "@/data/media";
import { productDetails } from "@/data/products";
import { createPageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return productDetails.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = productDetails.find(item => item.slug === slug);
  if (!product) notFound();
  return createPageMetadata({ title: product.title, description: product.description, path: `/urunler/${product.slug}` });
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = productDetails.find(item => item.slug === slug);
  if (!product) notFound();
  const related = [...productDetails.filter(item => item.slug !== slug && item.familyId === product.familyId), ...productDetails.filter(item => item.slug !== slug && item.familyId !== product.familyId)].slice(0, 3);
  return <Container><div className="product-detail"><Breadcrumb items={[{ label: "Ana sayfa", href: "/" }, { label: "Ürünler", href: "/urunler" }, { label: product.title }]} />
    <div className="detail-grid"><Media asset={media[product.media]} className="detail-image" sizes="(min-width: 768px) 52vw, 100vw" eager /><div className="detail-copy"><p className="eyebrow">{product.family}</p><h1 className="display-title">{product.title}</h1><p className="body-copy">{product.description}</p><dl><dt>Ürün grubu</dt><dd><Link className="text-link" href={`/urunler?kategori=${product.familyId}`}>{product.family}</Link></dd></dl><LinkButton href="/iletisim">Ürün hakkında bilgi alın</LinkButton></div></div>
    <Link className="text-link" href="/urunler"><Arrow className="rotate-180" />Ürün kataloğuna dönün</Link>
  </div><section className="related-products" aria-labelledby="related-title"><div className="section-top"><h2 id="related-title" className="section-title">İlgili ürünler</h2><p className="body-copy">Ürün gruplarımızdaki diğer kesimleri inceleyin.</p></div><div className="product-grid">{related.map(item => <ProductCard key={item.slug} product={item} />)}</div></section></Container>;
}
