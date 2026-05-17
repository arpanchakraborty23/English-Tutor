import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  Bot,
  Brain,
  CreditCard,
  Gauge,
  GraduationCap,
  LogOut,
  Mic,
  Radio,
  Search,
  Settings,
  Signal,
  User,
  Users,
  Wallet,
  AudioLines,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

type Page = "overview" | "tutors" | "courses" | "personal" | "billing" | "settings";

const navMain: Array<{ key: Page; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }> = [
  { key: "overview", label: "Dashboard", icon: Gauge },
  { key: "tutors", label: "My AI Tutors", icon: Bot },
  { key: "courses", label: "Courses", icon: BookOpen },
  { key: "personal", label: "Personal Tutor", icon: GraduationCap },
  { key: "overview", label: "Students", icon: Users },
  { key: "overview", label: "Live Sessions", icon: Radio, badge: "3" },
];

const navManage = [
  { key: "overview" as Page, label: "Analytics", icon: Brain },
  { key: "billing" as Page, label: "Billing", icon: Wallet },
  { key: "settings" as Page, label: "Settings", icon: Settings },
];

const stats = [
  { label: "Active Students", value: "248", sub: "+12 this week", spark: [21, 24, 23, 26, 27, 29, 33] },
  { label: "Live Sessions Now", value: "3", sub: "2 AI · 1 Personal", spark: [8, 9, 7, 11, 10, 12, 11], live: true },
  { label: "Courses Published", value: "7", sub: "2 drafts pending", spark: [4, 4, 5, 6, 6, 7, 7] },
  { label: "Plan Usage", value: "74%", sub: "Warning: high usage", spark: [40, 43, 49, 55, 63, 69, 74], warn: true },
];

const tutors = [
  { name: "Aria", subject: "Physics", status: "LIVE", sessions: 452, voice: "Socratic" },
  { name: "Max", subject: "Math 101", status: "Active", sessions: 391, voice: "Calm & Encouraging" },
  { name: "Zoe", subject: "Chemistry", status: "Idle", sessions: 274, voice: "Energetic" },
];

const courses = [
  { name: "Physics 101", progress: 78 },
  { name: "Math Foundations", progress: 61 },
  { name: "Chemistry Basics", progress: 43 },
  { name: "English Grammar", progress: 86 },
];

const syllabus = [
  { course: "Physics 101", chapters: ["done", "done", "current", "pending", "pending"] },
  { course: "Math Foundations", chapters: ["done", "current", "pending", "pending", "pending"] },
  { course: "Chemistry Basics", chapters: ["done", "done", "done", "current", "pending"] },
] as const;

const activity = [
  ["Riya joined Physics 101 · Chapter 3", "2 min ago", "cyan"],
  ["Aria answered 12 questions · session ended", "6 min ago", "amber"],
  ["New student enrolled in Math Foundations", "14 min ago", "green"],
  ["Course draft updated: English Grammar", "22 min ago", "cyan"],
  ["LiveKit room lk-aria-phy active", "just now", "green"],
] as const;

const sessionsSeed = [
  { student: "Riya Sen", unit: "Physics 101 · Chapter 3", tutor: "Aria", quality: "Excellent", secs: 522 },
  { student: "Kabir Jain", unit: "Math Foundations · Integrals", tutor: "Max", quality: "Good", secs: 842 },
  { student: "Tara D", unit: "1:1 Personal · Grammar", tutor: "You", quality: "Stable", secs: 255 },
];

const c = (...v: Array<string | false | null | undefined>) => v.filter(Boolean).join(" ");
const fmtDur = (secs: number) => `${Math.floor(secs / 60)}m ${String(secs % 60).padStart(2, "0")}s`;

const PlaceholderPage = ({ title, desc }: { title: string; desc: string }) => (
  <div className="rounded-2xl border border-blue-300/20 bg-[#1A1E2B] p-8 animate-in fade-in duration-500">
    <h2 className="text-2xl font-semibold" style={{ fontFamily: "Syne, sans-serif" }}>{title}</h2>
    <p className="mt-3 text-slate-400">{desc}</p>
  </div>
);

