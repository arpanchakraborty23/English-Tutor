# Language Tutor App — Landing Page Design Document

> Professional landing page reference guide.
> Inspired by top AI SaaS landing pages (Final Round AI, Notion AI, Jasper).
> Dark premium theme · Conversion-focused · 8 sections.

---

## Design Direction

**Aesthetic:** Dark premium SaaS — deep navy background, sharp typographic hierarchy, vibrant teal accent, editorial confidence. Think: "the Duolingo that grew up."

**Tone:** Smart, warm, ambitious. Not childish. Not corporate. The page should feel like it was made for someone who takes language learning seriously.

**One thing they'll remember:** The hero — an animated language switching effect that shows the product *working* before they even click anything.

---

## Design System

### Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Midnight | `#0A0E1A` | Page background, dark sections |
| Surface | Deep Navy | `#111827` | Cards, navbar, footer |
| Surface 2 | Slate | `#1E2A3B` | Feature cards, input backgrounds |
| Primary Accent | Teal | `#00D4AA` | CTAs, highlights, hover states |
| Accent Glow | Teal soft | `#00D4AA1A` | Glow effects, hover bg |
| Text Primary | White | `#F8FAFC` | Headlines, nav links |
| Text Secondary | Silver | `#94A3B8` | Body text, subtitles |
| Text Muted | Slate | `#475569` | Labels, captions |
| Border | Glass | `#FFFFFF12` | Card borders, dividers |
| Success | Emerald | `#10B981` | Correct answers, badges |
| Warning | Amber | `#F59E0B` | Streak, XP indicators |

### Typography

| Role | Font | Weight | Size (desktop) | Size (mobile) |
|------|------|--------|----------------|---------------|
| Display / Hero | `Sora` | 700 | 72px / 5rem | 40px |
| Section heading | `Sora` | 600 | 44px / 2.75rem | 30px |
| Sub-heading | `Sora` | 500 | 24px | 20px |
| Body | `DM Sans` | 400 | 18px | 16px |
| Body small | `DM Sans` | 400 | 15px | 14px |
| Label / Badge | `DM Mono` | 500 | 12px | 12px |
| Navigation | `DM Sans` | 500 | 15px | 15px |

**Google Fonts import:**
```
https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500&family=DM+Mono:wght@500&display=swap
```

### Spacing System (8px base)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 8px | Icon padding, tight gaps |
| `--space-sm` | 16px | Component internal gaps |
| `--space-md` | 24px | Card padding |
| `--space-lg` | 48px | Section padding (mobile) |
| `--space-xl` | 80px | Section padding (desktop) |
| `--space-2xl` | 128px | Between major sections |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Badges, tags, small pills |
| `--radius-md` | 12px | Buttons, input fields |
| `--radius-lg` | 16px | Cards |
| `--radius-xl` | 24px | Feature panels, hero card |
| `--radius-full` | 9999px | Avatar circles, pill CTAs |

### CSS Variables (Root)

```css
:root {
  --bg:         #0A0E1A;
  --surface:    #111827;
  --surface-2:  #1E2A3B;
  --accent:     #00D4AA;
  --accent-glow:#00D4AA1A;
  --text:       #F8FAFC;
  --text-2:     #94A3B8;
  --text-3:     #475569;
  --border:     #FFFFFF12;
  --success:    #10B981;
  --warning:    #F59E0B;
  --font-display: 'Sora', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'DM Mono', monospace;
}
```

---

## Page Layout — 8 Sections

### Section 1 · Navbar

**Layout:** Fixed top, full-width, blur backdrop, bottom border `1px solid var(--border)`

| Element | Details |
|---------|---------|
| Logo | Left — small flag + "LinguaAI" wordmark in Sora 600 |
| Nav links | Center — Features · How it works · Languages · Pricing |
| CTA area | Right — "Log in" (ghost) + "Start for free →" (filled teal button) |
| Mobile | Hamburger menu, links stack vertically in a drawer |

