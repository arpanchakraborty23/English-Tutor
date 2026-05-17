import { ArrowRight, Bot, Brain, CalendarCheck, ChartColumn, MessageCircleQuestion, Mic, PenLine, ShieldCheck } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const features = [
  { title: "AI Voice Tutor", icon: Mic, size: "col-span-2", text: "Natural voice lectures with emotional pacing and emphasis." },
  { title: "Whiteboard Teaching", icon: PenLine, size: "col-span-1", text: "Visual explanations with equations, maps, and diagrams." },
  { title: "Adaptive Learning", icon: Brain, size: "col-span-1", text: "Every concept reshaped by confidence and response speed." },
  { title: "Real-Time Doubts", icon: MessageCircleQuestion, size: "col-span-2", text: "Ask in plain language and receive instant layered explanations." },
  { title: "Study Planner", icon: CalendarCheck, size: "col-span-1", text: "Daily milestones synced with syllabus and exam goals." },
  { title: "Parent Dashboard", icon: ChartColumn, size: "col-span-1", text: "Weekly insight windows for progress, focus, and weak topics." },
];

const roadmap = ["Assessment", "Daily Learning", "Revision", "Weak Topic Detection", "Exam Preparation"];

export const NuralyticsStyleLanding = () => {
  const waveform = useMemo(() => Array.from({ length: 30 }, (_, i) => (i % 2 ? 26 : 44)), []);

  return (
    <main className="bg-[#050816] text-slate-100 selection:bg-fuchsia-400/30">
      <section className="relative min-h-screen overflow-hidden px-6 pt-24 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#4DB6FF40,transparent_35%),radial-gradient(circle_at_80%_30%,#D946EF40,transparent_32%)]" />
        <div className="absolute inset-0 animate-pulse opacity-40" />
        <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80 mb-6">Human-Centered AI Tutor</p>
            <h1 className="text-5xl md:text-7xl font-semibold leading-tight">Your AI teacher that sounds, explains, and adapts like a real mentor.</h1>
            <p className="mt-6 text-slate-300 max-w-xl">Immersive voice teaching, holographic whiteboard sessions, and personalized learning flows designed for deep understanding—not shallow memorization.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/register" className="rounded-2xl px-6 py-3 bg-gradient-to-r from-[#4DB6FF] via-[#7C7CFF] to-[#D946EF] text-[#050816] font-semibold inline-flex items-center gap-2 shadow-[0_0_30px_rgba(124,124,255,.35)]">Start Free Trial <ArrowRight className="size-4" /></Link>
              <button className="rounded-2xl px-6 py-3 border border-white/20 bg-white/5 backdrop-blur-xl">Meet Your AI Tutor</button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between"><span className="text-cyan-200">AI Tutor Live Session</span><Bot className="text-fuchsia-300" /></div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-black/30 p-4">Voice explanation in progress...</div>
                <div className="rounded-2xl bg-black/30 p-4">Floating syllabus roadmap</div>
              </div>
              <div className="mt-5 flex items-end gap-1 h-16">{waveform.map((h, i) => <span key={i} className="w-1 rounded-full bg-cyan-300/80 animate-pulse" style={{ height: `${h}px`, animationDelay: `${i * 0.04}s` }} />)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 bg-[#0B1120]">
        <div className="mx-auto max-w-7xl grid md:grid-cols-4 gap-4 auto-rows-[170px]">
          {features.map((f) => (
            <div key={f.title} className={`${f.size} rounded-3xl p-6 border border-white/15 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:scale-[1.01]`}>
              <f.icon className="text-cyan-300 mb-4" />
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="text-slate-300 mt-2 text-sm">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10">
          <div className="lg:sticky lg:top-24 h-fit">
            <h2 className="text-4xl font-semibold">From question to clarity in one continuous story.</h2>
            <p className="mt-4 text-slate-300">Scroll to watch how student doubt transforms into conceptual mastery and measurable progress.</p>
          </div>
          <div className="space-y-10">
            {["Student asks a question", "AI explains visually", "Whiteboard teaches", "AI adapts instantly", "Progress updated"].map((s, i) => (
              <div key={s} className="rounded-3xl p-7 border border-white/15 bg-white/5 backdrop-blur-xl transition duration-500 hover:-translate-y-1">
                <p className="text-cyan-300 text-sm mb-2">Step {i + 1}</p><h3 className="text-2xl">{s}</h3>
              </div>
            ))}
            <div className="h-1 w-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400" />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 overflow-x-auto snap-x snap-mandatory flex gap-6">
        {["STEM tutoring mode", "Language immersion mode", "Exam sprint mode", "Creative writing coach"].map((panel) => (
          <div key={panel} className="snap-start shrink-0 w-[80vw] lg:w-[38vw] rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl p-8 shadow-2xl">
            <h3 className="text-3xl font-semibold">{panel}</h3>
            <p className="mt-4 text-slate-300">Floating scenario panel with contextual AI behavior and subject-specific teaching interactions.</p>
          </div>
        ))}
      </section>

      <section className="px-6 py-24 bg-[#0B1120]">
        <div className="mx-auto max-w-5xl relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-indigo-400 to-fuchsia-400" />
          {roadmap.map((item, i) => (
            <div key={item} className="relative pl-16 pb-10">
              <div className="absolute left-0 top-1 size-10 rounded-full border border-cyan-300/80 bg-cyan-300/20 grid place-items-center">{i + 1}</div>
              <h3 className="text-2xl">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-6">
          <div className="rounded-3xl p-7 border border-white/15 bg-white/10"><h3 className="text-3xl mb-4">AI Speaking Interface</h3><div className="h-20 flex items-end gap-1">{waveform.map((h, i) => <div key={i} className="w-1 rounded-full bg-fuchsia-300/80 animate-pulse" style={{ height: `${h * 0.8}px`, animationDelay: `${i * 0.03}s` }} />)}</div><p className="mt-4 text-slate-300">Voice, notes generation, and adaptive prompt tuning in real-time.</p></div>
          <div className="rounded-3xl p-7 border border-white/15 bg-white/10"><h3 className="text-3xl mb-4">Holographic Whiteboard</h3><div className="rounded-2xl h-48 bg-black/30 border border-cyan-300/30 grid place-items-center text-cyan-200">Dynamic formula drawing + concept maps</div><p className="mt-4 text-slate-300">Animated draw-in effects with progressive concept layering.</p></div>
        </div>
      </section>

      <section className="px-6 py-24 bg-[#111827]">
        <div className="mx-auto max-w-7xl relative h-[400px]">
          {["Progress Analytics", "Weekly Reports", "Attendance", "Focus Score", "Weak Topic Alerts"].map((w, i) => (
            <div key={w} className="absolute rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-5" style={{ left: `${10 + i * 12}%`, top: `${10 + (i % 2) * 22}%` }}>
              <h4 className="font-medium">{w}</h4>
              <p className="text-sm text-slate-300 mt-1">Transparent parent insights with actionable signals.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl relative h-[420px] grid place-items-center">
          {["Parent: My child is finally engaged.", "Student: I understand math deeply now.", "+92% topic completion", "+38% focus score growth"].map((t, i) => (
            <div key={t} className="absolute rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl animate-pulse" style={{ transform: `translate(${(i - 1.5) * 120}px, ${(i % 2) * 110 - 60}px)`, animationDuration: `${6+i}s` }}>
              {t}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-28 bg-[radial-gradient(circle_at_top,#7C7CFF40,transparent_55%),#050816] text-center">
        <h2 className="text-5xl md:text-7xl font-semibold">Education should feel personal again.</h2>
        <p className="text-slate-300 mt-4 max-w-2xl mx-auto">Bring warmth, intelligence, and mentorship back into every learning session with an emotionally aware AI tutor.</p>
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link to="/register" className="rounded-2xl px-6 py-3 bg-gradient-to-r from-[#4DB6FF] via-[#7C7CFF] to-[#D946EF] text-[#050816] font-semibold">Start Free Trial</Link>
          <button className="rounded-2xl px-6 py-3 border border-white/20 bg-white/5">Meet Your AI Tutor</button>
        </div>
      </section>

      <footer className="px-6 py-10 border-t border-white/10 text-slate-400 text-sm flex items-center justify-center gap-2">
        <ShieldCheck className="size-4" /> Built with human-centered AI design principles.
      </footer>
    </main>
  );
};
