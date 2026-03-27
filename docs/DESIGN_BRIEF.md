# Design Brief: Kytchens Recruitment Web App

**Prepared by:** Product Team
**Date:** 25 March 2026
**Version:** 1.0

---

## 1. Project Overview

A mobile-first candidate screening web app for Kytchens — a cloud kitchen brand operating 45+ brands across 25+ kitchens in Mumbai and Pune. The app replaces initial HR screening calls by letting candidates self-screen through a guided conversational flow.

**Distribution:** Candidates scan a QR code (printed on kitchen banners, shared via WhatsApp) and land directly on the web app.

---

## 2. Target Audience

### Who are they?
- **Blue-collar kitchen staff** — freshers and experienced cooks in Mumbai
- Age range: 18–40
- Roles: Team Member, Senior Team Member, Kitchen Manager
- Low-end Android phones (₹5,000–₹15,000 range)
- 4G connections (often patchy)
- Comfortable with WhatsApp, YouTube, basic phone use
- Limited English literacy — can read basic product names but not paragraphs

### What do they care about?
- **Salary** — "Kitna milega?" is the first question
- **Location** — "Ghar se kitna door hai?"
- **Job security** — "Yeh pakka kaam hai?"
- **Growth** — "Aage badhne ka mauka milega?"
- **Respect** — They don't want to feel like they're filling a government form

### How do they behave digitally?
- Spend 3-4 hours daily on WhatsApp, YouTube, Instagram Reels
- Comfortable tapping large buttons, scrolling feeds
- Uncomfortable with long forms, small text, English-heavy interfaces
- Trust brands that look professional but feel approachable
- Will abandon anything that takes more than 30 seconds to load or feels confusing

---

## 3. User Journey

```
QR Code / WhatsApp Link
        │
        ▼
┌─────────────────────────┐
│   LANDING PAGE          │
│   - Salary cards        │
│   - "Apply Now" CTA     │
│   - "Refer & Earn" CTA  │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│   PHASE 1: BASIC INFO   │
│   - Name                │
│   - Phone               │
│   - Age                 │
│   - Looking for job?    │
│        │                │
│   No ──┼── Yes          │
│   │    │                │
│   ▼    ▼                │
│  Exit  Continue         │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│   SCREENING FLOW        │
│   (One question/screen) │
│   - Locality            │
│   - Experience duration │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│   INFO SCREENS          │
│   - About Kytchens      │
│   - Salary & Benefits   │
│   - Job expectations    │
│   - Training & Growth   │
│   - Career path         │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│   REVIEW & SUBMIT       │
│   - Summary of details  │
│   - Submit button       │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│   THANK YOU + WhatsApp   │
│   - Confirmation         │
│   - Next steps           │
│   - WhatsApp template    │
│     sent to candidate    │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│   FAQ (Persistent)       │
│   - Expandable accordion │
│   - WhatsApp HR chat btn │
└─────────────────────────┘
```

---

## 4. Brand Identity

### Brand Personality
**Bold. Energetic. Direct.**

Kytchens moves fast and talks straight. The interface should feel like a confident employer who respects your time — not a bureaucratic process.

### Voice & Tone
- **Language:** Hinglish (default), Hindi, Marathi — persistent toggle on every screen
- **Tone:** Friendly, direct, encouraging. Like a supportive senior colleague, not a corporate HR system
- **Examples:**
  - "Kytchens mei join karo!" (not "Apply for a position at Kytchens")
  - "Experience nahi hai? Koi baat nahi, hum train karenge!" (not "No experience required")
  - "Application Submit karo" (not "Submit your application")

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Kytchens Orange** | `#FF5500` | Primary CTA, accents, progress bar |
| **Cream Background** | `#FDF6F0` | Page background — warm, inviting |
| **White** | `#FFFFFF` | Cards, input fields |
| **Dark Text** | `#1A1A1A` | Headings, primary text |
| **Gray Text** | `#6B7280` | Secondary text, labels |
| **Success Green** | `#22C55E` | Confirmation states |
| **Error Red** | `#EF4444` | Validation errors |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headings | Poppins | 700 (Bold) | 24–28px |
| Body | DM Sans | 400 (Regular) | 16–18px |
| Labels | DM Sans | 500 (Medium) | 14px |
| Buttons | DM Sans | 600 (Semi-bold) | 16–18px |

