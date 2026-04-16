import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata = {
  title: "Authentication error · ShiftGo",
  robots: { index: false, follow: false },
};

type SearchParams = { [key: string]: string | string[] | undefined };

function resolveErrorBody(
  code: string | undefined,
  messages: {
    invalidState: string;
    invalidRedirect: string;
    generic: string;
  }
): string {
  switch (code) {
    case "invalid_state":
      return messages.invalidState;
    case "invalid_redirect":
      return messages.invalidRedirect;
    default:
      return messages.generic;
  }
}

export default async function AuthErrorPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const query = await searchParams;

  const t = await getTranslations("auth.error");
  const codeRaw = query["code"];
  const code = typeof codeRaw === "string" ? codeRaw : undefined;
  const body = resolveErrorBody(code, {
    invalidState: t("invalidState"),
    invalidRedirect: t("invalidRedirect"),
    generic: t("genericBody"),
  });

  return (
    <AuthCard title={t("title")} subtitle={body}>
      <div className="flex flex-col gap-3">
        <Link
          href="/auth/signin"
          className="inline-flex w-full items-center justify-center rounded-full bg-[#341657] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#5a2d82]"
        >
          {t("tryAgain")}
        </Link>
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center rounded-full border border-[#e8e0f1] bg-white px-6 py-3 text-[14px] font-semibold text-[#17131f] transition-colors hover:border-[#341657] hover:text-[#341657]"
        >
          {t("backHome")}
        </Link>
      </div>
    </AuthCard>
  );
}
