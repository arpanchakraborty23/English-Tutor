import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Bot,
  BookOpen,
  Brain,
  ChevronDown,
  Gauge,
  GraduationCap,
  Home,
  Mic,
  Radio,
  Search,
  Settings,
  Signal,
  Users,
  Video,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Active Students", value: "1,284", trend: "+8.2%", spark: [28, 30, 29, 36, 41, 40, 45] },
  { label: "Live Sessions Now", value: "2", trend: "2 students in session", spark: [8, 9, 7, 10, 12, 10, 11], live: true },
  { label: "Courses Published", value: "18", trend: "+3 this month", spark: [14, 14, 15, 16, 16, 17, 18] },
  { label: "Avg. Session Duration", value: "34m 22s", trend: "+4m vs last week", spark: [20, 21, 23, 26, 25, 28, 30] },
];

const tutors = [
  { name: "Aria — Physics Tutor", status: "LIVE", course: "Physics 301", sessions: 842, ring: true },
  { name: "Niko — Math Tutor", status: "Idle", course: "Math 101", sessions: 610 },
  { name: "Luma — Biology Tutor", status: "Offline", course: "Biology 210", sessions: 497 },
];

const liveSessionsSeed = [
  { student: "Riya Sen", chapter: "Physics · Chapter 3", tutor: "Aria", quality: "Excellent", seconds: 782 },
  { student: "Karan Mehta", chapter: "Math · Integrals", tutor: "Niko", quality: "Good", seconds: 431 },
];

const activity = [
  { text: "Riya joined Physics - Chapter 3", time: "2 min ago", tone: "cyan" },
  { text: "AI Tutor 'Aria' answered 12 questions", time: "session ended", tone: "amber" },
  { text: "New student enrolled in Math 101", time: "11 min ago", tone: "cyan" },
  { text: "Luma knowledge base updated (2 PDFs)", time: "19 min ago", tone: "amber" },
  { text: "LiveKit room lk-physics-3 connected", time: "just now", tone: "cyan" },
];

const courses = [
  { name: "Physics 301", progress: 72, chapters: [1, 1, 1, 1, 0.6, 0.3, 0.2] },
  { name: "Math 101", progress: 58, chapters: [1, 1, 1, 0.5, 0.4, 0.2, 0.1] },
  { name: "Biology 210", progress: 44, chapters: [1, 0.8, 0.6, 0.3, 0.2, 0.1, 0] },
];

const nav = [
  [Home, "Overview"],
  [Bot, "My AI Tutors"],
  [BookOpen, "Courses"],
  [GraduationCap, "Students"],
  [Radio, "Live Sessions"],
  [Gauge, "Analytics"],
  [Mic, "Voice & Persona Settings"],
  [Settings, "Settings"],
] as const;

const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");

const fmt = (s: number) => `${Math.floor(s / 60)}m ${`${s % 60}`.padStart(2, "0")}s`;

