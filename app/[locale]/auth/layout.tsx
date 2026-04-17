import type { ReactNode } from "react";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Cloudflare Turnstile CDN warmup — widget loads faster on cold WebView mount */}
      <link rel="preconnect" href="https://challenges.cloudflare.com" />
      <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />

      {/* Neighbour-page prefetch — WebView nav between signup/signin/forgot
          comes from cache instead of a fresh request. */}
      <link rel="prefetch" href="/auth/signup" as="document" />
      <link rel="prefetch" href="/auth/signin" as="document" />
      <link rel="prefetch" href="/auth/forgot" as="document" />

      <main className="min-h-[100dvh] bg-white px-5 pb-10 pt-6 text-[#17131f]">
        <div className="mx-auto w-full max-w-[440px]">{children}</div>
      </main>
    </>
  );
}
