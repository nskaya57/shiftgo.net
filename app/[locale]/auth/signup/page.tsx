import { setRequestLocale, getTranslations } from "next-intl/server";
import { AuthCard } from "@/components/auth/auth-card";
import { HandoffBootstrap } from "@/components/auth/handoff-bootstrap";
import { SignupForm } from "@/components/auth/signup-form";
import { AuthFooterLink } from "@/components/auth/auth-footer-link";

export const metadata = {
  title: "Create account · ShiftGo",
  robots: { index: false, follow: false },
};

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("auth.signUp");

  return (
    <>
      <HandoffBootstrap />
      <AuthCard
        title={t("title")}
        subtitle={t("subtitle")}
        footer={
          <p className="space-x-1">
            <span>{t("haveAccount")}</span>
            <AuthFooterLink
              href="/auth/signin"
              className="font-semibold text-[#341657] hover:underline"
            >
              {t("signInLink")}
            </AuthFooterLink>
          </p>
        }
      >
        <SignupForm />
      </AuthCard>
    </>
  );
}
