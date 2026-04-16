type Item = { q: string; a: React.ReactNode };
type Section = { id: string; title: string; items: Item[] };

const sections: Section[] = [
  {
    id: "premium",
    title: "ShiftGo Premium",
    items: [
      {
        q: "What's included in ShiftGo Premium?",
        a: "Premium unlocks PDF export of your monthly reports, calendar sync with Google Calendar and Apple iCloud, and unlimited shift history. Everything else stays free and ad-free.",
      },
      {
        q: "How do I upgrade?",
        a: "Open ShiftGo, go to Settings, and tap Upgrade to Premium. Monthly and annual plans are available. You'll be charged through your App Store or Google Play account — we never see your card.",
      },
      {
        q: "How do I cancel my subscription?",
        a: (
          <>
            On iPhone, open the Settings app → tap your name → Subscriptions → ShiftGo → Cancel.
            On Android, open the Play Store app → tap your profile → Payments & subscriptions → Subscriptions → ShiftGo → Cancel.
            Your Premium features stay active until the end of the paid period.
          </>
        ),
      },
      {
        q: "I paid but Premium features aren't unlocked.",
        a: "Pull to refresh the Settings screen, or quit and reopen the app. Make sure you're signed in with the same App Store or Play Store account you used to purchase. If it's still not working after a minute, email us and we'll sort it out.",
      },
    ],
  },
  {
    id: "general",
    title: "General",
    items: [
      {
        q: "How do I get started?",
        a: "Download ShiftGo from the App Store or Google Play, open the app, and tap Add Shift on the home screen. Enter your start time, end time, and hourly rate — that's all you need to see your first earnings calculation.",
      },
      {
        q: "Does ShiftGo work offline?",
        a: "Yes. You can add, edit, and delete shifts anytime without a connection. Everything syncs automatically once you're back online.",
      },
      {
        q: "Is my data backed up?",
        a: "Your data lives on your device first. When you sign in, it syncs to the cloud end-to-end encrypted. Switch phones and your shifts follow you over.",
      },
      {
        q: "How do I delete my account?",
        a: "Go to Settings → Account → Delete account. This permanently removes all your shifts and earnings from our servers. The action can't be undone, so export a PDF first if you want to keep a copy.",
      },
    ],
  },
  {
    id: "shifts",
    title: "Shifts",
    items: [
      {
        q: "How do I add a shift?",
        a: "Tap Add Shift from the home screen or the calendar. Enter your start, end, and break times. If you've set a default hourly rate in Settings, your pay is calculated automatically.",
      },
      {
        q: "What is Paint Mode?",
        a: "Paint Mode lets you pick a date range on the calendar and paste it onto another range in a single tap. You can also wipe any selected range clean with one gesture. It's the fastest way to fill in repeating weeks.",
      },
      {
        q: "How do templates work?",
        a: "Create a template for any shift type you repeat (e.g., Morning, 8am–2pm, $18/hr). When adding a shift, tap the template and the fields are pre-filled. Save them once, use them forever.",
      },
      {
        q: "Can I edit a shift after it's finished?",
        a: "Yes. Tap any shift in the calendar or the Shifts tab, then tap Edit. Update the times, rate, or notes — your earnings recalculate instantly.",
      },
    ],
  },
  {
    id: "earnings",
    title: "Earnings & reports",
    items: [
      {
        q: "How is my pay calculated?",
        a: "ShiftGo multiplies hours worked by your hourly rate, deducts unpaid breaks, and applies any overtime rules you've set. Fixed-rate shifts are added directly. Every number is visible and editable per shift.",
      },
      {
        q: "Can I set overtime rules?",
        a: "Yes. In Settings → Reports → Overtime, set your weekly threshold (e.g., 40 hours) and multiplier (e.g., 1.5×). Any hours beyond the threshold in a week are calculated at the overtime rate automatically.",
      },
      {
        q: "Where do I see my monthly totals?",
        a: "Open the Reports tab. Choose Weekly, Monthly, or a custom range. You'll see total earnings, hours worked, shift count, and an overtime breakdown — all in one place.",
      },
      {
        q: "How do I export a PDF?",
        a: "From the Reports tab, tap the Share icon and choose Export as PDF. Pick the date range and what's included, then save or share. PDF export is a Premium feature.",
      },
    ],
  },
  {
    id: "sync",
    title: "Calendar sync",
    items: [
      {
        q: "How do I sync my shifts to Google Calendar?",
        a: "Open Settings → Calendar sync → Google Calendar. Sign in, pick which calendar to write to, and toggle sync on. New and edited shifts appear in Google Calendar within a minute.",
      },
      {
        q: "How do I sync to Apple iCloud?",
        a: "Open Settings → Calendar sync → iCloud. Grant calendar access when prompted, choose the target calendar, and toggle sync on. Your shifts appear alongside your personal events.",
      },
      {
        q: "My shifts aren't showing up in Google Calendar.",
        a: "Make sure you're signed into the same Google account in ShiftGo and in Google Calendar. Toggle sync off and on in Settings → Calendar sync. If shifts still don't appear after a minute, contact support.",
      },
      {
        q: "Can I hide past shifts from my calendar?",
        a: "Yes. In Settings → Calendar sync → Sync window, pick a range (e.g., only sync the next 60 days). Older shifts stay inside ShiftGo but don't clutter your personal calendar.",
      },
    ],
  },
  {
    id: "notifications",
    title: "Notifications & troubleshooting",
    items: [
      {
        q: "How do I get a reminder before my shift?",
        a: "Open Settings → Notifications, turn on Pre-shift reminder, and pick how long before (5 min, 15 min, 30 min, 1 hour). ShiftGo will notify you automatically.",
      },
      {
        q: "I'm not getting any notifications.",
        a: "Check your phone's system notification settings for ShiftGo (Settings → Notifications → ShiftGo) and make sure Allow Notifications is on. If it still isn't working, try reinstalling the app — your data stays safe if you're signed in.",
      },
      {
        q: "The app crashes on launch.",
        a: "Force-quit the app and reopen it. If that doesn't help, restart your phone. As a last resort, delete and reinstall ShiftGo — your data is safely synced as long as you're signed in.",
      },
      {
        q: "My data is missing after switching phones.",
        a: "Make sure you're signed into the same account on both devices. Go to Settings → Account and check the email. If it's different, sign out and back in with the correct one — your shifts will reappear.",
      },
    ],
  },
];

