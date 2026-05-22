import { setRequestLocale } from "next-intl/server";
import { PolicyPage } from "@/components/policy-page";

export const metadata = {
  title: "Account deletion · ShiftGo",
  description:
    "What happens when you delete your ShiftGo account — what gets erased, what doesn't, and how to cancel your subscription separately.",
};

export default async function AccountDeletionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PolicyPage title="Account deletion">
      <p className="text-[14px] uppercase tracking-[0.12em] text-[#a49fb0]">
        Last updated 22 May 2026
      </p>

      <p>
        You can delete your ShiftGo account at any time, directly from the
        app, without contacting support. This page explains what gets
        deleted, what doesn&apos;t, and the one thing you should not forget:
        if you&apos;re a Premium subscriber, deleting your account does{" "}
        <strong className="text-[#17131f]">not</strong> cancel the
        subscription — you have to cancel it separately or Apple/Google will
        keep charging you.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">The short version</h2>

      <ul className="list-disc space-y-2 pl-5">
        <li>You can delete your account from inside the app, anytime.</li>
        <li>Server-side data is removed immediately; we don&apos;t soft-delete and we don&apos;t keep a recovery copy.</li>
        <li>Local data on your phone (shifts, templates) is also wiped on sign-out from a delete.</li>
        <li>Premium subscriptions are billed by Apple or Google and must be cancelled separately.</li>
        <li>You can sign back up with the same email later — it&apos;ll be a fresh, empty account.</li>
      </ul>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">How to delete your account</h2>

      <ol className="list-decimal space-y-3 pl-5">
        <li>Open ShiftGo and tap the avatar in the top-left of the Home tab.</li>
        <li>Scroll down inside Edit Profile.</li>
        <li>Tap <strong className="text-[#17131f]">Delete account</strong>.</li>
        <li>Read the warning, type the confirmation phrase, and tap <strong className="text-[#17131f]">Delete</strong>.</li>
      </ol>

      <p>
        The deletion runs immediately. You&apos;ll be signed out within a
        few seconds. There&apos;s no &ldquo;undo&rdquo; — please make sure
        you really want to do this before you confirm.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">What gets deleted</h2>

      <p>
        When the deletion completes, the following is removed from our
        servers and from your device:
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>Your shifts, breaks, hourly rates, and earnings calculations.</li>
        <li>Your reminders, extra income entries, rotations, and templates.</li>
        <li>Cloud Backup snapshots (if you used the Premium sync feature).</li>
        <li>Calendar shares you created — recipients lose access immediately.</li>
        <li>Calendar shares you subscribed to — they disappear from your overlay.</li>
        <li>Connected calendars (iCloud, Google) are disconnected from ShiftGo. Your actual Apple Calendar or Google Calendar data isn&apos;t touched.</li>
        <li>Your account record itself (email, sign-in method, user ID).</li>
        <li>Push notification device tokens stored against your account.</li>
        <li>Linked RevenueCat customer record for analytics &amp; entitlements.</li>
      </ul>

      <p>
        Server-side deletion is a hard delete. We don&apos;t move the data
        into a &ldquo;deleted&rdquo; archive, and we can&apos;t recover it
        if you change your mind tomorrow.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        What does <em>not</em> get deleted automatically
      </h2>

      <p>
        Two things are intentionally outside the scope of in-app deletion:
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[#17131f]">Your Premium subscription.</strong>{" "}
          If you have ShiftGo Premium, it&apos;s billed by Apple or Google.
          We don&apos;t have the ability to cancel it on your behalf when
          you delete your account. If you don&apos;t cancel it separately,
          Apple or Google will keep charging your card.
        </li>
        <li>
          <strong className="text-[#17131f]">Backups outside ShiftGo.</strong>{" "}
          If you exported PDFs to your Files app, shared screenshots with
          someone, or backed up your phone to iCloud or Google Drive, those
          copies are outside our control and stay where you put them. You
          can delete them yourself the way you&apos;d delete any other file.
        </li>
      </ul>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        Cancel your subscription first
      </h2>

      <p>
        If you have Premium and you&apos;re going to delete your account,
        we strongly recommend cancelling the subscription first. Apple and
        Google won&apos;t notice that the account is gone — they&apos;ll
        just keep renewing the subscription on the next billing date.
      </p>

      <p>
        Detailed steps in our{" "}
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
          Settings &gt; Apple ID &gt; Subscriptions &gt; ShiftGo &gt; Cancel.
        </li>
        <li>
          <strong className="text-[#17131f]">Android:</strong> Play Store &gt;
          Profile icon &gt; Payments &amp; subscriptions &gt; Subscriptions
          &gt; ShiftGo &gt; Cancel.
        </li>
      </ul>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Timing</h2>

      <p>
        Deletion is processed immediately on our servers. Some downstream
        systems take a little longer to catch up:
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>Database records — instant.</li>
        <li>Cloud Backup snapshots — instant.</li>
        <li>Analytics traces (PostHog) — within 24 hours, anonymised.</li>
        <li>Crash logs (Sentry) — anonymised at write-time; no targeted purge needed.</li>
        <li>Server-side caches — usually within 5 minutes.</li>
      </ul>

      <p>
        If you need confirmation in writing for compliance purposes
        (GDPR Art. 17 right to erasure, for instance), email{" "}
        <a
          href="mailto:support@shiftgo.net"
          className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
        >
          support@shiftgo.net
        </a>{" "}
        and we&apos;ll send you a deletion confirmation.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        Coming back later
      </h2>

      <p>
        You can sign up again with the same email at any time. It&apos;ll be
        a fresh, empty account — we don&apos;t retain anything from the
        previous one. None of your previous shifts, templates, or sharing
        connections will come back. This is intentional: deletion means
        deletion.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        Removing the app entirely
      </h2>

      <p>
        Deleting the account is separate from uninstalling the app.
        Uninstalling alone removes the local copy on your phone but leaves
        your server-side account untouched. To remove everything end-to-end:
      </p>

      <ol className="list-decimal space-y-3 pl-5">
        <li>Cancel your Premium subscription in the App Store / Play Store.</li>
        <li>Delete your ShiftGo account inside the app (steps above).</li>
        <li>Uninstall the app from your device.</li>
      </ol>

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
            href="/subscription-terms"
            className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
          >
            Subscription terms
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
        Need help with a deletion, or have a question about what happens to
        your data?{" "}
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
