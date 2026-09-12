import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { SitePath } from "@/types/content";

interface PageMetadataInput { title: string; description: string; path: SitePath; }
export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const canonicalUrl = new URL(path, siteConfig.url).toString();
  return {
    title: path === "/" ? { absolute: `${siteConfig.name} | Kırmızı Et Üretimi ve Tedariki` } : title,
    description,
    robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
    alternates: { canonical: canonicalUrl },
    openGraph: { title: `${title} | ${siteConfig.name}`, description, type: "website", locale: siteConfig.locale, siteName: siteConfig.name, url: canonicalUrl },
    twitter: { card: "summary", title, description },
  };
}
