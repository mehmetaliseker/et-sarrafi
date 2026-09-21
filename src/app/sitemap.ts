import type { MetadataRoute } from "next";

import { sitePaths } from "@/config/navigation";
import { siteConfig } from "@/config/site";

type SitemapEntry = MetadataRoute.Sitemap[number];

function routeDetails(path: (typeof sitePaths)[number]): Pick<SitemapEntry, "changeFrequency" | "priority"> {
  if (path === "/") return { changeFrequency: "weekly", priority: 1 };
  if (path === "/urunler") return { changeFrequency: "weekly", priority: 0.9 };
  if (path.startsWith("/urunler/")) return { changeFrequency: "monthly", priority: 0.8 };
  if (path === "/politikalarimiz") return { changeFrequency: "yearly", priority: 0.4 };
  if (path === "/iletisim") return { changeFrequency: "yearly", priority: 0.6 };
  return { changeFrequency: "monthly", priority: 0.7 };
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.indexable) return [];
  return sitePaths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    ...routeDetails(path),
  }));
}
