import Link from "next/link";

import type { SitePath } from "@/types/content";
import styles from "./breadcrumb.module.css";
import { siteConfig } from "@/config/site";
import { serializeJsonLd } from "@/lib/json-ld";

interface BreadcrumbItem {
  label: string;
  href?: SitePath;
}

interface BreadcrumbProps {
  items: readonly BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Sayfa yolu" className={styles.nav}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem", position: index + 1, name: item.label,
          ...(item.href ? { item: new URL(item.href, siteConfig.url).toString() } : {}),
        })),
      }) }} />
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li className={styles.item} key={item.label}>
              {item.href && !isLast ? (
                <Link className={styles.link} href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}
              {!isLast ? (
                <span aria-hidden="true" className={styles.separator}>
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
