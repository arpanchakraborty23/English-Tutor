# AGENTS.md — ARIA: AI Tutor Universal (Frontend)

> **Agent Context File** — Read this fully before writing any code.
> **Project**: ARIA — Adaptive Reasoning & Intelligence for Academics
> **Location**: `D:\GENAIProjects\English-Tutor\Frontend`
> **Last Updated**: 2026-04-28

---

## Quick Start for New Agents

### What's Done
- React 18 + Vite + TypeScript project structure
- shadcn/ui components installed
- Landing, Auth, Onboarding, Dashboard, Voice pages implemented
- LiveKit voice integration with `VoiceAgentConsole.tsx`
- API Services: `api.ts`, `authService.ts`, `voiceService.ts`, `progressService.ts`
- Custom Hooks: `useApi.ts` with React Query
- Auth Context: `AuthContext.tsx` with JWT management
- Light Theme Dashboard: Professional modular UI
- **Tutor Session Page** with LiveKit avatar, sidebar, code editor

### What's Next (Priority Order)
1. Redesign Sidebar Navigation - ARIA-specific structure (see Navigation section)
2. Redesign Dashboard KPIs - Learning analytics metrics (see Dashboard section)
3. Build Billing Page - SaaS subscription management (see Billing section)
4. Enhance Settings Page - Learning preferences + profile (see Settings section)

### Key Files to Know
| File | What It Does |
|------|-------------|
| `src/services/api.ts` | HTTP client with auth token |
| `src/hooks/useApi.ts` | React Query hooks |
| `src/context/AuthContext.tsx` | User session state |
| `src/components/tutor/*` | TutorSession components (avatar, sidebar, code editor, notes, chat) |
| `src/components/dashboard/*` | Modular dashboard components |

### Run Commands
```bash
npm install && npm run dev   # http://localhost:8081
npm run build               # Production build
npm run lint                # ESLint check
```

---

## 1. Product Vision

**ARIA** is a universal AI tutoring SaaS platform. Anyone - school kids, college students, working professionals, hobbyists - can learn any subject through a personalized AI tutor. No technical background required.

### Target Users
- **Students** (school/college): Homework help, exam prep, deep subject learning
- **Professionals**: Upskilling, certifications, domain knowledge
- **Hobbyists & Lifelong Learners**: Curiosity-driven, flexible pace
- **Non-tech Users**: The entire UI must be approachable and jargon-free

### Core Features
- **AI Tutor Sessions**: Real-time voice/video interaction with AI tutor and avatar
- **Multi-subject Support**: Programming, languages, mathematics, sciences, arts, business
- **Live Transcription**: Real-time chat with AI tutor
- **Code Editor Integration**: For programming sessions with syntax highlighting
- **Session Notes**: Shared notes between user and AI tutor
- **Progress Dashboard**: Visual analytics with personalized insights
- **Practice & Exams**: Quizzes, practice problems, exam prep with AI-generated tests
- **Syllabus Support**: Match lessons to school/college curriculum
- **User Onboarding**: Collect interests, preferred subjects, learning goals
- **Billing & Subscription**: SaaS subscription management

### Core Experience
The moment a user opens ARIA, they feel like they have a world-class tutor in their pocket. The AI knows their name, their goals, their pace - and adapts every session to them. Sessions feel like conversations, not lessons.

---

## 2. Design System & Aesthetic

### Visual Direction
**Aesthetic**: Warm-intelligent. Not corporate. Think the clarity of Notion, the polish of Linear, and the warmth of Duolingo - but premium and focused.

- Avoid: Purple gradients on white, generic rounded cards, stock-photo feel
- Instead: Organic depth, soft amber highlights, layered surfaces, purposeful whitespace

### Color Palette
```css
/* Background & Surface */
--bg:             #F6F5F0;   /* Warm off-white */
--surface:        #FFFFFF;
--surface-raised: #FDFCF8;   /* Cards that float */
--border:         #E8E4DC;

/* Brand -- Warm Teal with Amber Accent */
--primary:        #0D9488;   /* Teal 600 */
--primary-light:  #CCFBF1;   /* Teal 100 */
--primary-dark:   #134E4A;   /* Teal 900 */
--accent:         #F59E0B;   /* Amber -- streaks, highlights, badges */
--accent-light:   #FEF3C7;   /* Amber 100 */

/* Text */
--text-heading:  #111827;
--text-body:     #374151;
--text-muted:    #9CA3AF;
--text-inverse:  #FFFFFF;

/* Semantic */
--success:  #10B981;
--warning:  #F59E0B;
--error:    #EF4444;
--info:     #3B82F6;

/* Chart Palette */
--chart-1: #0D9488;   /* Teal */
--chart-2: #F59E0B;   /* Amber */
--chart-3: #6366F1;   /* Indigo */
--chart-4: #EC4899;   /* Pink */
--chart-5: #3B82F6;   /* Blue */
```

