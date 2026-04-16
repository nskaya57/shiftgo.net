import { setRequestLocale } from "next-intl/server";
import { SignInForm } from "@/components/auth/signin-form";

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

  return (
    <section className="w-full">
      <SignInForm />
    </section>
  );
}
