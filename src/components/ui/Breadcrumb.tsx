import Link from "next/link";

import type { SitePath } from "@/types/content";

interface BreadcrumbItem {
  label: string;
  href?: SitePath;
}

interface BreadcrumbProps {
  items: readonly BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Sayfa yolu">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li className="flex items-center gap-2" key={item.label}>
              {item.href && !isLast ? (
                <Link className="inline-flex min-h-11 min-w-11 items-center underline-offset-4 hover:text-brand hover:underline" href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}
              {!isLast ? (
                <span aria-hidden="true" className="text-line-strong">
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
