import type { MetadataRoute } from "next";

import { sitePaths } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.indexable) return [];
  return sitePaths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
  }));
}
