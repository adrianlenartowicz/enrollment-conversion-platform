# ALA Wroclaw - Landing Page & Lead Funnel

> Lead-generation website and online sign-up flow for a youth athletics academy, built to replace ad-hoc phone/email intake with a structured, trackable process.

[Live Site](https://alawroc.pl)

## Tech Stack

Angular 17 | TypeScript | RxJS | Tailwind CSS | Angular Prerender (SSG) | Web3Forms | Cloudflare Workers | GTM | Meta Pixel

## Key Features

- **Reliable lead capture flow** - validated signup form with dual submission channels (Web3Forms + HubSpot via Cloudflare Worker) to reduce drop-off from transient failures
- **Operational follow-up workflow** - dedicated confirmation page for first training date using tokenized links, built for real-world coach/admin coordination
- **Conversion analytics with consent control** - GTM + Meta Pixel events integrated with cookie consent gating to track outcomes without bypassing privacy choices; core tag initialization (including Meta Pixel / Google Ads conversion tracking) is managed in GTM
- **SEO-ready page model** - prerendered key routes plus per-page meta/Open Graph tags for discoverability and link previews
- **Mobile-first conversion UX** - sticky mobile CTA, phone-click tracking, and streamlined form interactions tuned for paid/social traffic

## Technical Decisions

**Dual submission path for lead capture reliability**
- Form submissions are sent through two independent channels (Web3Forms + HubSpot via Cloudflare Worker), so one upstream outage does not block lead intake.

**Consent-first analytics bootstrap**
- Tracking is initialized with denied ad/analytics storage and only upgraded after explicit cookie consent, keeping attribution logic aligned with privacy requirements. Core tracking tags are initialized and managed via GTM.

**Prerender with explicit route list**
- SEO-critical pages are prerendered from a maintained `routes.txt` file instead of auto-discovery, which keeps build output deterministic and avoids accidental indexing gaps.

## Local Setup

Requirements:
- Node.js 20+
- npm

Install:

```bash
npm install
```

Run in development:

```bash
npm start
```

Build:

```bash
npm run build
```

Production build (includes `environment.ts` generation):

```bash
npm run build:prod
```

Tests:

```bash
npm test
```

## Form Configuration (Web3Forms)

`build:prod` runs a script that generates `src/environments/environment.ts` using `ACCESS_KEY`.

Option 1: create `src/environments/.env`

```env
ACCESS_KEY=your_web3forms_key
```

Option 2: provide `ACCESS_KEY` as an environment variable.

If the key is missing, the Web3Forms channel is skipped and the form still attempts submission through the Cloudflare Worker endpoint.

## Deployment

Current production deployment:
- build static files locally (`dist/browser`)
- upload files manually to the hosting connected to the production domain
- production runs as static hosting with prerendered pages (no Node/Express runtime)

Legacy pipeline:
- the repository still contains an older automatic Pages-style deployment workflow
- it is no longer the source of truth for the live domain