export function HelpContent() {
  return (
    <article className="bg-[#fcfbff] py-20 md:py-28">
      <div className="mx-auto max-w-[1120px] px-5 lg:px-8">
        {/* Header */}
        <header className="max-w-[52ch]">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#7b4ba3]">
            Help Center
          </p>
          <h1 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.025em] text-[#17131f]">
            How can we help?
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-[#686276]">
            Answers to the most common questions about ShiftGo. If you don't
            find what you're looking for, email us directly —{" "}
            <a
              href="mailto:support@shiftgo.net"
              className="font-semibold text-[#341657] underline decoration-[#e8e0f1] decoration-1 underline-offset-4 hover:decoration-[#341657]"
            >
              support@shiftgo.net
            </a>
            .
          </p>
        </header>

        {/* Table of contents */}
        <nav
          aria-label="Help topics"
          className="mt-12 flex flex-wrap gap-2 md:gap-3"
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex items-center rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-[#341657] elev-1 ring-1 ring-[#ece7f2] transition-colors hover:bg-[#f4eeff] hover:ring-[#e8e0f1]"
            >
              {section.title}
            </a>
          ))}
        </nav>

        {/* Sections */}
        <div className="mt-20 space-y-24">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28"
            >
              <div className="grid gap-10 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:gap-14">
                <header>
                  <h2 className="text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-[#17131f] md:sticky md:top-28">
                    {section.title}
                  </h2>
                </header>

                <dl className="overflow-hidden rounded-[14px] border border-[#ece7f2] bg-white elev-1">
                  {section.items.map((item, i) => (
                    <div
                      key={item.q}
                      className={`p-6 md:p-8 ${i > 0 ? "border-t border-[#ece7f2]" : ""}`}
                    >
                      <dt className="text-[17px] font-semibold leading-snug text-[#17131f]">
                        {item.q}
                      </dt>
                      <dd className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-[#686276]">
                        {item.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          ))}
        </div>

        {/* Contact */}
        <aside className="mt-28 rounded-[14px] border border-[#e8e0f1] bg-[#f4eeff] p-10 md:p-14">
          <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#17131f]">
            Still need help?
          </h2>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-[#686276]">
            Email us and a real person will get back to you. We usually reply
            within one working day.
          </p>
          <a
            href="mailto:support@shiftgo.net"
            className="mt-8 inline-flex items-center rounded-full bg-[#341657] px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            support@shiftgo.net
          </a>
        </aside>
      </div>
    </article>
  );
}