### Design Tokens

| Token | Value |
|-------|-------|
| Border radius (cards) | 16px |
| Border radius (buttons) | 12px |
| Border radius (inputs) | 10px |
| Spacing unit | 8px |
| Card padding | 24px |
| Screen padding (horizontal) | 20px |
| Minimum tap target | 44px × 44px |
| Max content width | 480px |

---

## 5. Design Principles

### 1. Clarity Over Cleverness
Every screen should be instantly understood by someone with limited English literacy. Use simple language, large text, and obvious affordances. No clever UI patterns that require learning.

### 2. Speed Is Respect
Minimal page weight, fast loads on 4G, no unnecessary assets. Respecting the user's data plan and time. Target: page load < 3 seconds.

### 3. One Thing at a Time
Conversational, step-by-step flow. Never overwhelm with multiple questions or complex layouts. Each screen has one clear purpose and one clear action.

### 4. Touch-First Confidence
Large tap targets (min 44px), generous spacing, forgiving hit areas. Users should never mis-tap or feel uncertain about what to press.

### 5. Warm Professionalism
Bold and energetic but trustworthy. The orange energy is balanced by clean structure and reliable interactions. It should feel like a real company that takes you seriously.

---

## 6. Screen-by-Screen Specifications

### 6.1 Landing Page

**Purpose:** First impression. Convince the candidate this is a real, exciting opportunity worth 3 minutes of their time.

**Key Elements:**
- Kytchens logo + language toggle (top)
- Hero badge: "We're Hiring!"
- Salary cards showing ranges for each role level:
  - Team Member: ₹14,000+
  - Sr. Team Member: ₹17,000+
  - Kitchen Manager: ₹24,000+
- Benefits strip: Full Training | PF + ESIC | Career Growth | Incentives
- Primary CTA: "Apply Now" (large, gradient orange button)
- Secondary CTA: "Refer karo, ₹2,000 kamao!"
- Tertiary link: "Abhi nahi dhoondh rahe? Phir bhi connect karo"

**Design Notes:**
- Salary cards should be the visual anchor — this is what blue-collar workers care about most
- CTA button should be impossible to miss — full-width, high contrast, layered shadow
- Keep above the fold on a 360px screen: logo, salary, CTA

### 6.2 Phase 1: Basic Information

**Purpose:** Capture essential details. Quick and painless.

**Fields (single page):**
- Full Name (text input)
- Phone Number (numeric, 10 digits)
- Age (numeric, min 18)
- "Kya aap job dhundh rahe ho?" (Yes/No toggle)

**Design Notes:**
- Large input fields with clear labels above
- Phone number auto-format as user types
- Age validation: minimum 18 with inline error
- If "No" → soft exit screen with encouraging message
- Progress bar at top showing journey progress

### 6.3 Screening Flow (Step-by-Step)

**Purpose:** Gather screening data through a conversational, one-question-per-screen flow.

**Step 1 — Locality**
- Google Places Autocomplete input
- "Aap kaunsi area mei rehte ho?"
- Suggestions appear as user types

**Step 2 — Experience Duration**
- Single-select pill buttons
- Options: Fresher / <6 months / 6-12 months / 1-2 years / 2-5 years / 5+ years
- Large, easy-to-tap pill buttons in a 2-column grid

**Design Notes:**
- Each step has: question text, input/selection, Next button
- Back button always visible
- Progress bar updates with each step
- Smooth slide transition between steps

### 6.4 Info Screens (Post-Form)

**Purpose:** Sell the opportunity. Build excitement before they submit.

**Screen A — About Kytchens**
- Company overview with key stats (45+ brands, 25+ kitchens)
- Growth messaging

**Screen B — Salary & Benefits**
- Role-based salary cards (same as landing page)
- Benefits list: Incentive, Variable Pay, PF, ESIC, Attendance Bonus, Overtime

**Screen C — Job Expectations**
- What the daily work looks like
- 10-hour shifts, veg + non-veg, multiple brands
- Training provided

**Screen D — Career Growth**
- Visual career ladder:
  Team Member → Sr. Team Member → Assistant KM → Kitchen Manager → Sr. KM → Area Manager → City Head
- Cross-team growth options: Supply Chain, Kitchen Launch, Trainer, Corporate

**Design Notes:**
- Swipeable cards or "Next" button navigation
- Use icons/illustrations where possible
- Keep text minimal — bullet points, not paragraphs

