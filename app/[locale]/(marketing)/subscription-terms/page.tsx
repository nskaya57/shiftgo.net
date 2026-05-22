import { setRequestLocale } from "next-intl/server";
import { PolicyPage } from "@/components/policy-page";

export const metadata = {
  title: "Subscription terms · ShiftGo",
  description:
    "How ShiftGo Premium subscriptions work — pricing, auto-renewal, trials, refunds, and cancellation — in plain English.",
};

export default async function SubscriptionTermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PolicyPage title="Subscription terms">
      <p className="text-[14px] uppercase tracking-[0.12em] text-[#a49fb0]">
        Last updated 22 May 2026
      </p>

      <p>
        ShiftGo offers an optional Premium subscription that unlocks calendar
        sync, sharing, PDF export, cloud backup, and a few other features.
        These terms explain how the subscription works, what it costs, how
        to cancel, and your rights under EU consumer law. We&apos;ve kept
        them plain — no fine-print clauses you need a lawyer to parse.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">The short version</h2>

      <ul className="list-disc space-y-2 pl-5">
        <li>Premium is billed by Apple or Google, not by us directly.</li>
        <li>It renews automatically until you cancel.</li>
        <li>You can cancel anytime — Premium stays active until the end of the paid period.</li>
        <li>Refunds go through Apple or Google, not through us.</li>
        <li>The free version of ShiftGo stays free, forever. Premium is genuinely optional.</li>
      </ul>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Plans &amp; pricing</h2>

      <p>
        ShiftGo Premium comes in two billing periods:
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[#17131f]">Monthly</strong> — renews every
          month.
        </li>
        <li>
          <strong className="text-[#17131f]">Yearly</strong> — renews every
          12 months. Cheaper per month than the monthly plan.
        </li>
      </ul>

      <p>
        The exact price is set by your country and currency, and is shown on
        the paywall screen inside the app before you confirm the purchase.
        Apple and Google handle the billing and may convert the price into
        your local currency. Your final receipt comes from them, not us.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Free trial</h2>

      <p>
        New subscribers may be offered a free trial (typically 7 days) on
        their first Premium purchase. During the trial you have full Premium
        access. If you don&apos;t cancel before the trial ends, you&apos;ll
        be charged automatically for the first paid period. You can cancel
        anytime during the trial from the App Store or Play Store and you
        won&apos;t be charged.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        EU right of withdrawal
      </h2>

      <p>
        If you&apos;re a consumer in the European Economic Area, you
        normally have a 14-day right to withdraw from a digital purchase
        under the Consumer Rights Directive. Because Premium starts
        delivering features the moment you subscribe, this right is
        considered waived once Premium content is provided — but the free
        trial above gives you a real, uncharged window to evaluate the
        service before any money changes hands.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Auto-renewal</h2>

      <p>
        Premium subscriptions renew automatically at the end of each billing
        period unless you cancel at least 24 hours before the renewal date.
        Your Apple ID or Google account is charged at the start of the new
        period. The price for renewals is the price displayed when you
        originally subscribed, unless we&apos;ve notified you of an
        upcoming change (see below).
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">How to cancel</h2>

      <p>
        You can cancel anytime. Premium features stay active until the end
        of your current paid period — no penalties, no nagging.
      </p>

      <p>
        Detailed steps are in our{" "}
        <a
          href="/cancel"
          className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
        >
          Cancel subscription
        </a>{" "}
        guide. Short version:
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[#17131f]">iPhone or iPad:</strong>{" "}
          Settings &gt; Apple ID (your name at top) &gt; Subscriptions &gt;
          ShiftGo &gt; Cancel subscription.
        </li>
        <li>
          <strong className="text-[#17131f]">Android:</strong> Play Store &gt;
          Profile icon &gt; Payments &amp; subscriptions &gt; Subscriptions
          &gt; ShiftGo &gt; Cancel subscription.
        </li>
      </ul>

      <p>
        Cancelling inside ShiftGo doesn&apos;t cancel the Apple or Google
        billing — the cancellation has to happen in the store that handles
        your payment.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Refunds</h2>

      <p>
        Because Apple and Google process all subscription payments, refund
        requests go through them, not through ShiftGo. We can&apos;t issue
        refunds directly.
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[#17131f]">Apple:</strong>{" "}
          <a
            href="https://reportaproblem.apple.com"
            className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
          >
            reportaproblem.apple.com
          </a>
        </li>
        <li>
          <strong className="text-[#17131f]">Google:</strong> Play Store &gt;
          Order history &gt; Request a refund (or Google Play Help for
          older purchases).
        </li>
      </ul>

      <p>
        If a refund is granted, Apple or Google will revoke Premium access on
        their next sync with our servers, usually within minutes.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        What Premium unlocks
      </h2>

      <p>The Premium features as of this revision:</p>

      <ul className="list-disc space-y-2 pl-5">
        <li>Cloud Sync between devices, with end-to-end encryption.</li>
        <li>Calendar sync with Apple Calendar (iCloud) and Google Calendar.</li>
        <li>Calendar sharing — send a live, read-only link to friends or family.</li>
        <li>PDF export of any month or custom date range, with logo and footer.</li>
        <li>Subscribed Calendars overlay (subscribe to a shared calendar from someone else).</li>
        <li>Custom date-range reports.</li>
        <li>More teammates and workplaces than the free limit.</li>
      </ul>

      <p>
        We may add features to Premium over time. Existing Premium
        subscribers get the new features at no extra cost during their current
        plan. We won&apos;t remove a feature you&apos;re actively using
        without warning you well in advance.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        Price changes
      </h2>

      <p>
        If we change the price of an existing subscription, you&apos;ll be
        notified inside the app and by Apple or Google through their official
        subscription channels before the change takes effect. You can choose
        to accept the new price or cancel before renewal. We won&apos;t
        change the price you pay for the current period after you&apos;ve
        already been charged.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        When Premium ends
      </h2>

      <p>
        When your Premium subscription ends — whether you cancel, fail a
        payment, or it expires — Premium features stop working at the end of
        your paid period. Your existing data isn&apos;t deleted: shifts,
        templates, and history stay in the app and on your devices. Cloud
        Backup snapshots stored on our servers are kept for 30 days as a
        grace period so you can resubscribe and resume sync without losing
        anything. After 30 days the server-side snapshot is permanently
        deleted.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        Cancellation by us
      </h2>

      <p>
        We may suspend or cancel a Premium subscription if the account is
        used to break our{" "}
        <a
          href="/terms"
          className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
        >
          Terms of service
        </a>{" "}
        (for example, reselling Premium access, abusing shared calendar
        links, or evading Apple/Google billing). We&apos;ll let you know
        first when we can, unless the violation is severe.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Account deletion</h2>

      <p>
        Deleting your ShiftGo account does <strong className="text-[#17131f]">not</strong>{" "}
        cancel your Apple or Google subscription. You have to cancel the
        subscription separately or you&apos;ll keep getting charged. See our{" "}
        <a
          href="/account-deletion"
          className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
        >
          Account deletion
        </a>{" "}
        page for the full rundown.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Related policies</h2>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <a
            href="/privacy"
            className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
          >
            Privacy policy
          </a>
        </li>
        <li>
          <a
            href="/terms"
            className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
          >
            Terms of service
          </a>
        </li>
        <li>
          <a
            href="/account-deletion"
            className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
          >
            Account deletion
          </a>
        </li>
        <li>
          <a
            href="/cancel"
            className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
          >
            Cancel subscription (step-by-step)
          </a>
        </li>
      </ul>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Contact</h2>

      <p>
        Questions about your subscription, billing, or these terms?{" "}
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
