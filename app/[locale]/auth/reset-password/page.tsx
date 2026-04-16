import { setRequestLocale, getTranslations } from "next-intl/server";
import { AuthCard } from "@/components/auth/auth-card";
import { HandoffBootstrap } from "@/components/auth/handoff-bootstrap";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata = {
  title: "Set new password · ShiftGo",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("auth.resetPassword");

  return (
    <>
      <HandoffBootstrap />
      <AuthCard title={t("title")} subtitle={t("subtitle")}>
        <ResetPasswordForm />
      </AuthCard>
    </>
  );
}