export const NuralyticsStyleLanding = () => {
  const [page, setPage] = useState<Page>("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [sessions, setSessions] = useState(sessionsSeed);

  useEffect(() => {
    const id = setInterval(() => setSessions((s) => s.map((x) => ({ ...x, secs: x.secs + 1 }))), 1000);
    return () => clearInterval(id);
  }, []);

  const sparkData = useMemo(() => stats.map((s) => s.spark.map((v, i) => ({ i, v }))), []);
  const date = useMemo(() => new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" }), []);

  return (
    <main className="min-h-screen bg-[#0C0E14] text-[#E8EDF5]" style={{ fontFamily: "Instrument Sans, sans-serif" }}>
      <div className="fixed inset-0 opacity-35 pointer-events-none bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:36px_36px]" />

      <aside className={c("fixed z-40 inset-y-0 left-0 w-[220px] bg-[#13161F] border-r border-white/10 p-4 transition-transform", mobileNav ? "translate-x-0" : "-translate-x-full md:translate-x-0") }>
        <div className="mb-6 flex items-center gap-2"><div className="size-8 rounded-lg bg-blue-500/30 grid place-items-center">T</div><span style={{ fontFamily: "Syne, sans-serif" }} className="font-bold">TutorAI</span></div>
        <p className="text-xs text-slate-500 mb-2">Main</p>
        <div className="space-y-1">
          {navMain.map((n) => (
            <button key={n.label} onClick={() => setPage(n.key)} className={c("w-full rounded-lg px-3 py-2 text-sm flex items-center justify-between", page === n.key ? "bg-blue-500/10 border-l-2 border-[#3B82F6] text-blue-300" : "text-slate-300 hover:bg-white/5")}>
              <span className="flex items-center gap-2"><n.icon className="size-4" />{n.label}</span>{n.badge && <span className="text-xs bg-rose-500/20 text-rose-300 px-2 rounded-full">{n.badge}</span>}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-5 mb-2">Manage</p>
        <div className="space-y-1">{navManage.map((n) => <button key={n.label} onClick={() => setPage(n.key)} className={c("w-full rounded-lg px-3 py-2 text-sm flex items-center gap-2", page === n.key ? "bg-blue-500/10 border-l-2 border-[#3B82F6] text-blue-300" : "text-slate-300 hover:bg-white/5")}><n.icon className="size-4" />{n.label}</button>)}</div>
        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-[#1A1E2B] p-3 flex items-center justify-between"><div className="flex items-center gap-2"><div className="size-8 rounded-full bg-blue-500/30"/><div><p className="text-sm">Aisha Rao</p><p className="text-xs text-slate-500">Educator</p></div></div><LogOut className="size-4 text-slate-400"/></div>
      </aside>

      <div className="md:ml-[220px] relative z-10">
        <header className="h-14 sticky top-0 bg-[#0C0E14dd] border-b border-white/10 backdrop-blur-xl px-4 md:px-6 flex items-center gap-3">
          <button className="md:hidden" onClick={() => setMobileNav((v) => !v)}>☰</button>
          <h1 className="text-sm md:text-base" style={{ fontFamily: "Syne, sans-serif" }}>{page === "overview" ? "Dashboard / Overview" : `Dashboard / ${page}`}</h1>
          <div className="hidden md:flex mx-auto w-full max-w-lg items-center gap-2 rounded-lg border border-white/10 bg-[#1A1E2B] px-3 py-1.5 text-slate-400 text-sm"><Search className="size-4"/>Search tutors, students, sessions...</div>
          <div className="flex items-center gap-2"><div className="hidden sm:flex items-center gap-2 text-xs rounded-full px-3 py-1 border border-emerald-400/30 text-emerald-300"><span className="size-2 rounded-full bg-emerald-400 animate-pulse"/>LiveKit Connected</div><button className="relative p-2 rounded-lg bg-[#1A1E2B]"><Bell className="size-4"/><span className="absolute -top-1 -right-1 text-[10px] px-1 rounded bg-amber-400 text-black">5</span></button><div className="size-8 rounded-full bg-blue-500/30"/></div>
        </header>

        <section className="p-4 md:p-6 space-y-6">
          {page === "overview" && (
            <>
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500"><h2 className="text-2xl" style={{ fontFamily: "Syne, sans-serif" }}>Good morning, Aisha 👋</h2><p className="text-slate-400">{date}</p></div>
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((s, idx) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-[#1A1E2B] p-4 animate-in fade-in duration-700" style={{ animationDelay: `${idx * 120}ms` }}>
                    <p className="text-xs text-slate-400">{s.label}</p>
                    <div className="flex items-center justify-between mt-1"><p className="text-2xl" style={{ fontFamily: "DM Mono, monospace" }}>{s.value}</p>{s.live && <span className="inline-flex items-center gap-1 text-xs text-rose-300"><span className="size-2 rounded-full bg-rose-500 animate-pulse"/>LIVE</span>}</div>
                    <p className={c("text-xs mt-1", s.warn ? "text-amber-300" : "text-slate-400")}>{s.sub}</p>
                    <div className="h-12 mt-2"><ResponsiveContainer width="100%" height="100%"><AreaChart data={sparkData[idx]}><defs><linearGradient id={`spark-${idx}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity={0.42}/><stop offset="100%" stopColor="#3B82F6" stopOpacity={0}/></linearGradient></defs><Area type="monotone" dataKey="v" stroke="#3B82F6" fill={`url(#spark-${idx})`} strokeWidth={2}/></AreaChart></ResponsiveContainer></div>
                  </div>
                ))}
              </div>

              <div className="grid xl:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-[#1A1E2B] p-4">
                  <h3 className="mb-3" style={{ fontFamily: "Syne, sans-serif" }}>My AI Tutors</h3>
                  <div className="space-y-3">{tutors.map((t) => <div key={t.name} className="rounded-xl border border-white/10 bg-[#13161F] p-3 flex items-center justify-between"><div className="flex items-center gap-3"><div className={c("size-10 rounded-full grid place-items-center", t.status === "LIVE" ? "ring-2 ring-rose-400 bg-rose-500/20" : "bg-blue-500/20")}><Bot className="size-4"/></div><div><p>{t.name} ({t.subject})</p><p className="text-xs text-slate-400">{t.sessions} sessions · {t.voice}</p></div></div><div className="flex items-center gap-2">{t.status === "LIVE" && <AudioLines className="size-4 text-rose-300 animate-pulse"/>}<span className={c("text-xs px-2 py-1 rounded-full", t.status === "LIVE" ? "bg-rose-500/20 text-rose-300" : t.status === "Active" ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-slate-400")}>{t.status}</span><button className="text-xs rounded-lg border border-blue-400/40 px-2 py-1">Manage</button></div></div>)}</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#1A1E2B] p-4">
                  <h3 className="mb-3" style={{ fontFamily: "Syne, sans-serif" }}>Course Progress</h3>
                  <div className="space-y-3">{courses.map((c0) => <div key={c0.name}><div className="flex justify-between text-sm"><span>{c0.name}</span><span className={c0.progress > 70 ? "text-emerald-300" : c0.progress > 50 ? "text-blue-300" : "text-amber-300"}>{c0.progress}%</span></div><div className="mt-1 h-2 rounded-full bg-white/10 overflow-hidden"><div className={c("h-full", c0.progress > 70 ? "bg-emerald-500" : c0.progress > 50 ? "bg-blue-500" : "bg-amber-500")} style={{ width: `${c0.progress}%` }}/></div></div>)}</div>
                </div>
              </div>

              <div className="grid xl:grid-cols-3 gap-4">
                <div className="xl:col-span-2 rounded-2xl border border-white/10 bg-[#1A1E2B] p-4">
                  <div className="flex items-center justify-between"><h3 style={{ fontFamily: "Syne, sans-serif" }}>Live Sessions</h3><span className="text-xs text-rose-300 inline-flex items-center gap-1"><span className="size-2 rounded-full bg-rose-500 animate-pulse"/>Live</span></div>
                  <div className="mt-3 space-y-2">{sessions.map((s) => <div key={s.student} className="grid grid-cols-12 gap-2 text-xs md:text-sm rounded-lg border border-white/10 bg-[#13161F] p-2 items-center"><span className="col-span-3">{s.student}</span><span className="col-span-3 text-slate-400">{s.unit}</span><span className="col-span-2">{s.tutor}</span><span className="col-span-2" style={{ fontFamily: "DM Mono, monospace" }}>{fmtDur(s.secs)}</span><span className="col-span-1 inline-flex items-center gap-1"><Signal className="size-3 text-emerald-300"/>{s.quality}</span><button className="col-span-1 rounded border border-blue-400/40 px-2 py-1">Monitor</button></div>)}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#1A1E2B] p-4">
                  <h3 style={{ fontFamily: "Syne, sans-serif" }}>Recent Activity</h3>
                  <div className="mt-3 space-y-3">{activity.map(([t, tm, tone]) => <div key={t} className="pl-3 border-l border-white/15"><p className="text-sm">{t}</p><p className={c("text-xs", tone === "amber" ? "text-amber-300" : tone === "green" ? "text-emerald-300" : "text-blue-300")}>{tm}</p></div>)}</div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#1A1E2B] p-4">
                <h3 style={{ fontFamily: "Syne, sans-serif" }}>Syllabus Timeline</h3>
                <div className="mt-4 space-y-4">{syllabus.map((s) => <div key={s.course}><p className="text-sm mb-2">{s.course}</p><div className="flex gap-2">{s.chapters.map((ch, i) => <span key={i} className={c("h-8 flex-1 rounded-full border grid place-items-center text-xs", ch === "done" ? "bg-blue-500/35 border-blue-400/40" : ch === "current" ? "bg-amber-500/30 border-amber-400 animate-pulse" : "border-white/20 text-slate-500")}>Ch {i + 1}</span>)}</div></div>)}</div>
              </div>
            </>
          )}

          {page === "tutors" && <PlaceholderPage title="My AI Tutors" desc="Tutor grid, drawer tabs (Persona, Knowledge Base, LiveKit config), and session controls are structured for next expansion." />}
          {page === "courses" && <PlaceholderPage title="Courses" desc="Course cards, filter tabs, and syllabus-builder detail workflows are scaffolded for this SPA." />}
          {page === "personal" && <PlaceholderPage title="Personal Tutor" desc="Personal students, weekly calendar slots, and session history table will live here." />}
          {page === "billing" && <PlaceholderPage title="Billing" desc="Pro plan ₹2,499/mo, usage meters, invoice cards, and billing history layout is ready." />}
          {page === "settings" && <PlaceholderPage title="Settings" desc="Profile, platform, AI defaults, notifications, integrations, security, and danger-zone tabs." />}
        </section>
      </div>
    </main>
  );
};
