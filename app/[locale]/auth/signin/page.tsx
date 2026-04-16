import { setRequestLocale, getTranslations } from "next-intl/server";
import { AuthCard } from "@/components/auth/auth-card";
import { HandoffBootstrap } from "@/components/auth/handoff-bootstrap";
import { SignInForm } from "@/components/auth/signin-form";
import { AuthFooterLink } from "@/components/auth/auth-footer-link";

export const metadata = {
  title: "Sign in · ShiftGo",
  robots: { index: false, follow: false },
};

export default async function SignInPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("auth.signIn");

  return (
    <>
      <HandoffBootstrap />
      <AuthCard
        title={t("title")}
        subtitle={t("subtitle")}
        footer={
          <p className="space-x-1">
            <span>{t("noAccount")}</span>
            <AuthFooterLink
              href="/auth/signup"
              className="font-semibold text-[#341657] hover:underline"
            >
              {t("createAccount")}
            </AuthFooterLink>
          </p>
        }
      >
        <SignInForm />
      </AuthCard>
    </>
  );
}
