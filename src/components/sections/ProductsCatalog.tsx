"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { catalogProducts, type CatalogProduct, type ProductCategory } from "@/data/product-catalog";
import styles from "@/app/urunler/products.module.css";

type CategoryFilter = "Tümü" | ProductCategory;
const categories: readonly CategoryFilter[] = ["Tümü", "Dana", "Kuzu"];

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll("ı", "i");
}

export function ProductsCatalog() {
  const [category, setCategory] = useState<CategoryFilter>("Tümü");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CatalogProduct | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const results = useMemo(() => {
    const term = normalize(query.trim());
    return catalogProducts.filter(product =>
      (category === "Tümü" || product.category === category) &&
      (!term || normalize(`${product.name} ${product.category} ${product.shortDescription}`).includes(term))
    );
  }, [category, query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected || !dialog) return;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [selected]);

  function openProduct(product: CatalogProduct, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelected(product);
  }

  function closeProduct() {
    dialogRef.current?.close();
  }

  function handleClosed() {
    setSelected(null);
    requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  }

  function resetFilters() {
    setCategory("Tümü");
    setQuery("");
  }

  return <>
    <div className={`${styles.container} ${styles.filterRegion}`}>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Ürün kategorisi">
          {categories.map(item => <button aria-pressed={category === item} key={item} type="button" onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <label className={styles.search}>
          <span className="sr-only">Ürün ara</span>
          <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
          <input type="search" value={query} placeholder="Ürün ara..." autoComplete="off" onChange={event => setQuery(event.target.value)} />
        </label>
      </div>
    </div>

    <section className={styles.catalogSurface} aria-label="Ürün kataloğu">
      <div className={styles.container}>
        <p className="sr-only" role="status" aria-live="polite">{results.length} ürün gösteriliyor.</p>
        {results.length > 0 ? <div className={styles.grid}>
          {results.map((product, index) => <div className={styles.cardSlot} key={product.id}>
            <article className={styles.card}>
              <button className={styles.cardImage} type="button" aria-label={`${product.name} ürününü incele`} onClick={event => openProduct(product, event.currentTarget)}><Image src={product.image} alt={product.imageAlt} fill sizes="(min-width: 1200px) 358px, (min-width: 700px) 46vw, calc(100vw - 40px)" loading={index < 3 ? "eager" : "lazy"} /></button>
              <div className={styles.cardBody}>
                <p className={styles.category}>{product.category}</p>
                <h2>{product.name}</h2>
                <p className={styles.summary}>{product.shortDescription}</p>
                <button type="button" onClick={event => openProduct(product, event.currentTarget)}>Ürünü İncele <span aria-hidden="true">→</span></button>
              </div>
            </article>
          </div>)}
        </div> : <div className={styles.empty}>
          <h2>Aramanızla eşleşen ürün bulunamadı.</h2>
          <p>Farklı bir ürün adı deneyin veya seçili kategoriyi değiştirin.</p>
          <button type="button" onClick={resetFilters}>Filtreleri temizle</button>
        </div>}
      </div>
    </section>

    {selected && <dialog className={styles.dialog} ref={dialogRef} aria-labelledby="product-modal-title" onClose={handleClosed} onCancel={event => { event.preventDefault(); closeProduct(); }} onMouseDown={event => { if (event.target === event.currentTarget) closeProduct(); }}>
      <div className={styles.modalPanel}>
        <button className={styles.close} type="button" aria-label="Ürün detayını kapat" onClick={closeProduct}><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 5 19 19M19 5 5 19" /></svg></button>
        <div className={styles.modalImage}><Image src={selected.image} alt={selected.imageAlt} fill sizes="(min-width: 800px) 488px, calc(100vw - 80px)" /></div>
        <div className={styles.modalCopy}>
          <p className={styles.category}>{selected.category}</p>
          <h2 id="product-modal-title">{selected.name}</h2>
          {selected.detailParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </dialog>}
  </>;
}
