import type { ReactNode } from "react";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#f6f4fb] px-5 py-12 text-[#17131f]">
      <div className="w-full max-w-[480px]">{children}</div>
    </main>
  );
}
