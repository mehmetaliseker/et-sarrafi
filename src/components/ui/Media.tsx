"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { MediaAsset } from "@/data/media";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/cn";

interface MediaProps { asset: MediaAsset; className?: string; sizes: string; eager?: boolean; }
export function Media({ asset, className, sizes, eager = false }: MediaProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const [showSkeleton, setShowSkeleton] = useState(false);
  useEffect(() => {
    if (!asset.src) return;
    const timer = window.setTimeout(() => {
      const image = imageRef.current;
      if (image?.complete && image.naturalWidth > 0) setPhase("ready");
      else if (image?.complete && image.naturalWidth === 0) setPhase("error");
      else setShowSkeleton(true);
    }, 120);
    return () => window.clearTimeout(timer);
  }, [asset.src]);
  const style = { "--photo-position": asset.position, "--photo-position-mobile": asset.mobilePosition, "--media-ratio": asset.ratio, "--media-ratio-mobile": asset.mobileRatio || asset.ratio, "--photo-fit": asset.fit } as CSSProperties;
  if (!asset.src) return <div aria-hidden="true" className={cn("media-frame media-empty", className)} style={style} />;
  return <div className={cn("media-frame", showSkeleton && phase === "loading" && "media-loading", phase === "ready" && "media-ready", phase === "error" && "media-error", className)} style={style}>
    {showSkeleton && phase === "loading" && <Skeleton />}
    {phase !== "error" && <picture>
      {asset.mobileSrc && <source media="(max-width: 767px)" srcSet={asset.mobileSrc} />}
      <Image ref={imageRef} alt={asset.alt} className="photo" fill sizes={sizes} src={asset.src} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} onLoad={() => setPhase("ready")} onError={() => setPhase("error")} />
    </picture>}
  </div>;
}
