import { setRequestLocale } from "next-intl/server";
import { PolicyPage } from "@/components/policy-page";

export const metadata = {
  title: "Terms of service · ShiftGo",
  description:
    "The plain-English terms for using ShiftGo, the shift and earnings tracker.",
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PolicyPage title="Terms of service">
      <p className="text-[14px] uppercase tracking-[0.12em] text-[#a49fb0]">
        Last updated 16 April 2026
      </p>

      <p>
        Welcome to ShiftGo. These terms cover what you can expect from us, and
        what we expect from you. We&apos;ve kept them as short and as plain as
        we can.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Using ShiftGo</h2>

      <p>
        ShiftGo is a tool for tracking your shifts and calculating your
        earnings. You can install it on your phone, use it for free, and add
        as many shifts as you want. The free version is genuinely free — no
        ads, no time-limited trial, no nag screens.
      </p>

      <p>
        You&apos;re responsible for the accuracy of the data you enter. ShiftGo
        does the math, but the inputs are yours: hourly rate, start time,
        end time, breaks. Garbage in, garbage out.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Premium</h2>

      <p>
        ShiftGo Premium is an optional subscription that unlocks PDF export,
        Cloud Sync between devices, calendar integrations, and a few advanced
        features. You can subscribe through the App Store or Google Play.
      </p>

      <p>Premium subscriptions:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Renew automatically until you cancel.</li>
        <li>Are charged through your Apple or Google account, not directly by us.</li>
        <li>Can be cancelled anytime from the App Store or Play Store. You keep Premium until the end of the paid period.</li>
        <li>Don&apos;t carry a refund obligation from us. Refund policies are governed by Apple and Google.</li>
      </ul>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Your account &amp; data</h2>

      <p>
        You can use ShiftGo without signing in. If you do sign in, you&apos;re
        responsible for keeping your account credentials safe. Don&apos;t share
        your account; one person, one account.
      </p>

      <p>
        Your data — shifts, earnings, templates, notes — belongs to you. We
        don&apos;t claim ownership over anything you create in the app. See our{" "}
        <a
          href="/privacy"
          className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
        >
          Privacy policy
        </a>{" "}
        for the full breakdown of how it&apos;s handled.
      </p>

      <p>
        You can delete your account at any time. When you do, your data is
        permanently removed from our servers within 30 days.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Acceptable use</h2>

      <p>Don&apos;t do these things while using ShiftGo:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Reverse-engineer, decompile, or attempt to extract the source code.</li>
        <li>Use the service to break the law in your jurisdiction.</li>
        <li>Try to access other users&apos; data.</li>
        <li>Resell or repackage ShiftGo as your own product.</li>
        <li>Spam, phish, or otherwise abuse the service.</li>
      </ul>

      <p>
        We may suspend accounts that violate these rules. We&apos;ll tell you
        what happened and give you a chance to recover your data first,
        unless the violation is severe.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Service availability</h2>

      <p>
        We work hard to keep ShiftGo and Cloud Sync running, but we can&apos;t
        promise zero downtime. The app works fully offline, so a server
        outage shouldn&apos;t prevent you from logging shifts. Sync may be
        delayed during outages and will catch up automatically.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Disclaimer</h2>

      <p>
        ShiftGo is a personal earnings tracker. It is not payroll software,
        accounting software, or legal advice. Don&apos;t rely on it for tax
        filings without verifying the numbers yourself. We do our best to
        calculate accurately, but we can&apos;t be liable for errors that
        result in financial loss.
      </p>

      <p>
        ShiftGo is provided &quot;as is.&quot; To the extent permitted by law,
        we disclaim warranties of merchantability and fitness for a
        particular purpose.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Changes to these terms</h2>

      <p>
        If we change these terms, we&apos;ll update the date at the top and
        notify you in the app. Continued use after a change means you accept
        the new terms.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Governing law</h2>

      <p>
        These terms are governed by the laws of the Republic of Türkiye. Any
        dispute arising from these terms will be resolved in the courts of
        Antalya, Türkiye.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">About us</h2>

      <p>
        ShiftGo is developed and operated by{" "}
        <strong className="text-[#17131f]">
          BE ADS Yazılım Teknoloji Sanayi ve Ticaret Limited Şirketi
        </strong>
        , a company registered in Antalya, Türkiye.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Contact</h2>

      <p>
        Questions about these terms?{" "}
        <a
          href="mailto:support@shiftgo.net"
          className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
        >
          support@shiftgo.net
        </a>
      </p>

      <p className="text-[14px] text-[#a49fb0]">
        BE ADS Yazılım Teknoloji San. ve Tic. Ltd. Şti. · Enes Kaya · Antalya, Türkiye
      </p>
    </PolicyPage>
  );
}
