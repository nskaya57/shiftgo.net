import type { ReactNode } from "react";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-[100dvh] bg-white px-5 pb-10 pt-6 text-[#17131f]">
      <div className="mx-auto w-full max-w-[440px]">{children}</div>
    </main>
  );
}
