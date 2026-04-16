import { setRequestLocale, getTranslations } from "next-intl/server";
import { AuthCard } from "@/components/auth/auth-card";
import { HandoffBootstrap } from "@/components/auth/handoff-bootstrap";
import { MagicLinkForm } from "@/components/auth/magic-link-form";

export const metadata = {
  title: "Magic link · ShiftGo",
  robots: { index: false, follow: false },
};

type SearchParams = { [key: string]: string | string[] | undefined };

function getRedirectTo(searchParams: SearchParams): string {
  const value = searchParams["redirect_to"];
  if (typeof value === "string") return value;
  return "shiftgoapp://auth/callback";
}

function getState(searchParams: SearchParams): string | null {
  const value = searchParams["state"];
  return typeof value === "string" ? value : null;
}

function buildQueryToForward(searchParams: SearchParams): string {
  const params = new URLSearchParams();
  for (const key of ["redirect_to", "state"]) {
    const value = searchParams[key];
    if (typeof value === "string") params.set(key, value);
  }
  const str = params.toString();
  return str ? `?${str}` : "";
}

export default async function MagicLinkPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const query = await searchParams;

  const t = await getTranslations("auth.magicLink");
  const queryToForward = buildQueryToForward(query);

  return (
    <>
      <HandoffBootstrap />
      <AuthCard
        title={t("title")}
        subtitle={t("subtitle")}
        footer={
          <a
            href={`/auth/signin${queryToForward}`}
            className="font-semibold text-[#341657] hover:underline"
          >
            {t("back")}
          </a>
        }
      >
        <MagicLinkForm
          redirectTo={getRedirectTo(query)}
          state={getState(query)}
        />
      </AuthCard>
    </>
  );
}
