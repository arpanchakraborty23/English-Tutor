# Language Tutor App — Frontend Build Guide

> A phased approach to building the frontend cleanly, without starting over.
> Follow phases in order — each one creates the foundation for the next.

---

## The Golden Rule

**Lock in your design system (Phase 1) before building any feature UI.**  
Colors, fonts, spacing, dark mode — change these later and you break everything.

---

## Phase 1 · Landing Page + Theme System

**Goal:** Build the public face of the app and establish your design system.

### Screens to Build

| Screen | What it contains |
|--------|-----------------|
| Landing page | Hero, features section, language showcase, CTA buttons, footer |
| Settings shell | Settings layout with sidebar nav, theme toggle (light/dark), language/font preferences |

### Build Order
1. Define CSS variables — colors, fonts, spacing, border-radius — as a global `:root` block
2. Build the **theme toggle** (light/dark) early; it's easier to add now than retrofit later
3. Create reusable button, card, and input components in your component file
4. Build the landing page using real language names and flag emojis in the hero
5. Build the settings page layout (doesn't need to be functional yet — just the shell)

### Key Components
- `Navbar`
- `HeroSection`
- `FeatureCard`
- `LanguageBadge`
- `ThemeToggle`
- `SettingsSidebar`
- `Footer`

### Tips
- Use real language names and flag emojis in the hero — it makes the app feel alive immediately
- The settings page doesn't need to be functional yet — just build the layout and sidebar nav
- Commit to your color palette here — primary, secondary, accent, error, success

---

## Phase 2 · Login + Create Account

**Goal:** Auth screens that match your landing page theme. A clean multi-step onboarding wizard that collects everything needed to personalise the experience from day one.

---

### Screen 1 — Login Page

| Element | Details |
|---------|---------|
| Email + password fields | Inline validation, show/hide password toggle |
| Social login | Google, GitHub buttons above a divider |
| Forgot password link | Sits below the password field |
| Redirect | On success → Dashboard |

---

### Screen 2 — Create Account (Basic Info)

Just the essentials — don't overwhelm here. Keep it to 4 fields max.

| Field | Type | Notes |
|-------|------|-------|
| Full name | Text input | Used for greeting on dashboard |
| Email address | Email input | Check for existing account in real time |
| Password | Password input | Show/hide toggle, strength indicator bar |
| Confirm password | Password input | Validate match on blur |
| Terms & privacy | Checkbox | Required before submit |

> After submitting this form, the user enters the **onboarding wizard** (Steps 1–5 below). Show a step progress bar at the top throughout.

---

### Onboarding Wizard — Step-by-Step

> Design as a full-screen wizard with a progress indicator (e.g. `Step 2 of 5` or dot indicators). Each step is one focused question. Include a **Back** button and allow skipping non-essential steps.

---

#### Wizard Step 1 · Language to Learn

**Question:** *"Which language do you want to learn?"*

| Element | Details |
|---------|---------|
| Search input | Filter 100+ languages as you type |
| Language grid | Cards with flag emoji + language name (e.g. 🇯🇵 Japanese) |
| Popular row | Pin top 6–8 languages above the full grid (Spanish, French, Japanese, German, Mandarin, Korean, Italian, Portuguese) |
| Native language | Small secondary selector: "My native language is ___" |

**Data saved:** `targetLanguage`, `nativeLanguage`

---

#### Wizard Step 2 · Current Level

**Question:** *"How would you describe your current level?"*

| Option | Label | Description shown to user |
|--------|-------|--------------------------|
| A1 | Complete beginner | I know no words at all |
| A2 | Elementary | I know a few basic phrases |
| B1 | Intermediate | I can hold simple conversations |
| B2 | Upper intermediate | I can discuss most everyday topics |
| C1 | Advanced | I can express myself fluently |
| C2 | Mastery | I'm nearly native level |

Display as large selectable cards, one per row or 2-column grid. Show the CEFR label (A1, B1 etc.) prominently with the plain English description below it.

**Data saved:** `currentLevel` (e.g. `"A1"`)

---

#### Wizard Step 3 · Purpose / Learning Goal

**Question:** *"Why are you learning [language]?"*

| Option | Icon | Sublabel |
|--------|------|---------|
| Professional / Work | 💼 | Job, business meetings, emails |
| Travel | ✈️ | Holidays, exploring, short trips |
| Friendly conversation | 💬 | Talk to friends, online communities |
| Culture & media | 🎬 | Movies, music, books, anime |
| Moving abroad | 🏠 | Relocating, long-term living |
| Academic study | 📚 | Exams, university, research |
| Just for fun | 🎯 | Curiosity, personal challenge |

Allow **multi-select** — a user can pick more than one purpose. Highlight selected cards with a border/checkmark.

**Data saved:** `learningPurposes` (array, e.g. `["professional", "travel"]`)

**Why this matters:** Purpose determines lesson tone. Professional learners get formal vocabulary and business email templates. Friendly conversation learners get slang, idioms, and casual dialogue exercises.

---

#### Wizard Step 4 · Daily Time Commitment

**Question:** *"How much time can you spend learning each day?"*

| Option | Label | Session description |
|--------|-------|-------------------|
| 5 min | Just a little | 1 short exercise |
| 10 min | Casual | 2–3 exercises |
| 15 min | Regular | A full lesson |
| 20 min | Dedicated | Lesson + review |
| 30 min | Serious | Deep practice |
| 30 min+ | Intensive | Multiple lessons |

Display as a horizontal pill selector or large radio card group. Highlight the recommended option ("15 min — most popular") with a subtle badge.

Also include a **reminder toggle**: "Remind me to practice daily" with a time picker (e.g. 8:00 AM) that appears when toggled on.

**Data saved:** `dailyGoalMinutes` (e.g. `15`), `reminderEnabled` (bool), `reminderTime` (e.g. `"08:00"`)

---

#### Wizard Step 5 · Personalisation Summary

**Question:** *"Here's what we've set up for you — does this look right?"*

Show a summary card of everything collected:

```
🌐  Learning:        Japanese
📊  Your level:      Beginner (A1)
🎯  Purpose:         Friendly conversation, Culture & media
⏱️  Daily goal:      15 minutes
🔔  Reminder:        8:00 AM
```

Include an **Edit** link next to each row so users can jump back to fix anything without losing other answers.

Primary CTA: **"Start learning →"** — this creates their profile and routes to the dashboard.

**Data saved:** Final confirmation writes all fields to user profile.

---

### Screen 3 — Forgot Password

| Element | Details |
|---------|---------|
| Email input | Ask for account email |
| Submit state | Button changes to "Sending…" while processing |
| Success state | Confirmation message + resend link + back to login |
| Error state | "No account found" inline message |

---

### Key Components

| Component | Used in |
|-----------|---------|
| `AuthLayout` | Wrapper for all auth screens (split layout) |
| `LoginForm` | Login screen |
| `RegisterForm` | Create account screen |
| `PasswordInput` | Password + confirm fields with toggle |
| `StrengthMeter` | Password strength bar |
| `WizardShell` | Step progress bar + Back/Skip nav |
| `LanguagePicker` | Step 1 — searchable grid with flags |
| `LevelSelector` | Step 2 — CEFR card selector |
| `PurposePicker` | Step 3 — multi-select purpose cards |
| `TimeGoalPicker` | Step 4 — daily time pill selector |
| `ReminderToggle` | Step 4 — time picker for daily reminder |
| `OnboardingSummary` | Step 5 — editable summary card |
| `SocialAuthButton` | Google / GitHub login |

---

### Tips

- Use a **split layout** throughout auth: left = branded illustration, right = form/wizard
- The wizard progress bar should show both step number and a label (e.g. "Step 3 of 5 · Your goal")
- **Save wizard answers to localStorage** as the user progresses — if they close and return, pre-fill their answers
- Purpose picker (Step 3) drives content personalisation — store it carefully, it affects lesson curriculum
- The summary screen (Step 5) reduces drop-off — users feel in control before committing
- Skippable steps should still have a default value set (e.g. skip daily time → default to 10 min)

---

## Phase 3 · Dashboard (Detailed)

**Goal:** The home base after login. Overview of progress, streak, upcoming lessons, and quick actions.

### Screens to Build

| Screen | What it contains |
|--------|-----------------|
| Main dashboard | Daily streak counter, XP progress bar, today's goal ring, continue lesson CTA, recent activity feed |
| Lessons home | Unit grid (locked/unlocked), skill tree or path view, current level indicator, lesson cards with type badges |
| Vocabulary bank | Learned words list, search/filter by category, mastery level badge per word, review button |
| App shell / layout | Sidebar nav (or bottom nav on mobile), user avatar, language switcher, notification bell, settings link |

### Key Components
- `AppShell`
- `Sidebar`
- `StreakWidget`
- `XPBar`
- `GoalRing`
- `LessonCard`
- `UnitGrid`
- `VocabRow`
- `ActivityFeed`

### Tips
- **Build the app shell (sidebar + header) first** — everything else slots into it
- Use mock data (JS objects) for all content — don't wait for a backend
- Streak and XP widgets are motivating — make them visually prominent
- The skill tree / unit path is the hardest component — build it last in this phase
- Make the sidebar collapsible from day one; it's painful to add later

---

## Phase 4 · Learning / Lesson UI

**Goal:** The actual learning experience — exercises, feedback, and completion flow. This is the heart of the app.

### Screens to Build

| Screen | What it contains |
|--------|-----------------|
| Exercise screen | Question area, answer input or multiple choice, hint button, progress bar (Q1/10), timer (optional) |
| Feedback overlay | Correct (green, confetti) / wrong (red, explanation) overlay, correct answer reveal, continue button |
| Lesson summary | XP earned, accuracy %, time taken, mistakes review, "Keep going" vs "End session" actions |
| Exercise types | Translate the sentence, fill in the blank, multiple choice, match pairs, listen and type, speak (mic) |

### Key Components
- `LessonShell`
- `ProgressBar`
- `MultipleChoice`
- `FillBlank`
- `TranslateInput`
- `FeedbackOverlay`
- `LessonSummary`
- `HintTooltip`
- `MatchPairs`

### Tips
- **Build one exercise type (multiple choice) first** — perfect it, then clone for others
- The feedback overlay animation is what makes it feel polished — invest time here
- Progress bar at top should show remaining questions, not just current number
- Add keyboard shortcuts (Enter to confirm, Space to continue) — power users love this
- Lesson summary is a great place for a subtle confetti animation on good scores

---

## Phase 5 · Progress + Profile + Polish

**Goal:** Stats, achievements, profile management, and the final polish pass that makes everything feel cohesive.

### Screens to Build

| Screen | What it contains |
|--------|-----------------|
| Progress / stats | Weekly activity heatmap, accuracy trend chart, words learned over time, time spent graph, skill breakdown |
| Achievements | Badge grid (locked/unlocked), streak milestones, level-up announcements, share achievement card |
| Profile | Avatar upload, display name, bio, joined date, current languages, public/private toggle |
| Full settings | Notifications, daily reminder time, lesson difficulty, sound effects toggle, data & privacy, account deletion |

### Key Components
- `ActivityHeatmap`
- `StatCard`
- `TrendChart`
- `BadgeGrid`
- `AvatarUpload`
- `SkillBreakdown`
- `SkeletonLoader`
- `EmptyState`
- `NotifSettings`

### Polish Checklist
- [ ] Add loading skeletons on every data-heavy screen — no blank white flashes
- [ ] Empty states: custom illustration + message for 0 lessons, 0 vocabulary, etc.
- [ ] Responsive check: test every screen at 375px, 768px, and 1280px widths
- [ ] Micro-animations: button press scale, page transition fade, XP number counter
- [ ] Accessibility: tab order, aria-labels on icon buttons, color contrast check
- [ ] Error states: offline banner, failed lesson load, auth expired redirect

---

## Phase Summary

| Phase | Focus | Hardest part |
|-------|-------|-------------|
| 1 · Landing + Theme | Design system, public pages | Committing to a color palette |
| 2 · Auth | Login, signup, onboarding | Searchable language picker |
| 3 · Dashboard | App shell, home, vocab | Skill tree / unit path layout |
| 4 · Lessons | Exercise UI, feedback, summary | Feedback overlay animation |
| 5 · Progress + Polish | Stats, profile, polish | Activity heatmap, responsiveness |

## Why This Order Matters

1. **Theme first** — CSS variables set in Phase 1 propagate to every component. Changing them later cascades everywhere.
2. **Auth before dashboard** — Once auth works, you design the dashboard in the proper logged-in context (with user data).
3. **Shell before lessons** — The sidebar and header wrap the lesson screen too. Build the container, then fill it.
4. **Lessons before progress** — Progress charts are meaningless until the lesson system exists to generate data.
5. **Polish last** — Skeleton loaders and empty states make no sense before the real screens exist.

---

*Generated with Claude · Language Tutor Frontend Phase Guide*
