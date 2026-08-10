# SubDrip — Marketing Website

Marketing site for the SubDrip app (formerly "Subscription Spend Analyzer" in the design files), built from the design
handoff in [`../design/design_handoff_website/`](../design/design_handoff_website/)
(visual source of truth: `design/Subscription Spend Analyzer - standalone.html`).

**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4 base. All design
values (oklch colors, radii, shadows, type scale, copy) are ported literally from
the design files. Every route is statically prerendered (static-export friendly,
no CMS, no backend).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — all 9 routes prerender statically
npm run lint
```

## Routes

| Route | Content |
|---|---|
| `/` | Hero (phone carousel + floating pills), Problem, How it works, Payoff (currency toggle), What's inside, Privacy, FAQ preview, Private-beta band |
| `/how-it-works` | 3 numbered steps with side panels |
| `/demo` | Interactive phone mockup with jump-to chips + working tab bar |
| `/features` | Alternating text/phone rows (7 features) |
| `/privacy` | Pillars + accordion sections |
| `/data-deletion` | Two deletion routes, deleted/retained lists |
| `/faq` | Category filter chips + accordion |
| `/support` | Validated contact form + quick links |
| `/download` | Early-access CTA, store placeholders, screenshot row |

## Component structure

```
src/
├── app/                        # One folder per route; page.tsx holds metadata,
│   │                           # *Content.tsx is the client component when the
│   │                           # page is interactive
│   ├── layout.tsx              # Fonts (next/font: Sora + Work Sans), Header,
│   │                           # Footer, CurrencyProvider
│   └── globals.css             # Keyframes + the design's complete responsive
│                               # spec (data-r attribute media queries, ported
│                               # verbatim) + hover/focus helper classes
├── components/
│   ├── Header.tsx              # Sticky blur header, desktop nav, burger drawer
│   ├── Footer.tsx
│   ├── Logo.tsx                # SubDrip drip mark, pure SVG (32 / 30 / 64 px)
│   ├── WaitlistForm.tsx        # light/dark tones, left/center align, validation
│   ├── CatalogDemo.tsx         # 4-step catalog quick-add walkthrough
│   ├── home/                   # Home page sections
│   └── phone/
│       ├── HeroPhone.tsx       # 300px marketing phone, 9 screen variants,
│       │                       # currency-aware (used on /, /features, /download)
│       └── DemoPhone.tsx       # 412px app mockup for /demo — 8 static screens
│                               # with a working bottom tab bar
└── lib/
    ├── brand.ts                # ★ Brand constants: name, tagline, emails,
    │                           #   copy, color tokens, nav/footer links
    ├── siteData.ts             # All page copy, verbatim from the design
    ├── appData.ts              # /demo sample data (ported from AppDemo.dc.html,
    │                           #   frozen "today" = 2026-07-11, INR)
    └── currency.tsx            # Shared INR/USD context (toggle lives in the
                                #   home Payoff section; changes prices site-wide)
```

## Where the form endpoints plug in

- **Waitlist** — [`src/components/WaitlistForm.tsx`](src/components/WaitlistForm.tsx)
  posts to the built-in [`/api/waitlist`](src/app/api/waitlist/route.ts) route,
  which stores signups in the project's existing cloud Postgres
  (`waitlist_emails` table — created automatically on first insert; emails are
  lowercased and deduped with `ON CONFLICT DO NOTHING`). Set `DATABASE_URL` in
  `.env.local` (same value as `backend/.env`). `NEXT_PUBLIC_WAITLIST_ENDPOINT`
  overrides the target if you ever want an external service instead.
- **Support** — `NEXT_PUBLIC_SUPPORT_ENDPOINT`, posted from
  [`src/app/support/SupportContent.tsx`](src/app/support/SupportContent.tsx);
  falls back to a local no-op success state when unset.

Because of the API route, deploy the site on a Node host (Vercel, `next start`,
etc.) rather than as a pure static export. Every page is still statically
prerendered.

## Notes

- Animations (`fadeUp`, `softIn`, `pulseRing`, `scanSpin`, `pillFloat`,
  `growBar`) are ported verbatim and fully disabled under
  `prefers-reduced-motion: reduce`.
- The responsive behavior is driven by the design's own `data-r` attribute
  system in `globals.css` — breakpoints at 1040 / 980 / 900 / 760 / 560 px.
- Verified at 375 / 768 / 1440 with no console errors and no horizontal
  overflow on any route.
