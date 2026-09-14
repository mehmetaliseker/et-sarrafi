import Link from "next/link";

import type { SitePath } from "@/types/content";
import styles from "./breadcrumb.module.css";

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