### Typography
```css
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

--font-display: 'Lora', Georgia, serif;            /* Headings, logo, KPI values */
--font-body:    'DM Sans', system-ui, sans-serif;  /* UI text, labels, buttons */
--font-mono:    'JetBrains Mono', monospace;        /* Code editor */
```

### Key UI Tokens
```css
--radius-sm:  6px;
--radius-md:  12px;
--radius-lg:  18px;
--radius-xl:  24px;

--shadow-card:  0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
--shadow-float: 0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06);

--transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
```

### Micro-interaction Rules
- Sidebar items: `translateX(2px)` + color shift on hover
- Cards: `translateY(-2px)` + shadow elevation on hover
- Buttons: subtle scale `0.98` on press
- Page transitions: fade + slide-up (150ms)
- Loading states: skeleton shimmer, never spinners on content areas

---

## 3. Application Routes & Navigation

### Route Map
| Route | Page | Auth | Description |
|-------|------|------|-------------|
| `/` | Landing | No | Marketing page |
| `/login` | Login | No | User sign-in |
| `/register` | Register | No | Account creation |
| `/forgot-password` | ForgotPassword | No | Password reset |
| `/onboarding` | OnboardingWizard | Yes (new) | Collect profile data |
| `/dashboard` | Dashboard | Yes | Home: stats, activity, quick-start |
| `/tutor` | TutorSession | Yes | Live AI tutor session |
| `/subjects` | Subjects | Yes | Browse & pick subjects/topics |
| `/practice` | Practice | Yes | Quizzes, practice problems, AI-generated tests |
| `/progress` | Progress | Yes | Detailed learning analytics |
| `/billing` | Billing | Yes | Plans, invoices, subscription |
| `/settings` | Settings | Yes | Profile, preferences, notifications |
| `*` | NotFound | - | 404 |

---

### Sidebar Navigation (Desktop -- 240px wide)

The sidebar is the spine of the app. It must feel grounded and warm, not sterile.

**Visual Spec:**
- Background: `#FDFCF8` with a `1px` right border `#E8E4DC`
- Logo area (56px): ARIA wordmark in `font-display`, teal dot accent
- Section headers: uppercase, `10px`, `letter-spacing: 0.08em`, muted
- Active item: `bg-primary-light`, `text-primary`, left border `3px solid --primary`
- Hover: `bg-[#F0EDEA]`, smooth transition

**Structure:**
```
+-----------------------------+
|  ARIA          [collapse]  |  <- Logo + collapse toggle
+-----------------------------+
|  LEARN                      |  <- Section label
|    Home                     |  <- /dashboard
|   +---------------------+   |
|   |  Start Session     |   |  <- /tutor  [TEAL CTA PILL]
|   +---------------------+   |
|    Subjects                 |  <- /subjects
|    Practice                  |  <- /practice (quizzes, AI-generated tests)
|    My Progress              |  <- /progress
+-----------------------------+
|  ACCOUNT                    |
|    Settings                 |  <- /settings (incl. Syllabus)
|    Billing                  |  <- /billing
+-----------------------------+
| +-------------------------+ |
| |  7-day streak!          | |  <- Amber streak badge pill
| |  Keep it up, Arjun      | |
| +-------------------------+ |
|  [Avatar]  Arjun S.         |  <- User info block
|            arjun@email.com  |
|            [Sign Out]       |
+-----------------------------+
```

**"Start Session" CTA - always visually distinct:**
```css
.nav-item-tutor {
  background: linear-gradient(135deg, #0D9488, #0F766E);
  color: white;
  border-radius: var(--radius-md);
  font-weight: 600;
  padding: 10px 14px;
  margin: 4px 8px;
  box-shadow: 0 2px 8px rgba(13,148,136,0.30);
  transition: var(--transition);
}
.nav-item-tutor:hover {
  box-shadow: 0 4px 16px rgba(13,148,136,0.40);
  transform: translateY(-1px);
}
```

