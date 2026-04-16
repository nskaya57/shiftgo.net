import { setRequestLocale } from "next-intl/server";
import { CallbackClient } from "@/components/auth/callback-client";

export const metadata = {
  title: "Opening ShiftGo · ShiftGo",
  robots: { index: false, follow: false },
};

export default async function CallbackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="w-full rounded-[24px] bg-white p-8 elev-2 md:p-10">
      <CallbackClient />
    </section>
  );
}
