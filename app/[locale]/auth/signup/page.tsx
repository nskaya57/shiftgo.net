import { setRequestLocale, getTranslations } from "next-intl/server";
import { AuthCard } from "@/components/auth/auth-card";
import { HandoffBootstrap } from "@/components/auth/handoff-bootstrap";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata = {
  title: "Create account · ShiftGo",
  robots: { index: false, follow: false },
};

type SearchParams = { [key: string]: string | string[] | undefined };

function buildQueryToForward(searchParams: SearchParams): string {
  const params = new URLSearchParams();
  for (const key of ["redirect_to", "state"]) {
    const value = searchParams[key];
    if (typeof value === "string") params.set(key, value);
  }
  const str = params.toString();
  return str ? `?${str}` : "";
}

function getRedirectTo(searchParams: SearchParams): string {
  const value = searchParams["redirect_to"];
  if (typeof value === "string") return value;
  return "shiftgoapp://auth/callback";
}

export default async function SignUpPage({
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
  const redirectTo = getRedirectTo(query);

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
            <a
              href={`/auth/signin${queryToForward}`}
              className="font-semibold text-[#341657] hover:underline"
            >
              {t("signInLink")}
            </a>
          </p>
        }
      >
        <SignupForm queryToForward={queryToForward} redirectTo={redirectTo} />
      </AuthCard>
    </>
  );
}