**Webflow:** Use a Navbar component. Set position to `Fixed`, add `backdrop-filter: blur(12px)` via custom CSS, set background to `rgba(10, 14, 26, 0.8)`.

**Scroll behavior:** At scroll 0 = fully transparent navbar. After scrolling 60px = background appears with blur transition (CSS class toggle via JS).

---

### Section 2 · Hero

**Layout:** Centered, full viewport height (`100vh`), dark mesh background

```
┌────────────────────────────────────────────────────┐
│  [Trust badge]  ★ Trusted by 50,000+ learners      │
│                                                      │
│  Learn [Spanish] naturally                          │
│  with AI that adapts to you                         │
│                                                      │
│  [Subtitle — 1 line]                                │
│                                                      │
│  [Start for free →]  [Watch demo ▶]                 │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │          App UI preview / mockup             │   │
│  │    (floating card showing a lesson screen)   │   │
│  └──────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────┘
```

**Copy:**

| Element | Text |
|---------|------|
| Trust badge | `★ Trusted by 50,000+ language learners worldwide` |
| Headline line 1 | `Learn` **[rotating language]** `naturally` |
| Headline line 2 | `with AI that adapts to you` |
| Subtitle | `Personalised lessons, real conversations, and a tutor that never gets tired — available 24/7.` |
| CTA primary | `Start for free →` |
| CTA secondary | `▶ Watch 2-min demo` |

**The rotating language effect:**
The word in brackets cycles through: `Spanish → Japanese → French → Mandarin → Arabic → German → Portuguese` — fade or slide animation, every 2.5 seconds. This is the #1 memorable moment on the page.

**Background:**
- Base: `#0A0E1A`
- Radial gradient orbs: one teal `rgba(0, 212, 170, 0.12)` top-left, one purple `rgba(99, 102, 241, 0.08)` bottom-right
- Subtle noise texture overlay (5% opacity SVG filter)

**App preview card:**
A floating card showing a mock lesson UI (multiple choice exercise). Give it `box-shadow: 0 40px 80px rgba(0,0,0,0.6)` and a very slight rotation (`transform: rotate(-1.5deg)`). Add a subtle floating animation (CSS keyframe, 6s loop, 8px vertical travel).

**Webflow implementation:**
- Hero section: `min-height: 100vh`, flexbox centered column
- Language rotator: add each language as a `<span>` with `display: none`, toggle active class with JS `setInterval`
- App preview: place in a Div Block, add CSS class for float animation via custom code embed

---

### Section 3 · Social Proof / Logos

**Layout:** Centered, minimal — just a label and a horizontally scrolling logo strip

```
┌─────────────────────────────────────────────────────┐
│  Used by learners from companies including:          │
│                                                      │
│  [Google]  [Microsoft]  [Amazon]  [Spotify]  [Meta] │
│            (+ infinite scroll or fade out edges)     │
└─────────────────────────────────────────────────────┘
```

**Design:**
- Logos displayed in white at 40% opacity (monochrome)
- Hover raises opacity to 80%
- On desktop: static row
- On mobile: marquee (auto-scrolling left)

---

### Section 4 · Problem → Solution (The "Why")

**Layout:** Two-column split — left = problem, right = solution — separated by a thin vertical rule

**Left column — Before (Problem):**
```
❌  Expensive private tutors ($40–80/hr)
❌  Boring apps with no real conversation
❌  One-size-fits-all lessons that ignore your level
❌  No flexibility — fixed schedules
❌  Zero feedback on your pronunciation
```

**Right column — After (Solution):**
```
✅  AI tutor available 24/7, completely free to start
✅  Real conversations that adapt to your vocabulary
✅  Personalised from day one based on your level & goals
✅  5 minutes or 50 — learn on your schedule
✅  Instant feedback on every answer, every session
```

**Design details:**
- Section label above: `WHY LINGUAAI` in DM Mono, teal, uppercase, letter-spacing
- Left column has a very subtle red-tinted surface bg; right has teal-tinted
- Divider: 1px vertical line with gradient fade top and bottom

---

