import { setRequestLocale } from "next-intl/server";
import { SignupForm } from "@/components/auth/signup-form";

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

  return (
    <section className="w-full">
      <SignupForm />
    </section>
  );
}
