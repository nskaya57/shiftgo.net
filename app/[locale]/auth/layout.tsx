import type { ReactNode } from "react";

export const metadata = {
  robots: { index: false, follow: false },
  other: {
    // Pre-connect to hCaptcha CDN so the invisible widget is ready by the
    // time the form is submitted. Saves ~300-800ms cold-load on WebViews.
    "preconnect-hcaptcha": "https://hcaptcha.com",
    "preconnect-hcaptcha-assets": "https://newassets.hcaptcha.com",
  },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <link rel="preconnect" href="https://hcaptcha.com" />
      <link rel="preconnect" href="https://newassets.hcaptcha.com" />
      <link rel="dns-prefetch" href="https://hcaptcha.com" />
      <link rel="dns-prefetch" href="https://newassets.hcaptcha.com" />
      <main className="min-h-[100dvh] bg-white px-5 pb-10 pt-6 text-[#17131f]">
        <div className="mx-auto w-full max-w-[440px]">{children}</div>
      </main>
    </>
  );
}
