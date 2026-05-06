import { setRequestLocale } from "next-intl/server";
import { PolicyPage } from "@/components/policy-page";

export const metadata = {
  title: "Privacy policy · ShiftGo",
  description:
    "How ShiftGo handles your shifts, earnings, and personal data — in plain English.",
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PolicyPage title="Privacy policy">
      <p className="text-[14px] uppercase tracking-[0.12em] text-[#a49fb0]">
        Last updated 6 May 2026
      </p>

      <p>
        ShiftGo is a shift and earnings tracker built for hourly workers. We
        wrote this policy to explain — in plain English, with no clauses you
        need a lawyer to parse — what happens to your data when you use the
        app and this website.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">The short version</h2>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          Your shifts, earnings, and personal notes live on your phone. We
          don&apos;t need to see them to make the app work.
        </li>
        <li>
          If you turn on Cloud Sync (a Premium feature), your data is
          end-to-end encrypted before it leaves your device. We can&apos;t read
          it on the server, even if we wanted to.
        </li>
        <li>We never sell your data. We don&apos;t share it with advertisers.</li>
        <li>We don&apos;t use third-party analytics or trackers in the mobile app.</li>
        <li>You can delete your account at any time. When you do, your data is gone for good.</li>
      </ul>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">What we collect</h2>

      <h3 className="pt-4 text-[17px] font-semibold text-[#17131f]">Data you create in the app</h3>
      <p>
        When you add a shift, set an hourly rate, or save a template, that
        information is stored on your device using a local database. It
        doesn&apos;t leave your phone unless you turn on Cloud Sync.
      </p>

      <h3 className="pt-4 text-[17px] font-semibold text-[#17131f]">Account data (only if you sign in)</h3>
      <p>
        If you sign in with email, Apple, or Google, we store your email
        address so we can sync your data across devices and reach you about
        your account. That&apos;s it. No marketing emails unless you explicitly
        opt in.
      </p>

      <h3 className="pt-4 text-[17px] font-semibold text-[#17131f]">Diagnostic data</h3>
      <p>
        If the app crashes, we may collect anonymous crash reports through
        Apple or Google&apos;s standard developer tools (you can opt out in your
        device settings). These reports never include your shifts, earnings,
        or personal information.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">What we don&apos;t collect</h2>

      <ul className="list-disc space-y-2 pl-5">
        <li>We don&apos;t connect to your bank account.</li>
        <li>We don&apos;t read your contacts, photos, or messages.</li>
        <li>We don&apos;t track your location.</li>
        <li>We don&apos;t use third-party advertising SDKs.</li>
        <li>We don&apos;t sell, rent, or share your data with anyone.</li>
      </ul>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Cloud Sync &amp; encryption</h2>

      <p>
        If you enable Cloud Sync (included with ShiftGo Premium), your shifts
        and earnings are encrypted on your device before being uploaded. The
        encryption key is derived from your account credentials and never
        leaves your phone. We store only the encrypted blob — even ShiftGo
        engineers can&apos;t read your data on the server.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Calendar integrations</h2>

      <p>
        ShiftGo Premium can connect to your Google Calendar and (on iOS) your
        iCloud Calendar so your work shifts and personal commitments live in
        one place. Both integrations are <strong className="text-[#17131f]">opt-in</strong> —
        you choose to connect them from <em>Settings → Calendar Filter →
        Sync</em>, and you can disconnect at any time.
      </p>

      <h3 className="pt-4 text-[17px] font-semibold text-[#17131f]">Google Calendar</h3>
      <p>
        When you connect Google Calendar, ShiftGo requests the{" "}
        <code className="rounded bg-[#f4f1f8] px-1.5 py-0.5 text-[14px] text-[#341657]">
          https://www.googleapis.com/auth/calendar
        </code>{" "}
        OAuth scope. Here is exactly what we do with that access:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[#17131f]">Read</strong> the list of calendars in your Google account so you can choose which ones to overlay onto the ShiftGo grid.
        </li>
        <li>
          <strong className="text-[#17131f]">Read</strong> events from the calendars you chose, so they appear alongside your shifts. Holiday and birthday calendars are filtered out client-side.
        </li>
        <li>
          <strong className="text-[#17131f]">Write</strong> ShiftGo shifts and reminders to a single dedicated calendar named &ldquo;ShiftGo&rdquo; that we create inside your account on first sync. We never modify, delete, or read events from your other calendars.
        </li>
      </ul>

      <h3 className="pt-4 text-[17px] font-semibold text-[#17131f]">Apple Calendar (iCloud)</h3>
      <p>
        On iOS, you can connect your device&apos;s Calendar permission. ShiftGo
        reads events from the calendars you select and writes ShiftGo shifts to
        a dedicated &ldquo;ShiftGo&rdquo; calendar on your device. iCloud roams
        the dedicated calendar across your Apple devices via your iCloud
        account; Apple, not ShiftGo, controls that sync.
      </p>

      <h3 className="pt-4 text-[17px] font-semibold text-[#17131f]">Where calendar data is stored</h3>
      <p>
        Calendar events read from Google or iCloud stay on your device. They
        are <strong className="text-[#17131f]">not transmitted to ShiftGo&apos;s
        servers</strong>, not included in Cloud Sync, not used for analytics,
        and not used to train any model. They are kept in app memory and the
        local database only for as long as the integration is connected.
      </p>

      <h3 className="pt-4 text-[17px] font-semibold text-[#17131f]">Disconnecting and revoking access</h3>
      <p>
        You can disconnect either integration at any time from{" "}
        <em>Settings → Calendar Filter → Sync</em>. Disconnecting Google
        Calendar calls Google&apos;s server-side <code className="rounded bg-[#f4f1f8] px-1.5 py-0.5 text-[14px] text-[#341657]">revokeAccess</code>{" "}
        endpoint, which removes ShiftGo from your Google Account permissions
        list; deleting your ShiftGo account does the same. You can also revoke
        the grant directly at{" "}
        <a
          href="https://myaccount.google.com/permissions"
          className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
          target="_blank"
          rel="noopener noreferrer"
        >
          myaccount.google.com/permissions
        </a>
        . The dedicated &ldquo;ShiftGo&rdquo; calendar that ShiftGo created
        stays in your account after disconnect so you don&apos;t lose the
        history; you can delete it manually from Google Calendar / Apple
        Calendar if you want it gone.
      </p>

      <h3 className="pt-4 text-[17px] font-semibold text-[#17131f]">Google API Services User Data Policy</h3>
      <p>
        ShiftGo&apos;s use of information received from Google APIs adheres to
        the{" "}
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy"
          className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google API Services User Data Policy
        </a>
        , including the{" "}
        <strong className="text-[#17131f]">Limited Use</strong> requirements.
        We do not transfer Google user data to third parties except to provide
        or improve user-facing features, and we do not use Google user data
        for serving advertisements or to train generalized AI / machine
        learning models. Humans do not read Google user data unless we have
        your explicit consent for a specific incident, it is required for
        security purposes (such as investigating abuse), to comply with
        applicable law, or the data is aggregated and anonymized for internal
        operations.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Third parties</h2>

      <p>We use a small number of trusted services to run ShiftGo:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[#17131f]">Apple App Store / Google Play</strong>: handle subscriptions and purchases. We never see your payment information.
        </li>
        <li>
          <strong className="text-[#17131f]">Supabase</strong>: encrypted cloud storage for sync. They host the encrypted blobs; they can&apos;t read them.
        </li>
        <li>
          <strong className="text-[#17131f]">Apple / Google Sign-In</strong>: optional authentication. Used only to verify your identity when you sign in.
        </li>
        <li>
          <strong className="text-[#17131f]">Google Calendar API</strong>: optional integration (Premium). Reads your Google Calendar list and events into the app for unified scheduling, and writes ShiftGo shifts to a dedicated &ldquo;ShiftGo&rdquo; calendar in your Google account. See the &ldquo;Calendar integrations&rdquo; section below for the full data flow.
        </li>
        <li>
          <strong className="text-[#17131f]">Apple Calendar (iCloud)</strong>: optional integration (Premium, iOS). Reads your iCloud calendars into the app and writes ShiftGo shifts to a dedicated &ldquo;ShiftGo&rdquo; calendar on your device.
        </li>
      </ul>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Your rights</h2>

      <p>You can, at any time:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Export your data as a PDF (Premium) or read it directly on your device.</li>
        <li>Delete your account from Settings → Account → Delete account. This permanently removes everything we store about you.</li>
        <li>
          Contact us at{" "}
          <a
            href="mailto:support@shiftgo.net"
            className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
          >
            support@shiftgo.net
          </a>{" "}
          to request a copy of any data we hold about you.
        </li>
      </ul>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Children</h2>

      <p>
        ShiftGo is intended for people aged 16 and over. We don&apos;t knowingly
        collect data from anyone younger.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Changes to this policy</h2>

      <p>
        If we change anything material about how we handle your data, we&apos;ll
        update the date at the top of this page and notify you in the app
        before the change takes effect.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Data controller</h2>

      <p>
        ShiftGo is operated by <strong className="text-[#17131f]">BE ADS Yazılım Teknoloji Sanayi ve Ticaret Limited Şirketi</strong>, a company registered in Antalya, Türkiye.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">Contact</h2>

      <p>
        Questions? Concerns? Real things you&apos;d like changed? Email{" "}
        <a
          href="mailto:support@shiftgo.net"
          className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
        >
          support@shiftgo.net
        </a>{" "}
        and a real person will get back to you.
      </p>

      <p className="text-[14px] text-[#a49fb0]">
        BE ADS Yazılım Teknoloji San. ve Tic. Ltd. Şti. · Enes Kaya · Antalya, Türkiye
      </p>
    </PolicyPage>
  );
}
