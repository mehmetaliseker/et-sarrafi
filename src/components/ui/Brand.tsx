import Image from "next/image";
import Link from "next/link";
import type { MouseEventHandler } from "react";
import { siteConfig } from "@/config/site";
import { brandAssets } from "@/data/media";

interface BrandProps {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function Brand({ onClick }: BrandProps = {}) {
  return (
    <Link aria-label={`${siteConfig.name} ana sayfa`} className="brand" href="/" onClick={onClick}>
      {brandAssets.logo ? <span className="brand-icon" aria-hidden="true"><Image src={brandAssets.logo.src} width={360} height={261} sizes="160px" alt="" loading="eager" /></span> : siteConfig.name}
    </Link>
  );
}
