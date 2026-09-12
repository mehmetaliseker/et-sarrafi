import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { brandAssets } from "@/data/media";

export function Brand() {
  return (
    <Link aria-label={`${siteConfig.name} ana sayfa`} className="brand" href="/">
      {brandAssets.logo && <span className="brand-icon" aria-hidden="true"><Image src={brandAssets.logo.src} fill sizes="32px" alt="" /></span>}{siteConfig.name}
    </Link>
  );
}
