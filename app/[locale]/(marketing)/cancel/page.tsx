import { setRequestLocale } from "next-intl/server";
import { PolicyPage } from "@/components/policy-page";

export const metadata = {
  title: "Cancel subscription · ShiftGo",
  description:
    "Step-by-step instructions to cancel your ShiftGo Premium subscription on iPhone or Android.",
};

export default async function CancelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PolicyPage title="Cancel subscription">
      <p>
        ShiftGo Premium renews automatically until you cancel. You can cancel
        anytime — your Premium features stay active until the end of the
        current billing period. No penalties, no questions asked.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        Cancel on iPhone or iPad
      </h2>

      <ol className="list-decimal space-y-3 pl-5">
        <li>
          Open the <strong className="text-[#17131f]">Settings</strong> app
          on your device.
        </li>
        <li>
          Tap your name at the top of the screen.
        </li>
        <li>
          Tap <strong className="text-[#17131f]">Subscriptions</strong>.
        </li>
        <li>
          Find <strong className="text-[#17131f]">ShiftGo</strong> in the
          list and tap it.
        </li>
        <li>
          Tap{" "}
          <strong className="text-[#17131f]">Cancel Subscription</strong>.
        </li>
        <li>
          Confirm when prompted. You&apos;ll keep Premium until the end of
          your current billing period.
        </li>
      </ol>

      <p className="text-[14px] text-[#a49fb0]">
        You can also manage your subscription at{" "}
        <a
          href="https://apps.apple.com/account/subscriptions"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
        >
          apps.apple.com/account/subscriptions
        </a>
        .
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        Cancel on Android
      </h2>

      <ol className="list-decimal space-y-3 pl-5">
        <li>
          Open the{" "}
          <strong className="text-[#17131f]">Google Play Store</strong> app.
        </li>
        <li>
          Tap your profile icon in the top right.
        </li>
        <li>
          Tap{" "}
          <strong className="text-[#17131f]">
            Payments &amp; subscriptions
          </strong>{" "}
          → <strong className="text-[#17131f]">Subscriptions</strong>.
        </li>
        <li>
          Find <strong className="text-[#17131f]">ShiftGo</strong> and tap
          it.
        </li>
        <li>
          Tap{" "}
          <strong className="text-[#17131f]">Cancel subscription</strong>.
        </li>
        <li>
          Follow the prompts to confirm. Premium stays active until the end
          of your billing period.
        </li>
      </ol>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        What happens after I cancel?
      </h2>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          You keep all Premium features until the end of your current billing
          period.
        </li>
        <li>
          After that, ShiftGo reverts to the free version. Your shifts and
          earnings data stay on your device — nothing is deleted.
        </li>
        <li>
          If you had Cloud Sync enabled, your data remains on your device but
          stops syncing to the cloud. You can re-subscribe anytime to resume
          sync.
        </li>
      </ul>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        Need a refund?
      </h2>

      <p>
        Refunds are handled by Apple and Google, not by ShiftGo directly. To
        request a refund:
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[#17131f]">Apple</strong>:{" "}
          <a
            href="https://reportaproblem.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
          >
            reportaproblem.apple.com
          </a>
        </li>
        <li>
          <strong className="text-[#17131f]">Google</strong>:{" "}
          <a
            href="https://support.google.com/googleplay/answer/2479637"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
          >
            Google Play refund support
          </a>
        </li>
      </ul>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        Still need help?
      </h2>

      <p>
        Email us at{" "}
        <a
          href="mailto:support@shiftgo.net"
          className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
        >
          support@shiftgo.net
        </a>{" "}
        and we&apos;ll help you sort it out.
      </p>
    </PolicyPage>
  );
}
