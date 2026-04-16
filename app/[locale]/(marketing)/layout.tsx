import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#341657] focus:px-6 focus:py-3 focus:text-[14px] focus:font-semibold focus:text-white focus:outline-none"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "ShiftGo",
            applicationCategory: "BusinessApplication",
            operatingSystem: "iOS, Android",
            description:
              "A shift and earnings tracker for hourly workers. Log shifts, calculate pay, export reports.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            author: {
              "@type": "Organization",
              name: "BE ADS Yazılım Teknoloji San. ve Tic. Ltd. Şti.",
              url: "https://shiftgo.net",
            },
          }),
        }}
      />
    </>
  );
}