### Section 5 · Features (Core Value Props)

**Layout:** 3-column card grid on desktop, 1-column stacked on mobile

**Section header:**
- Label: `FEATURES`
- Headline: `Everything you need to go from beginner to fluent`
- Subtitle: `Built around how humans actually learn languages — not textbooks.`

**Feature cards (6 total, 2 rows × 3):**

| Icon | Headline | Body |
|------|----------|------|
| 🧠 | AI-powered personalisation | Lessons rebuild themselves around what you struggle with. The more you practice, the smarter it gets. |
| 💬 | Real conversation practice | Chat with an AI tutor in your target language. No judgement, no rushing — just real dialogue. |
| 📊 | Proficiency tracking | See exactly where you are on the A1–C2 scale, updated after every lesson. |
| 🎯 | Goal-based learning | Whether you're prepping for a business meeting or a holiday, your curriculum adapts to your purpose. |
| 🔔 | Daily streaks & reminders | Stay consistent with streak tracking, XP rewards, and gentle nudges at the time you choose. |
| 🌍 | 40+ languages | From Spanish and Mandarin to Swahili and Bengali — every language taught with the same depth. |

**Card design:**
- Background: `var(--surface-2)`
- Border: `1px solid var(--border)`
- Border-radius: 16px
- Icon area: teal icon on a `var(--accent-glow)` rounded square bg
- Hover: border color shifts to `rgba(0, 212, 170, 0.4)`, slight translateY(-4px)
- One card (AI personalisation) is "featured" — spans full width, has a teal left border accent, and includes a small inline animation or screenshot

---

### Section 6 · How It Works

**Layout:** Numbered vertical timeline on desktop (left step number, right content), stacked on mobile

**Section header:**
- Label: `HOW IT WORKS`
- Headline: `From zero to conversational in 4 steps`

**Steps:**

```
① Sign up in 60 seconds
  Create your account, tell us what language you want to learn,
  your current level, and how much time you have each day.
  → [visual: onboarding wizard screen]

② We build your personalised path
  Our AI analyses your profile and creates a curriculum just for you —
  vocabulary, grammar, conversation topics based on your goal.
  → [visual: curriculum/path screen]

③ Learn through daily lessons
  Complete short, interactive lessons — multiple choice, fill-in-the-blank,
  translation, and real conversation with the AI tutor.
  → [visual: lesson screen with multiple choice]

④ Track your progress & stay motivated
  Watch your level climb, maintain your streak, and unlock achievements
  as you hit milestones on your journey to fluency.
  → [visual: progress/stats screen]
```

**Design:**
- Left side: large step number in Sora 700, 96px, teal, very low opacity (0.15) — acts as a decorative element
- Right side: headline + body + screenshot or mockup
- Connecting line between steps: 1px dashed `var(--border)` running vertically
- Each screenshot floats in a dark card with a subtle shadow, slight tilt alternating left/right

---

### Section 7 · Testimonials

**Layout:** Horizontal scrollable row of 5 testimonial cards (or 3-column masonry on desktop)

**Section header:**
- Label: `WHAT LEARNERS SAY`
- Headline: `Real people. Real progress.`

**Each testimonial card contains:**
- Star rating (★★★★★)
- Quote text (2–3 sentences max)
- Avatar initials circle + name + location + flag

**Sample testimonials:**

> *"I tried Duolingo for a year and barely got past basic phrases. Three months with LinguaAI and I held a real conversation with my Japanese colleague. The AI tutor actually explains the 'why' behind grammar."*
> — **Priya S.** · Bengaluru, India 🇮🇳

> *"The professional track was exactly what I needed. It taught me how to write business emails in French, not just 'where is the bathroom.' I got the job posting I wanted within 6 months."*
> — **Marcus T.** · Toronto, Canada 🇨🇦

> *"I learn 15 minutes a day during my commute. The streak feature keeps me honest. I haven't missed a day in 4 months."*
> — **Aigerim K.** · Almaty, Kazakhstan 🇰🇿

