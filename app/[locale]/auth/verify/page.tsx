import { setRequestLocale } from "next-intl/server";
import { VerifyClient } from "@/components/auth/verify-client";

export const metadata = {
  title: "Verifying · ShiftGo",
  robots: { index: false, follow: false },
};

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="w-full rounded-[24px] bg-white p-8 elev-2 md:p-10">
      <VerifyClient />
    </section>
  );
}
