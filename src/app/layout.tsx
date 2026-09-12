import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { siteConfig } from "@/config/site";
import { brandAssets } from "@/data/media";
import { serializeJsonLd } from "@/lib/json-ld";

import "./globals.css";

const onest = localFont({
  src: "./fonts/Onest-Variable.ttf",
  variable: "--font-onest",
  weight: "100 900",
  display: "swap",
  fallback: ["Arial"],
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Kurumsal`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  icons: brandAssets.favicon ? { icon: brandAssets.favicon } : undefined,
  robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  telephone: siteConfig.contact.phone.display,
  email: siteConfig.contact.email.display,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address.streetAddress,
    addressLocality: siteConfig.contact.address.district,
    addressRegion: siteConfig.contact.address.city,
    addressCountry: siteConfig.contact.address.countryCode,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={siteConfig.language}>
      <body className={`${onest.variable} min-h-dvh bg-canvas text-ink antialiased`}>
        <a
          className="skip-link"
          href="#ana-icerik"
        >
          İçeriğe geç
        </a>
        <div className="flex min-h-dvh flex-col">
          <ScrollToTop />
          <SiteHeader />
          <main className="flex-1" id="ana-icerik" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </div>
        {siteConfig.indexable && <script
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(organizationJsonLd),
          }}
          type="application/ld+json"
        />}
      </body>
    </html>
  );
}
