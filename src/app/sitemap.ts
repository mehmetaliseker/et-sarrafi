import type { MetadataRoute } from "next";

import { sitePaths } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePaths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
