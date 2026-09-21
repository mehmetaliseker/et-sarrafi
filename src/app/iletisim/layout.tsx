import type { ReactNode } from "react";
import { SiteClosing } from "@/components/layout/SiteClosing";
import styles from "./contact.module.css";

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>
    <main className={styles.viewport} id="ana-icerik" tabIndex={-1}>{children}</main>
    <SiteClosing backgroundImage="/images/corporate/arac.webp" />
  </>;
}
