import type { ReactNode } from "react";
import { SiteClosing } from "@/components/layout/SiteClosing";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <><main className="flex-1" id="ana-icerik" tabIndex={-1}>{children}</main><SiteClosing /></>;
}
