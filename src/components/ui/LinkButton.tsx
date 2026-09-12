import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type LinkButtonVariant = "primary" | "secondary" | "text";

interface LinkButtonProps {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: LinkButtonVariant;
}

const variantClasses: Record<LinkButtonVariant, string> = {
  primary:
    "border-brand bg-brand text-paper hover:border-brand-strong hover:bg-brand-strong",
  secondary:
    "border-line bg-transparent text-ink hover:border-brand hover:text-brand",
  text: "border-transparent bg-transparent px-0 text-brand underline-offset-4 hover:underline",
};

export function LinkButton({
  children,
  className,
  href,
  variant = "primary",
}: LinkButtonProps) {
  const classes = cn(
    "link-button inline-flex min-h-12 items-center justify-center gap-3 rounded-control border px-5 py-3 text-sm font-semibold transition-colors",
    variantClasses[variant],
    className,
  );

  if (href.startsWith("/")) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <a className={classes} href={href}>
      {children}
    </a>
  );
}