---

### Top Header Bar (64px)
```
+----------------------------------------------------------------------+
|  [Page Title]                      [Search]  [Notifications] [Avatar] |
+----------------------------------------------------------------------+
```
- Background: `rgba(246,245,240,0.85)` with `backdrop-filter: blur(12px)`
- Sticky, `z-40`
- Search: expandable input triggered by `Cmd+K` shortcut
- Notification bell: red badge with unread count
- Avatar dropdown: Profile, Settings, Billing, Sign Out

---

### Mobile Navigation (Bottom Bar -- 5 tabs)
```
[Home]  [Tutor]  [Learn]  [Progress]  [Profile]
```
- Active: teal icon + teal underline dot
- Tutor tab: slightly raised pill background (teal) to emphasize it as primary action

---

## 4. Dashboard - KPIs & Layout

The Dashboard is the learner's home base. It must feel motivating and personal, not like a business analytics tool.

### Dashboard Header
```
Good morning, Arjun                         [Start Today's Session]
"You're 3 lessons away from completing Python Basics"
```
- Greeting changes by time of day (morning / afternoon / evening)
- AI-generated nudge based on current goal progress
- Primary CTA -> `/tutor`

---

### Primary KPI Cards (Row of 6)

> These replace old SaaS KPIs. Every metric is learning-specific with gamification.

```
+------------------+ +------------------+ +------------------+ +------------------+ +------------------+ +------------------+
|  Overall Progress| |  Day Streak      | |  Lessons Done    | |  Avg Quiz Score  | |  Time Studied    | |  XP Points       |
|  ████████░░ 72%  | |  ●●●●●○○ 5 days  | |  24 / 40         | |  85%             | |  4h 30m          | |  1,250 XP        |
|  Keep going!     | |  Best: 12 days   | |  60% complete    | |  Top 15%         | |  Goal: 6h        | |  Level 5         |
|                  | |                  | |                  | |                  | | ████████░░       | | ██████░░░░       |
+------------------+ +------------------+ +------------------+ +------------------+ +------------------+ +------------------+
```

**KPI Cards Breakdown:**

| Card | Purpose | Visual Element |
|------|---------|----------------|
| **Overall Progress** | Single % bar so students know where they stand | Progress bar with percentage |
| **Day Streak** | Motivates daily habit | 7-day dot trail (filled/empty dots) |
| **Lessons Done** | Shows X/total so finish line feels real | Fraction display + completion % |
| **Avg Quiz Score** | Shows academic performance + class rank | Score % with percentile badge |
| **Time Studied** | Weekly hours with goal bar | Progress bar toward weekly goal |
| **XP Points** | Gamification with level-up | XP count + level progress bar |

