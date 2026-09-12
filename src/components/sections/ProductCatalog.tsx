"use client";
import { useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { productGroups, productDetails } from "@/data/products";
function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback); window.addEventListener("catalogchange", callback); window.addEventListener("hashchange", callback);
  return () => { window.removeEventListener("popstate", callback); window.removeEventListener("catalogchange", callback); window.removeEventListener("hashchange", callback); };
}
const snapshot = () => window.location.search + window.location.hash;
const normalize = (value: string) => value.toLocaleLowerCase("tr").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll("ı", "i");
export function ProductCatalog({ cards }: { cards: ReactNode[] }) {
  const location = useSyncExternalStore(subscribe, snapshot, () => "");
  const [search, hash] = location.split("#");
  const params = new URLSearchParams(search);
  const requested = params.get("kategori") || hash || "";
  const category = productGroups.some(group => group.id === requested) ? requested : "";
  const query = params.get("q") || "";
  const group = productGroups.find(item => item.id === category);
  const results = productDetails.map((product, index) => ({ product, index })).filter(({ product }) => (!category || product.familyId === category) && normalize(product.title).includes(normalize(query.trim())));
  function update(key: "kategori" | "q", value: string) {
    const next = new URLSearchParams(window.location.search);
    if (value) next.set(key, value); else next.delete(key);
    if (key === "q" && category && !next.has("kategori")) next.set("kategori", category);
    const url = "/urunler" + (next.size ? "?" + next.toString() : "");
    if (key === "kategori") window.history.pushState(null, "", url); else window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event("catalogchange"));
  }
  function reset() { window.history.pushState(null, "", "/urunler"); window.dispatchEvent(new Event("catalogchange")); }
  return <div className="catalog">
    <div className="catalog-toolbar"><div className="catalog-search"><label htmlFor="product-search">Ürün adıyla arayın</label><div><input id="product-search" type="search" placeholder="Örn. dana bonfile" value={query} onChange={event => update("q", event.target.value)} autoComplete="off" /></div></div><p>Kesimleri ve ürün gruplarını yakından tanıyın.</p></div>
    <div className="catalog-filters" role="group" aria-label="Ürün kategorisi"><button type="button" aria-pressed={!category} onClick={() => update("kategori", "")}>Tümü</button>{productGroups.map(item => <button type="button" key={item.id} id={item.id} aria-pressed={category === item.id} onClick={() => update("kategori", item.id)}>{item.title}</button>)}</div>
    <div className="catalog-status"><h2>{group?.title || "Tüm ürünler"}</h2><p role="status" aria-live="polite">{results.length} ürün</p></div>
    {results.length ? <div className="product-grid">{results.map(({ product, index }) => <div key={product.slug}>{cards[index]}</div>)}</div> : <div className="catalog-empty"><h3>{group && !productDetails.some(p => p.familyId === group.id) && !query ? group.title : "Aramanızla eşleşen ürün bulunamadı."}</h3><p>{group && !productDetails.some(p => p.familyId === group.id) && !query ? "Bu ürün grubu hakkında bilgi almak için bizimle iletişime geçebilirsiniz." : "Farklı bir ürün adı deneyin veya kategori seçimini kaldırın."}</p><div><button type="button" onClick={reset}>Tüm ürünleri göster</button><Link href="/iletisim">İletişime geçin</Link></div></div>}
  </div>;
}