### 6.5 Review & Submit

**Purpose:** Let the candidate verify their details before submitting.

**Elements:**
- Summary card showing all entered data
- "Back" button to make changes
- "Application Submit karo" (primary CTA)
- Loading state: "Submit ho raha hai..."
- Error state with retry: "Kuch gadbad ho gayi. Phir se try karo"

### 6.6 Thank You / Confirmation

**Purpose:** Confirm submission, set expectations, keep engagement.

**Elements:**
- Success animation/icon
- "Application submitted, thank you!"
- Next steps:
  1. HR team 24-48 hours mein call karegi
  2. In-person interview hoga
  3. Select hone par joining date milegi
- "Details apne WhatsApp par bhejo" button
- "HR se WhatsApp par baat kijiye" button

**Post-Submit Action:**
- WhatsApp Business API sends `application_status` template message to candidate
- Template includes: candidate name, confirmation text, referral CTA

### 6.7 FAQ Section

**Purpose:** Answer common questions without needing HR.

**Format:** Expandable accordion
- Kaam mein kya karna hoga?
- Kya khana aur rehna milega?
- Shift ka time kya hoga?
- Travel mein dikkat ho toh?

**Bottom CTA:** WhatsApp button to chat with HR directly

---

## 7. Interaction & Motion

| Interaction | Specification |
|-------------|---------------|
| Page transitions | Slide left/right (150ms ease-out) |
| Button press | Scale down to 0.97 + slight shadow change |
| Card entrance | Staggered fade-up (50ms delay between items) |
| Progress bar | Smooth width transition (300ms) |
| Error shake | Horizontal shake animation on validation fail |
| Success | Checkmark with scale-up bounce |
| Loading | Pulse animation on submit button |

---

## 8. Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| **360px** (primary) | Single column, full-width cards, stacked layout |
| **390–428px** | Slight padding increase, same layout |
| **768px+** | Max-width container (480px), centered. Desktop is not a target but should look clean |

**Critical:** Design for 360px Android first. Everything else scales up.

---

## 9. Accessibility & Performance

### Accessibility
- Minimum tap target: 44px × 44px
- Color contrast ratio: 4.5:1 minimum for text
- Focus states visible on all interactive elements
- Form inputs have associated labels
- Error messages are descriptive and in the selected language

### Performance Targets
- First Contentful Paint: < 1.5s on 4G
- Largest Contentful Paint: < 2.5s on 4G
- Total page weight: < 500KB
- No unnecessary JavaScript libraries
- Images optimized (WebP, lazy-loaded)
- Fonts: subset to required characters only

---

## 10. WhatsApp Integration

### QR Code → Web App
- QR codes on kitchen banners link directly to the web app URL
- URL includes UTM parameters for tracking source: `?utm_source=qr&utm_location=K001`

### Post-Submit WhatsApp Template
- **Template name:** `application_status`
- **Trigger:** Automatically sent after successful form submission
- **Parameters:** `{{1}}` = Candidate name
- **Content:** Confirmation message with next steps and referral CTA

### HR Chat Button
- Opens WhatsApp to HR number with pre-filled message
- "Hi, maine recruitment form bhara hai aur mera ek sawaal hai."

---

## 11. Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Hosting | Vercel |
| Location Input | Google Places Autocomplete |
| WhatsApp Confirmation | Meta Cloud API (WhatsApp Business) |
| Internationalization | Static JSON translation files (3 languages) |
| Fonts | Poppins (headings) + DM Sans (body) via Google Fonts |

---

## 12. Success Metrics

| Metric | Target |
|--------|--------|
| Form completion rate | > 60% of visitors |
| Page load time (4G) | < 3 seconds |
| HR screening call reduction | 50%+ |
| Qualified lead rate | > 40% of submissions |
| Time to first HR contact | < 48 hours |

---

## 13. What This App Must NEVER Feel Like

- A government form (dense, intimidating, small text)
- A corporate job portal (formal, English-heavy, complex navigation)
- A generic Google Form (ugly, no branding, no personality)
- A slow, heavy website (spinners, loading screens, laggy interactions)

**It MUST feel like:**
- Chatting with a friendly employer on WhatsApp
- Quick, easy, respectful of your time
- A real company that's excited to hire you
- Something you'd share with a friend looking for work