**KPI Card Design Spec:**
- Subtle left-border accent (3px, card's semantic color)
- Icon in soft rounded square (48x48px, `bg-primary-light`)
- Value: `font-display`, 32px, `--text-heading`
- Label: `font-body`, 13px, `--text-muted`
- Progress bars: rounded, subtle animation on load
- Streak dots: 7 circles, filled = teal, empty = gray-200
- XP level bar: amber accent for gamification feel

---

### Secondary Stats Row (2 wide cards)
```
+-------------------------------------+  +-------------------------------------+
|  Topics Covered                     |  |  Questions Asked to Tutor           |
|  24 topics across 3 subjects        |  |  156 total . avg 13/session         |
|  Top: Python, Algebra, Spanish      |  |                                     |
+-------------------------------------+  +-------------------------------------+
```

---

### Charts Row
**Left (60%) - Weekly Learning Activity**
- Bar chart (Recharts): hours studied per day, Mon-Sun
- Teal bars; today's bar in amber
- Below: "Your most productive day is Tuesday"

**Right (40%) - Subject Distribution**
- Donut chart: % time per subject
- Colored legend pills below

---

### AI Insights Panel (Full Width)
```
+------------------------------------------------------------------------------+
|  ARIA's Insights for You                                                     |
|  ---------------------------------------------------------------------------- |
|  Strength      You master new programming concepts 40% faster than avg      |
|  Focus Area    Algebra - you've skipped 3 sessions. A quick 15-min...       |
|  Recommended   Continue: "Python - Functions & Closures" (45 min)           |
|  Best Time     You perform best at 9-11 AM. Set a reminder? [Set]           |
+------------------------------------------------------------------------------+
```

---

### Learning Goals Progress
```
Python Fundamentals    [============----]  75%   Due: May 15
Spanish B1 Level       [====------------]  28%   Due: Jun 30
Linear Algebra         [==========------]  62%   No deadline
```

---

### Quick Actions Row
```
[Resume Last Session]  [Set New Goal]  [Schedule Session]  [Achievements]
```

---

## 5. Tutor Session Page (BUILT)

This is the **core product experience**. It must feel immersive, focused, and professional.

### Layout Architecture
```
+----------------------------------------------------------------------------------+
|  SESSION TOPBAR (56px)                                                           |
|  <- Back   Python: Functions & Closures   [Live . 00:12:34]   [End Session]    |
+----------------------------------------------------------------------------------+
|                                                   |                              |
|   MAIN STAGE (flex-1, ~65%)                       |  SIDEBAR (360px, collapsible)|
|                                                   |                              |
|   +-------------------------------------------+   |  +------------------------+  |
|   |  AI TUTOR AVATAR                          |   |  SIDEBAR TABS           |  |
|   |  (LiveKit VideoTrack / animated fallback) |   |  [Notes][Chat]          |  |
|   |  BarVisualizer waveform                   |   |  [Files][Settings]      |  |
|   +-------------------------------------------+   |  +------------------------+  |
|                                                   |                              |
|   +-------------------------------------------+   |  Notes:                     |
|   |  CODE EDITOR (Monaco, conditional)        |   |  AI + User notes           |
|   |  Shows for coding subjects only           |   |  Pin . Copy . Export       |
|   |  Syntax highlight, autocomplete           |   |                              |
|   |  [Run] button + output panel              |   |  Chat:                      |
|   +-------------------------------------------+   |  Full transcript            |
|                                                   |  Copy . Export               |
|   +-------------------------------------------+   |                              |
|   |  CHAT INPUT BAR                           |   |  Resources:                 |
|   |  [Hold to speak]  [Type...]  [Send]       |   |  Docs . Links . Files       |
|   +-------------------------------------------+   |                              |
|                                                   |  Settings:                   |
|   [Mic]  [Cam]  [Speaker]  [Editor]              |  Difficulty . Pace           |
|                                                   |                              |
+---------------------------------------------------+------------------------------+
```

### Built Components (src/components/tutor/)
| Component | File | Status |
|-----------|------|--------|
| TutorAvatar | `TutorAvatar.tsx` | Done - LiveKit videoTrack/audioTrack support |
| SessionControls | `TutorAvatar.tsx` | Done - Mic/Video/End buttons |
| TutorSidebar | `TutorSidebar.tsx` | Done - 4-tab collapsible sidebar |
| SessionNotes | `SessionNotes.tsx` | Done - Add/Edit/Delete notes |
| SessionChat | `SessionChat.tsx` | Done - Transcript with export |
| SessionResources | `SessionResources.tsx` | Done - Files/Links display |
| SessionSettings | `SessionSettings.tsx` | Done - Difficulty/Pace/Duration |
| TutorTopBar | `TutorTopBar.tsx` | Done - Duration, code toggle, end |
| CodeEditor | `CodeEditor.tsx` | Done - Syntax highlight, run code |
| TutorSession | `src/pages/TutorSession.tsx` | Done - Main page container |

### Avatar Zone States
| State | Visual |
|-------|--------|
| `idle` | Static avatar, soft breathing animation |
| `listening` | Green ring pulse around avatar border |
| `thinking` | Animated 3-dot loader, amber glow |
| `speaking` | BarVisualizer active, teal waveform |

### LiveKit Integration Pattern
```typescript
import {
  LiveKitRoom,
  VideoTrack,
  BarVisualizer,
  RoomAudioRenderer,
  TrackToggle,
  useVoiceAssistant,
  useLocalParticipant,
} from "@livekit/components-react";

// Avatar receives videoTrack from LiveKit backend
interface TutorAvatarProps {
  videoTrack?: TrackReference | null;
  audioTrack?: TrackReference | null;
  // ...
}
```

### Session Data Types
```typescript
interface TutorSessionMetadata {
  session_id: string;
  user_id: string;
  subject: string;              // "Python Programming"
  topic: string;                // "Functions & Closures"
  difficulty: "beginner" | "intermediate" | "advanced";
  session_type: "voice" | "video" | "text";
  language: string;
  notes: SessionNote[];
  code_snippets: CodeSnippet[];
  resources: Resource[];
  started_at: Date;
  ended_at?: Date;
  duration_minutes?: number;
  summary?: string;
}

interface SessionNote {
  id: string;
  content: string;
  type: "text" | "code" | "formula" | "image";
  from: "user" | "ai";
  pinned: boolean;
  timestamp: Date;
}
```

---

## 6. Practice & Exams Page

### Overview
Practice page lets users test their knowledge with quizzes and AI-generated tests. Exam mode simulates real exam conditions.

### Layout
```
+----------------------------------------------------------------------+
|  PRACTICE HEADER                                                       |
|  "Practice & Exams"              [Filter by Subject] [Filter by Type]    |
+----------------------------------------------------------------------+
|  PRACTICE TABS                                                       |
|  [Practice] [Exam Mode]                                             |
+----------------------------------------------------------------------+
|  QUIZ CARDS GRID                                                    |
|  +------------------------+  +------------------------+                 |
|  | [Quiz Card]           |  | [Quiz Card]           |                 |
|  | Python Basics #1     |  | Algebra - Linear... |                 |
|  | 10 Qs  - 15 min   |  | 15 Qs  - 25 min   |                 |
|  | [Start] [Preview]  |  | [Start] [Preview]  |                 |
|  +------------------------+  +------------------------+                  |
+----------------------------------------------------------------------+
|  AI-GENERATED TESTS                                                  |
|  +------------------------+  +------------------------+                 |
|  | [Test Card]         |  | [Test Card]         |                 |
|  | Unit Test: Functions|  | Midterm Sim: Calc  |                 |
|  | AI-generated       |  | Past paper style  |                    |
|  | [Start]          |  | [Start]          |                 |
|  +------------------------+  +------------------------+                  |
+----------------------------------------------------------------------+
```

### Exam Mode
- Timed tests with countdown
- No save/pause allowed
- Auto-submit on timer end
- Detailed results after submission

### Practice Components
```
src/components/practice/
├── PracticeHome.tsx        # Main page with tabs + cards grid
├── QuizCard.tsx          # Individual quiz card
├── QuizSession.tsx       # Active quiz taking UI
├── ExamMode.tsx         # Exam mode with timer
└── index.ts
```

---

## 7. Billing Page

### Layout
```
+----------------------------------------------------------------------+
|  BILLING HEADER                                                       |
|  "Manage your ARIA subscription"                                      |
+----------------------------------+-------------------------------------+
|  CURRENT PLAN (40%)              |  USAGE THIS MONTH (60%)             |
|                                  |                                      |
|  Pro Plan . $49/month            |  Sessions Used:    [=====----] 18  |
|  Active                          |  Learning Hours:   [====------] 6.5h|
|  Next billing: May 28, 2026      |  Code Executions:  [===-------] 47  |
|                                  |  Storage Used:     [==--------] 120MB|
|  [Manage Plan]                   |                                      |
+----------------------------------+-------------------------------------+
|  PLAN COMPARISON TABLE                                                |
+----------------------------------------------------------------------+
|  PAYMENT METHOD                                                       |
|  Visa ....4242  Exp 08/2027   [Edit]   [+ Add Method]               |
+----------------------------------------------------------------------+
|  INVOICE HISTORY                                    [Download All]   |
|  Apr 28 2026   Pro Plan   $49.00   Paid   [PDF]                     |
|  Mar 28 2026   Pro Plan   $49.00   Paid   [PDF]                     |
+----------------------------------------------------------------------+
```

### Subscription Plans
| Plan | Price | Sessions | Key Features |
|------|-------|----------|--------------|
| **Free** | $0/mo | 3/month | Text chat, 1 subject |
| **Basic** | $19/mo | 20/month | Voice + avatar, 3 subjects |
| **Pro** | $49/mo | Unlimited | All features, code editor, priority AI |
| **Enterprise** | Custom | Unlimited | Team dashboard, custom AI, SSO |

### Billing Components
```
src/components/billing/
├── CurrentPlan.tsx         # Plan card with status + next billing
├── UsageMeter.tsx          # Progress bars for this month's usage
├── PlanComparison.tsx      # Plan table with upgrade CTAs
├── InvoiceHistory.tsx      # Table + per-row PDF download
├── PaymentMethod.tsx       # Card display + edit + add new
├── CancelModal.tsx         # Multi-step cancellation with grace period
└── index.ts
```

### Billing Service
```typescript
export const billingService = {
  getCurrentPlan:        ()         => api.get("/billing/plan"),
  getUsage:              ()         => api.get("/billing/usage"),
  getInvoices:           (page = 1) => api.get(`/billing/invoices?page=${page}`),
  downloadInvoice:       (id)       => api.get(`/billing/invoices/${id}/pdf`, { responseType: "blob" }),
  upgradePlan:           (planId)   => api.post("/billing/upgrade", { planId }),
  cancelSubscription:    (reason?)  => api.post("/billing/cancel", { reason }),
  getPaymentMethods:     ()         => api.get("/billing/payment-methods"),
  addPaymentMethod:      (pmId)     => api.post("/billing/payment-methods", { payment_method_id: pmId }),
};
```

---

## 8. Settings Page

### Layout
```
+------------------+------------------------------------------+
|  SETTINGS TABS   |  CONTENT AREA                            |
|  (vertical list) |                                          |
|  Profile         |  [Active Section Content]                |
|  Learning        |                                          |
|  Notifications   |                                          |
|  Privacy         |                                          |
|  Subscription    |                                          |
+------------------+------------------------------------------+
```

### Section 1 - Profile
- Avatar upload (with crop modal)
- Display name, email (verified badge), phone
- Age range, occupation, user type (Student / Professional / Hobbyist)
- **Syllabus** (for students): Select school/college curriculum - AI adapts lessons to match
- Change password

### Section 2 - Learning Preferences -> Feeds AI Tutor
> This data populates the AI tutor's system prompt. Keep it editable.

```typescript
interface LearningPreferences {
  interests: string[];
  subjects: SubjectPreference[];
  learning_goals: LearningGoal[];
  preferred_difficulty: "beginner" | "intermediate" | "advanced";
  learning_style: "visual" | "auditory" | "reading" | "kinesthetic";
  preferred_session_duration: 15 | 30 | 45 | 60;
  daily_goal_minutes: number;
  ai_response_style: "concise" | "detailed" | "socratic";
  preferred_language: string;
  practice_topics: string[];         // Topics user wants to practice
  exam_prep_enabled: boolean;        // Enable exam prep mode
  exam_date?: Date;                 // Upcoming exam date
  exam_target_score?: number;           // Target score for exam
}
```

### Section 3 - Notifications
- Email: weekly progress report, session reminders
- Push: session start reminders, streak alerts
- Reminder time: time picker for daily study nudge

### Section 4 - Privacy & Security
- Two-Factor Authentication
- Data export: "Download my data" (JSON/ZIP)
- Account deletion (30-day grace notice)

### Section 5 - Subscription (Summary)
- Current plan card (read-only)
- Usage meters
- Link to `/billing`

### Settings Components
```
src/components/settings/
├── ProfileSettings.tsx
├── LearningPreferences.tsx     # Feeds AI tutor system prompt
├── NotificationSettings.tsx
├── PrivacySettings.tsx
├── SubscriptionSettings.tsx    # Read-only summary + link to billing
└── index.ts
```

---

## 9. User Profile Data Model

```typescript
interface UserProfile {
  id: string;
  email: string;
  email_verified: boolean;

  // Personal
  display_name: string;
  avatar_url?: string;
  age_range?: "under-18" | "18-25" | "26-35" | "36-50" | "50+";
  occupation?: string;
  user_type: "student" | "professional" | "hobbyist";

  // Learning
  interests: string[];
  subjects: SubjectPreference[];
  learning_goals: LearningGoal[];
  preferred_difficulty: "beginner" | "intermediate" | "advanced";
  learning_style: "visual" | "auditory" | "reading" | "kinesthetic";
  ai_response_style: "concise" | "detailed" | "socratic";
  preferred_language: string;

  // Syllabus (for students)
  syllabus?: {
    name: string;           // e.g., "CBSE Class 10", "AP Calculus"
    board: string;         // e.g., "CBSE", "IB", "SAT"
    grade: number;         // e.g., 10, 11, 12
    subjects: string[];    // Subjects in this syllabus
  };

  // Session
  preferred_session_duration: number;
  daily_goal_minutes: number;
  reminder_enabled: boolean;
  reminder_time?: string;

  // Subscription
  subscription_tier: "free" | "basic" | "pro" | "enterprise";
  subscription_status: "active" | "paused" | "cancelled";
  subscription_period_end?: Date;

  // Meta
  onboarding_completed: boolean;
  created_at: Date;
  last_active: Date;
}

interface SubjectPreference {
  subject: string;
  level: "beginner" | "intermediate" | "advanced";
  priority: number;   // 1 = highest
}

interface LearningGoal {
  id: string;
  goal: string;
  target_date?: Date;
  progress: number;   // 0-100
  status: "active" | "completed" | "paused";
}
```

---

## 10. Directory Structure

```
D:\GENAIProjects\English-Tutor\Frontend
+-- src/
|   +-- components/
|   |   +-- ui/                           # shadcn/ui base components
|   |   +-- layout/
|   |   |   +-- AppSidebar.tsx            # ARIA sidebar nav
|   |   |   +-- AppHeader.tsx             # Top bar
|   |   |   +-- AppLayout.tsx             # Shell wrapper
|   |   |   +-- MobileNav.tsx             # Bottom tab bar
|   |   +-- dashboard/
|   |   |   +-- WelcomeBanner.tsx         # Greeting + AI nudge + Start CTA
|   |   |   +-- KPICard.tsx               # Learning KPI card
|   |   |   +-- WeeklyActivity.tsx        # Bar chart: daily hours
|   |   |   +-- SubjectDistribution.tsx   # Donut chart
|   |   |   +-- AIInsightsPanel.tsx       # ARIA insights
|   |   |   +-- GoalsProgress.tsx         # Goal progress bars
|   |   |   +-- QuickActions.tsx          # Quick action buttons
|   |   |   +-- DashboardSidebar.tsx      # Current sidebar
|   |   |   +-- DashboardHeader.tsx       # Current header
|   |   |   +-- index.ts
|   |   +-- tutor/                        # BUILT
|   |   |   +-- TutorAvatar.tsx           # LiveKit avatar + waveform
|   |   |   +-- TutorSidebar.tsx          # 4-tab sidebar
|   |   |   +-- TutorTopBar.tsx           # Timer + end session
|   |   |   +-- SessionNotes.tsx          # Notes tab
|   |   |   +-- SessionChat.tsx           # Chat transcript tab
|   |   |   +-- SessionResources.tsx      # Resources tab
|   |   |   +-- SessionSettings.tsx       # Settings tab
|   |   |   +-- CodeEditor.tsx            # Monaco + run output
|   |   |   +-- SessionControls.tsx       # Mic/cam/speaker
|   |   |   +-- index.ts
|   |   +-- billing/
|   |   |   +-- CurrentPlan.tsx
|   |   |   +-- UsageMeter.tsx
|   |   |   +-- PlanComparison.tsx
|   |   |   +-- InvoiceHistory.tsx
|   |   |   +-- PaymentMethod.tsx
|   |   |   +-- index.ts
|   |   +-- settings/
|   |   |   +-- ProfileSettings.tsx
|   |   |   +-- LearningPreferences.tsx
|   |   |   +-- NotificationSettings.tsx
|   |   |   +-- PrivacySettings.tsx
|   |   |   +-- index.ts
|   |   +-- subjects/
|   |   |   +-- SubjectCard.tsx
|   |   |   +-- SubjectGrid.tsx
|   |   |   +-- index.ts
|   |   +-- practice/
|   |   |   +-- QuizCard.tsx
|   |   |   +-- QuizSession.tsx
|   |   |   +-- ExamMode.tsx
|   |   |   +-- PracticeHome.tsx
|   |   |   +-- index.ts
|   |   +-- wizard/                        # Onboarding
|   +-- pages/
|   |   +-- Landing.tsx
|   |   +-- Login.tsx
|   |   +-- Register.tsx
|   |   +-- ForgotPassword.tsx
|   |   +-- OnboardingWizard.tsx
|   |   +-- Dashboard.tsx
|   |   +-- TutorSession.tsx              # BUILT
|   |   +-- Subjects.tsx
|   |   +-- Practice.tsx               # Quizzes, AI-generated tests
|   |   +-- Progress.tsx
|   |   +-- Billing.tsx
|   |   +-- Settings.tsx
|   |   +-- NotFound.tsx
|   +-- services/
|   |   +-- api.ts
|   |   +-- authService.ts
|   |   +-- tutorService.ts
|   |   +-- billingService.ts
|   |   +-- progressService.ts
|   |   +-- index.ts
|   +-- hooks/
|   |   +-- useApi.ts
|   +-- context/
|   |   +-- AuthContext.tsx
|   |   +-- WizardContext.tsx
|   +-- types/
|   |   +-- user.ts
|   |   +-- tutor.ts
|   |   +-- billing.ts
|   |   +-- index.ts
|   +-- lib/
|   |   +-- utils.ts
+-- public/
+-- docs/
+-- AGENTS.md
```

---

## 11. Component Patterns

### KPI Card
```typescript
interface KPICardProps {
  icon: LucideIcon;
  iconBg: string;      // "bg-teal-100"
  iconColor: string;   // "text-teal-600"
  label: string;
  value: string;
  subtext: string;
  trend?: number;      // % vs last period
  accentColor?: string;
}
```

### Card Base (Tailwind)
```
bg-white border border-[#E8E4DC] rounded-[18px] p-5
shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)]
hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:-translate-y-0.5
transition-all duration-[180ms]
```

### Sidebar Nav Item
```typescript
// Regular item
cn(
  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
  "text-sm font-medium transition-all duration-[180ms]",
  active ? "bg-[#CCFBF1] text-[#0D9488] border-l-[3px] border-[#0D9488]"
         : "text-[#374151] hover:bg-[#F0EDEA] hover:translate-x-0.5"
)

// Tutor CTA item - always teal gradient pill
"bg-gradient-to-br from-[#0D9488] to-[#0F766E] text-white
 font-semibold rounded-xl px-4 py-2.5 mx-2 my-1
 shadow-[0_2px_8px_rgba(13,148,136,0.30)]
 hover:shadow-[0_4px_16px_rgba(13,148,136,0.40)] hover:-translate-y-px"
```

---

## 12. API Service Patterns

### Tutor Service
```typescript
export const tutorService = {
  startSession: (metadata) => api.post("/tutor/session/start", metadata),
  endSession: (sessionId) => api.post(`/tutor/session/${sessionId}/end`),
  getSessionNotes: (sessionId) => api.get(`/tutor/session/${sessionId}/notes`),
  addNote: (sessionId, note) => api.post(`/tutor/session/${sessionId}/notes`, { content: note }),
  runCode: (sessionId, code, language) => api.post(`/tutor/session/${sessionId}/execute`, { code, language }),
};
```

---

## 13. Agent Rules

1. **Read this full file before starting any task.**
2. **Respect the design system** - use CSS variables, Lora + DM Sans, warm teal/amber palette.
3. **TutorSession is the crown jewel** - it gets the most polish.
4. **Never use generic KPIs** - every dashboard metric must be learning-specific.
5. **Navigation is ARIA-first** - use "Home", "Start Session", "Subjects", "Practice", "My Progress", "Settings", "Billing".
6. **User profile <-> AI agent** - LearningPreferences always syncs to tutor session metadata.
7. **Mobile-first** - every layout degrades gracefully to 375px.
8. **Billing is SaaS-grade** - invoices downloadable as PDF, cancellation has grace period.
9. **No lorem ipsum** - use realistic data: Arjun, Python Fundamentals, 7-day streak, $49 Pro plan.
10. **Onboarding data is never lost** - save per-step to backend, allow resume.

---

## 14. Build Progress Tracker

### Completed
| Feature | Date |
|---------|------|
| Project structure + Vite + TypeScript | 2026-04-28 |
| shadcn/ui setup | 2026-04-28 |
| Auth pages (Login, Register, Forgot) | 2026-04-28 |
| Onboarding wizard | 2026-04-28 |
| Dashboard UI (light theme) | 2026-04-28 |
| API service layer | 2026-04-28 |
| Auth context + JWT management | 2026-04-28 |
| **Tutor Session Page (full build)** | 2026-04-28 |

### In Progress
| Feature | Priority |
|---------|----------|
| Sidebar nav redesign (ARIA structure) | High |
| Dashboard KPI redesign (learning metrics) | High |
| Billing page | High |

### Pending
| Feature | Priority |
|---------|----------|
| Settings - LearningPreferences section | Medium |
| Subjects browser | Medium |
| Progress analytics page | Medium |
| Post-session summary modal | Medium |
| Mobile bottom nav | Medium |

---

**Project**: ARIA - AI Tutor Universal (Frontend)
**Repository**: `D:\GENAIProjects\English-Tutor\Frontend`
**Type**: SaaS Platform - AI Tutoring for Everyone
**Stack**: React 18 + Vite + TypeScript + shadcn/ui + LiveKit + Monaco
