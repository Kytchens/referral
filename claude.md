# CLAUDE.md — recruitment-web-app

## What This Is

Mobile-first candidate screening form for a cloud kitchen startup (Mumbai). Replaces HR screening calls. Candidates access via WhatsApp link/QR code, fill a conversational step-by-step flow, data goes to Google Sheet. Target users: blue-collar kitchen staff with limited English literacy.

## Tech Stack

Next.js (App Router), TypeScript strict, Tailwind CSS, Vercel, Google Sheets API, Google Places Autocomplete. No database, no auth for V1.

## Commands

- `npm run dev` — Dev server (port 3000)
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — Type check

## Hard Rules

- All user-facing strings must come from translation JSON files (`/lib/i18n/`). NEVER hardcode text in components.
- 3 languages: Hinglish (default), Hindi, Marathi. Language toggle must be persistent on every screen.
- Mobile-first always. Design for 360px Android on 4G. Page load < 3 seconds.
- All form paths — including declined candidates — must save data to Google Sheet.
- Kitchen locations list lives in `/lib/config/kitchens.ts`. Must be editable without touching components.
- NEVER commit `.env` files. API keys go in `.env.local`.

## Key Reference

- Full PRD with flow logic, branching, salary ranges, translation tables, and FAQ content: `@docs/PRD.md`

## Design Context

### Users
Blue-collar kitchen staff in Mumbai — freshers and experienced cooks. They access the form via WhatsApp links on low-end Android phones over 4G. Comfortable with WhatsApp and basic smartphone use, but limited English literacy. They need a flow that feels as easy as chatting, not filling out a government form.

### Brand Personality
**Bold, Energetic, Direct.** Kytchens is a high-energy cloud kitchen brand that moves fast and communicates clearly. The interface should feel like talking to a confident employer who respects your time.

### Emotional Goals
- **Excitement & Opportunity** — "This job sounds great, I want to apply right now!"
- **Confidence & Trust** — "This is a real company, I feel safe sharing my info"

### Aesthetic Direction
- **Visual tone:** Warm, modern, high-contrast. Orange (#FF5500) on cream (#FDF6F0). Inter font. Generous rounded corners (20px). Gradient CTAs with layered shadows.
- **Feel:** Conversational and app-like, not form-like. One question per screen. Big tap targets, clear hierarchy.
- **Anti-reference:** Must NEVER feel like a government form — no dense layouts, no tiny text, no intimidating walls of fields.
- **Theme:** Light mode only. Frosted glass header/footer. Staggered entrance animations.

### Design Principles
1. **Clarity over cleverness** — Every screen should be instantly understood by someone with limited English literacy. Use simple language, large text, and obvious affordances.
2. **Speed is respect** — Minimal page weight, fast loads on 4G, no unnecessary assets. Respecting the user's data plan and time.
3. **One thing at a time** — Conversational, step-by-step flow. Never overwhelm with multiple questions or complex layouts.
4. **Touch-first confidence** — Large tap targets (min 44px), generous spacing, forgiving hit areas. Users should never mis-tap or feel uncertain about what to press.
5. **Warm professionalism** — Bold and energetic but trustworthy. The orange energy is balanced by clean structure and reliable interactions.