export const NuralyticsStyleLanding = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [liveSessions, setLiveSessions] = useState(liveSessionsSeed);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveSessions((curr) => curr.map((it) => ({ ...it, seconds: it.seconds + 1 })));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const sparkData = useMemo(() => stats.map((s) => s.spark.map((v, i) => ({ i, v }))), []);

  return (
    <main
      style={{
        ["--color-bg" as string]: "#0A0F1E",
        ["--color-surface" as string]: "#111A31",
        ["--color-accent-cyan" as string]: "#00E5FF",
        ["--color-accent-amber" as string]: "#FFB830",
        ["--color-text" as string]: "#E8EDF5",
      }}
      className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]"
    >
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_10%,rgba(0,229,255,.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,184,48,.10),transparent_24%)]" />

      <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-cyan-300/10 bg-[#0A0F1Ecc]">
        <div className="px-4 md:px-8 h-16 flex items-center gap-4">
          <button className="md:hidden" onClick={() => setOpenSidebar((s) => !s)}>☰</button>
          <div className="font-semibold tracking-wide text-cyan-300">YourAppName</div>
          <div className="flex-1 max-w-xl mx-auto hidden md:flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-white/5 px-3 py-2 text-sm text-slate-300">
            <Search className="size-4" /> Search courses, students, sessions...
          </div>
          <div className="ml-auto flex items-center gap-4 text-sm">
            <button className="relative p-2 rounded-lg border border-cyan-300/20"><Bell className="size-4" /><span className="absolute -top-1 -right-1 text-[10px] bg-amber-400 text-black px-1 rounded">3</span></button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10"><span className="size-2 rounded-full bg-emerald-300 animate-pulse" />LiveKit Connected</div>
            <button className="flex items-center gap-2"><div className="size-8 rounded-full bg-cyan-400/30" /><ChevronDown className="size-4" /></button>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex">
        <aside className={cn("fixed md:sticky top-16 h-[calc(100vh-64px)] w-72 p-4 border-r border-cyan-300/10 bg-[#0D1428] transition-transform", openSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0")}>
          <nav className="space-y-2">
            {nav.map(([Icon, label], i) => (
              <button key={label} className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-sm", i === 0 ? "bg-cyan-400/15 text-cyan-200 border border-cyan-300/30" : "hover:bg-white/5 text-slate-300")}>
                <Icon className="size-4" /> {label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="flex-1 p-4 md:p-8 md:ml-0 w-full">
          <div className="grid lg:grid-cols-4 gap-4 animate-in fade-in duration-700">
            {stats.map((s, idx) => (
              <div key={s.label} className="rounded-2xl border border-cyan-300/20 bg-[var(--color-surface)] p-4 shadow-[0_0_0_1px_rgba(0,229,255,.05),0_20px_40px_rgba(0,0,0,.35)]" style={{ animationDelay: `${idx * 120}ms` }}>
                <p className="text-xs text-slate-400">{s.label}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-2xl font-semibold">{s.value}</div>
                  {s.live && <span className="inline-flex items-center gap-1 text-xs text-rose-300"><span className="size-2 rounded-full bg-rose-400 animate-pulse" />LIVE</span>}
                </div>
                <p className="text-xs text-slate-400 mt-1">{s.trend}</p>
                <div className="h-12 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparkData[idx]}>
                      <Area type="monotone" dataKey="v" stroke="#00E5FF" fill="url(#g)" strokeWidth={2} />
                      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00E5FF" stopOpacity={0.35} /><stop offset="100%" stopColor="#00E5FF" stopOpacity={0} /></linearGradient></defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-[var(--color-surface)] p-4">
            <h3 className="text-lg mb-3">My AI Tutors</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {tutors.map((t) => (
                <article key={t.name} className={cn("min-w-[280px] rounded-2xl border p-4 bg-[#0f1a33] hover:-translate-y-1 transition", t.ring ? "border-cyan-300 shadow-[0_0_25px_rgba(0,229,255,.35)]" : "border-white/10")}>
                  <div className="flex items-center gap-3">
                    <div className={cn("size-12 rounded-full grid place-items-center", t.ring ? "bg-cyan-300/25 ring-2 ring-cyan-300/60" : "bg-white/10")}><Bot className="size-5" /></div>
                    <div><p className="font-medium">{t.name}</p><p className="text-xs text-slate-400">{t.course}</p></div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm"><span className={cn("px-2 py-1 rounded-full text-xs", t.status === "LIVE" ? "bg-rose-400/20 text-rose-200" : "bg-white/10 text-slate-300")}>{t.status}</span><span>{t.sessions} sessions</span></div>
                  <div className="mt-4 flex gap-2"><button className="flex-1 rounded-lg border border-cyan-300/30 px-3 py-2 text-sm">Manage</button><button className="flex-1 rounded-lg bg-cyan-400 text-black px-3 py-2 text-sm font-medium">Launch Session</button></div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 grid xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 rounded-2xl border border-cyan-300/20 bg-[var(--color-surface)] p-4">
              <div className="flex items-center justify-between"><h3 className="text-lg">Live Sessions</h3><span className="inline-flex items-center gap-2 text-rose-300 text-xs"><span className="size-2 rounded-full bg-rose-400 animate-pulse" />Real-time feed</span></div>
              <div className="mt-3 space-y-3">
                {liveSessions.map((s) => (
                  <div key={s.student} className="rounded-xl border border-white/10 p-3 bg-[#0d1630] flex items-center gap-3">
                    <div className="size-9 rounded-full bg-cyan-400/20" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{s.student}</p>
                      <p className="text-xs text-slate-400">{s.chapter} • Tutor: {s.tutor}</p>
                    </div>
                    <div className="text-xs text-slate-300 font-mono">{fmt(s.seconds)}</div>
                    <div className="text-xs inline-flex items-center gap-1"><Signal className="size-3 text-emerald-300" />{s.quality}</div>
                    <button className="rounded-lg px-3 py-2 text-xs border border-cyan-300/30">Monitor</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-300/20 bg-[var(--color-surface)] p-4">
              <h3 className="text-lg">Recent Activity</h3>
              <div className="mt-3 space-y-3">
                {activity.map((a) => (
                  <div key={a.text} className="pl-3 border-l border-white/15">
                    <p className="text-sm">{a.text}</p>
                    <p className={cn("text-xs", a.tone === "amber" ? "text-amber-300" : "text-cyan-300")}>{a.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-[var(--color-surface)] p-4">
            <h3 className="text-lg">Syllabus Progress Tracker</h3>
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              {courses.map((c) => (
                <div key={c.name} className="rounded-xl border border-white/10 p-3 bg-[#0d1630]">
                  <div className="flex justify-between text-sm"><span>{c.name}</span><span className="text-cyan-300">{c.progress}%</span></div>
                  <div className="h-2 mt-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-400 to-amber-300" style={{ width: `${c.progress}%` }} /></div>
                  <div className="mt-3 flex gap-1">{c.chapters.map((n, i) => <span key={i} className="h-2 flex-1 rounded-full" style={{ background: `rgba(0,229,255,${0.15 + n * 0.7})` }} />)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
