import { SiteClosing } from "@/components/layout/SiteClosing";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { editorial } from "@/data/pages";
export const metadata = { title: "Sayfa Bulunamadı", robots: { index: false, follow: false } };

export default function NotFound() {
  return <><main className="flex-1" id="ana-icerik" tabIndex={-1}><Container><div className="not-found"><p className="eyebrow">404 / Sayfa bulunamadı</p><h1 className="display-title">{editorial.notFound.title}</h1><p className="body-copy">{editorial.notFound.description}</p><div className="flex flex-wrap gap-3"><LinkButton href="/">Ana sayfa</LinkButton><LinkButton href="/urunler" variant="secondary">Ürünlerimiz</LinkButton></div></div></Container></main><SiteClosing /></>;
}
