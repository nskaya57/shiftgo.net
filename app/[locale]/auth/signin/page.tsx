import { setRequestLocale, getTranslations } from "next-intl/server";
import { AuthCard } from "@/components/auth/auth-card";
import { HandoffBootstrap } from "@/components/auth/handoff-bootstrap";
import { SignInForm } from "@/components/auth/signin-form";

export const metadata = {
  title: "Sign in · ShiftGo",
  robots: { index: false, follow: false },
};

type SearchParams = { [key: string]: string | string[] | undefined };

function buildQueryToForward(searchParams: SearchParams): string {
  const params = new URLSearchParams();
  const forwardKeys = ["redirect_to", "state"];
  for (const key of forwardKeys) {
    const value = searchParams[key];
    if (typeof value === "string") params.set(key, value);
  }
  const str = params.toString();
  return str ? `?${str}` : "";
}

export default async function SignInPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const query = await searchParams;
  const queryToForward = buildQueryToForward(query);

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
            <a
              href={`/auth/signup${queryToForward}`}
              className="font-semibold text-[#341657] hover:underline"
            >
              {t("createAccount")}
            </a>
          </p>
        }
      >
        <SignInForm queryToForward={queryToForward} />
      </AuthCard>
    </>
  );
}
