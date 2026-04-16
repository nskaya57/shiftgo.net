# shiftgo.net

Marketing/landing site for the ShiftGo shift-and-earnings tracker mobile app. Next.js 16 App Router + Tailwind v4 + next-intl (English only, no localization). Must feel like the same product as the app at [/Users/eneskaya/ShiftGo](/Users/eneskaya/ShiftGo).

## Structure

- `app/[locale]/` — all routable pages live under the locale segment
- `components/` — server components by default; client components marked `"use client"`
- `components/sections/` — top-level landing sections (hero, how-it-works, features, testimonials, faq, cta)
- `components/phone-mockup.tsx` — iPhone-frame screenshot container (falls back to placeholder if screenshot file missing)
- `components/store-badges.tsx` — App Store + Google Play badges (uses SVGs from `public/badges/`)
- `i18n/` — next-intl routing, navigation, and request config (single locale: `en`)
- `messages/en.json` — copy catalog (the only locale)
- `public/screenshots/` — app screenshots (see screenshot slot table below)
- `public/badges/` — store badge SVGs (placeholders; swap for official before launch)
- `app/globals.css` — Tailwind v4 `@theme` block with app design tokens (exact hex from mobile app)

## Design tokens live in CSS

Tailwind v4 reads tokens from `@theme` in [app/globals.css](app/globals.css). Do not add a `tailwind.config.ts`. Tokens use **exact hex values from the ShiftGo mobile app** ([ShiftGo/src/design-system/tokens/primitives.ts](/Users/eneskaya/ShiftGo/src/design-system/tokens/primitives.ts)), not OKLCH, so web ↔ app color parity is pixel-perfect.

Use hex directly in className like `bg-[#341657]` or `text-[#17131f]` for explicit brand fidelity. Utility classes `elev-1/2/3` (shadows) and `brand-gradient` (background) live in `@layer utilities` in globals.css.

## Font: Outfit only

The app uses Outfit (`@expo-google-fonts/outfit`) so the site uses **only Outfit** — weights 400/500/600/700. Loaded via `next/font/google` in [app/fonts.ts](app/fonts.ts). Hierarchy comes from weight + size + tracking, not multiple families. This is an intentional deviation from the Impeccable rule "don't use one font family" — brand parity with the app is the higher priority here.

## Download CTAs — badges only

No "İndir"/"Download" text buttons anywhere. The only download invitation is the **App Store + Google Play SVG badges** shown in the Hero and the final CTA section. The site header has navigation only.

Store badge SVGs in `public/badges/`:
- `app-store-en.svg`
- `google-play-en.svg`

(The `-tr` variants are legacy; the site only references the `-en` ones now.)

These are custom inline SVGs (placeholders). Swap for official assets from [developer.apple.com/app-store/marketing/guidelines](https://developer.apple.com/app-store/marketing/guidelines/) and [play.google.com/intl/en_us/badges](https://play.google.com/intl/en_us/badges/) before launch.

## Screenshot slots

The `PhoneMockup` component renders a phone frame with a screenshot inside — or a soft-purple placeholder with the alt text if the screenshot file is missing. The user fills in `public/screenshots/` over time.

| # | Location                    | File                                          | App screen                                |
|---|-----------------------------|-----------------------------------------------|-------------------------------------------|
| 1 | Hero                        | `home-active-shift.png`                       | Home Dashboard (active shift + live pay)  |
| 2 | How it works · Step 1       | `add-shift-modal.png`                         | Add Shift modal (half-filled)             |
| 3 | How it works · Step 2       | `home-weekly-summary.png`                     | Home Dashboard (weekly summary view)      |
| 4 | How it works · Step 3       | `reports-monthly.png`                         | Reports dashboard (monthly)               |
| 5 | Features · Takvim           | `calendar-month.png`                          | CalendarV2 monthly (multi-color shifts)   |
| 6 | Features · Otomatik maaş    | `auto-pay.png`                                | Auto pay + overtime calculation screen    |
| 7 | Features · Detaylı raporlama| `reports-monthly.png`                         | Reports dashboard (shared with Step 3)    |
| 8 | Features · PDF olarak paylaş| `pdf-share.png`                               | PDF export / share sheet                  |
| 9 | Features · Takvim senkronu  | `calendar-sync.png`                           | Google Calendar / iCloud sync setting     |
| 10| Features · Paint Mode       | `templates.png`                               | Paint Mode — templates + copy/paste/delete date ranges |
| 11| Features · Hatırlatıcı      | `reminders.png`                               | Reminders screen                          |

## Copy

English only. Match the mobile app's terminology exactly: "Add shift", "Earnings", "Shifts", "Reports". See [ShiftGo/src/locales/en.json](/Users/eneskaya/ShiftGo/src/locales/en.json) as the authoritative source for tone and vocabulary.

## Routing

- `/`, `/privacy`, `/terms` — single locale (`en`), `localePrefix: "never"` so URLs never show the locale prefix
- Proxy in [proxy.ts](proxy.ts) handles the next-intl rewrite (Next 16 renamed `middleware.ts`)

## Commands

```bash
npm run dev       # localhost:3000
npm run build
npm run start
```

## Design Context

See [.impeccable.md](.impeccable.md) for the full design brief. Core principles:

1. **Uygulama ile tam uyum** — same font, colors, radii, feel as the mobile app.
2. **Rakamlar hikâyeyi anlatır** — real screenshots, real numbers, no decorative sparklines.
3. **Saygı, heyecandan önce gelir** — calm, professional, no hype.
4. **Mobil, birinci sınıf vatandaştır** — mobile is not an afterthought.
5. **Türkçe, app ile birebir** — copy follows the app's actual terminology.
6. **İndirme çağrısı sadece rozetlerle** — no text download buttons, only official store badges.
