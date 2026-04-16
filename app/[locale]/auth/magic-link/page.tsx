import { setRequestLocale, getTranslations } from "next-intl/server";
import { AuthCard } from "@/components/auth/auth-card";
import { HandoffBootstrap } from "@/components/auth/handoff-bootstrap";
import { MagicLinkForm } from "@/components/auth/magic-link-form";
import { AuthFooterLink } from "@/components/auth/auth-footer-link";

export const metadata = {
  title: "Magic link · ShiftGo",
  robots: { index: false, follow: false },
};

export default async function MagicLinkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("auth.magicLink");

  return (
    <>
      <HandoffBootstrap />
      <AuthCard
        title={t("title")}
        subtitle={t("subtitle")}
        footer={
          <AuthFooterLink
            href="/auth/signin"
            className="font-semibold text-[#341657] hover:underline"
          >
            {t("back")}
          </AuthFooterLink>
        }
      >
        <MagicLinkForm />
      </AuthCard>
    </>
  );
}