**Card design:**
- Background: `var(--surface)`
- Top border accent: 2px teal top edge
- Quote in DM Sans 400, 16px, `var(--text-2)`
- Avatar circle: teal bg, white initials
- Star icons: amber `#F59E0B`

---

### Section 8 · Pricing

**Layout:** 3-column card row, center card is "highlighted" (most popular)

**Section header:**
- Label: `PRICING`
- Headline: `Start free. Upgrade when you're ready.`
- Subtitle: `No credit card required to get started.`

| Plan | Price | For |
|------|-------|-----|
| **Free** | $0/mo | Casual learners — 1 language, 5 lessons/day, basic AI tutor |
| **Pro** ⭐ | $9.99/mo | Serious learners — unlimited lessons, all languages, conversation AI, progress analytics |
| **Teams** | $7/user/mo | Companies — bulk seats, admin dashboard, business vocabulary tracks |

**Pro card design (featured):**
- Background: gradient — `linear-gradient(135deg, #0F2027, #1E3A2F)`
- Border: `1px solid rgba(0, 212, 170, 0.4)`
- "Most popular" badge: teal pill above the card
- Slightly taller card with a `transform: scale(1.04)` to lift it

**Each card includes:**
- Plan name + price + billing period
- 1-line description
- Feature list (5–6 bullets with ✓ checkmarks)
- CTA button
- Money-back guarantee note on Pro

---

### Section 9 · Final CTA (Bottom of page)

**Layout:** Full-width dark panel with centered content and a radial glow

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│       Ready to start speaking a new language?        │
│                                                      │
│   Join 50,000+ learners already on their journey    │
│                                                      │
│            [Start learning for free →]               │
│                                                      │
│         No credit card · Cancel anytime              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Design:**
- Background: `var(--surface)` with a large radial teal glow at center (very low opacity)
- Headline: Sora 700, 48px, white
- Subtitle: DM Sans, 18px, `var(--text-2)`
- CTA button: large, teal fill, Sora 600, 18px, pill-shaped (`border-radius: 9999px`), hover = slight scale + glow shadow
- Fine print: DM Mono, 12px, `var(--text-3)`

---

### Section 10 · Footer

**Layout:** 4-column grid + bottom bar

| Column | Links |
|--------|-------|
| Brand | Logo + 1-line tagline + social icons (Twitter/X, LinkedIn, Instagram) |
| Product | Features · How it works · Pricing · Changelog · API |
| Company | About · Blog · Careers · Press · Contact |
| Legal | Privacy Policy · Terms of Service · Cookie Settings · GDPR |

**Bottom bar:** Copyright notice + language selector dropdown (for the marketing site locale)

**Design:**
- Background: `var(--surface)`
- Top border: `1px solid var(--border)`
- All links: `var(--text-3)`, hover = `var(--text)` with underline
- Social icons: 32px circles, border `var(--border)`, hover = teal border

---

## Webflow-Specific Implementation Notes

### Project Setup
1. Create new Webflow project → Blank canvas
2. Set body background to `#0A0E1A`, overflow-x hidden
3. Import fonts via `<link>` in Project Settings → Custom Code → `<head>`
4. Define all CSS variables in the body via a `<style>` embed in the head

### Webflow Classes to Create

| Class | Purpose |
|-------|---------|
| `.section` | Base section — `width: 100%`, `padding: 80px 0` |
| `.container` | `max-width: 1200px`, `margin: 0 auto`, `padding: 0 24px` |
| `.section-label` | DM Mono, 12px, teal, uppercase, letter-spacing 0.12em |
| `.card` | surface-2 bg, border, radius-lg, padding 24px |
| `.card-hover` | transition + hover translate + border color |
| `.btn-primary` | Teal bg, dark text, Sora 600, radius-md, padding 14px 28px |
| `.btn-ghost` | Transparent, white border, white text, same sizing |
| `.text-gradient` | `background-clip: text`, teal→purple gradient for accent words |

### Interactions to Build in Webflow

| Interaction | Trigger | Effect |
|-------------|---------|--------|
| Navbar scroll | Page scroll > 60px | Add class `nav-scrolled` → blur + bg appears |
| Section reveal | Scroll into view | Fade up + opacity 0→1, stagger children |
| Feature card hover | Mouse over | translateY(-4px) + border color change |
| Language rotator | Page load | JS setInterval cycling spans |
| App preview float | Page load | CSS @keyframes infinite float |
| Pricing toggle | Click | Monthly / Annual toggle (save 20% badge appears) |

### Mobile Breakpoints

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Desktop | 1280px+ | Full layout as described above |
| Tablet | 768–1279px | 2-column grids, smaller typography |
| Mobile | < 768px | Single column, 40px hero font, hamburger nav |

### Webflow SEO Settings

| Field | Value |
|-------|-------|
| Page title | `LinguaAI — Learn Any Language with AI` |
| Meta description | `Personalised AI language tutor that adapts to your level, goals, and schedule. Learn Spanish, Japanese, French and 40+ more languages. Start free.` |
| OG image | Dark hero with language flag icons (1200×630px) |
| Favicon | App icon — small flag/speech bubble combo |

---

## Animations Reference

### Hero Language Rotator (JavaScript)

```javascript
const words = ['Spanish', 'Japanese', 'French', 'Mandarin', 'Arabic', 'German', 'Portuguese'];
let index = 0;
const el = document.getElementById('rotating-word');

setInterval(() => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(-8px)';
  setTimeout(() => {
    index = (index + 1) % words.length;
    el.textContent = words[index];
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 300);
}, 2500);
```

CSS for the element:
```css
#rotating-word {
  color: var(--accent);
  transition: opacity 0.3s ease, transform 0.3s ease;
  display: inline-block;
}
```

### App Preview Float Animation

```css
@keyframes float {
  0%, 100% { transform: rotate(-1.5deg) translateY(0px); }
  50%       { transform: rotate(-1.5deg) translateY(-10px); }
}

.app-preview {
  animation: float 6s ease-in-out infinite;
}
```

### Section Reveal (Intersection Observer)

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger children */
.reveal:nth-child(2) { transition-delay: 0.1s; }
.reveal:nth-child(3) { transition-delay: 0.2s; }
.reveal:nth-child(4) { transition-delay: 0.3s; }
```

---

## Copy Cheat Sheet

| Section | Headline | CTA |
|---------|----------|-----|
| Hero | Learn [Language] naturally, with AI that adapts to you | Start for free → |
| Features | Everything you need to go from beginner to fluent | — |
| How it works | From zero to conversational in 4 steps | — |
| Testimonials | Real people. Real progress. | — |
| Pricing | Start free. Upgrade when you're ready. | Get started |
| Final CTA | Ready to start speaking a new language? | Start learning for free → |

---

## Assets Needed

| Asset | Size | Notes |
|-------|------|-------|
| Logo (SVG) | — | Wordmark + icon version |
| Hero app mockup | 1200×800px | Dark UI, lesson screen showing multiple choice |
| OG image | 1200×630px | For social sharing previews |
| Favicon | 32×32px, 512×512px | PNG + SVG |
| Step screenshots (×4) | 800×500px | Onboarding, curriculum, lesson, stats screens |
| Testimonial avatars | 80×80px | Can be initials circles if no real photos |
| Company logos (social proof) | SVG | Google, Microsoft, etc. — white monochrome |
| Background noise texture | Tileable PNG | 5% opacity overlay for depth |

---

## Reference Sites to Study

| Site | What to study |
|------|--------------|
| `finalroundai.com` | Hero section, feature cards, dark premium tone |
| `notion.so` | Simplicity, how they handle the product screenshot |
| `jasper.ai` | Pricing section layout, trust signals |
| `framer.com` | Motion and animation quality |
| `linear.app` | Typography hierarchy, dark elegance |
| `clerk.com` | Feature cards, CTA sections |

---

*Language Tutor App · Landing Page Design Document · Phase 1 Reference*
