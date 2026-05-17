import { ArrowRight, BarChart3, Bot, Brain, CalendarCheck2, CheckCircle2, MessageCircleQuestion, Mic, PenTool, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const featureBento = [
  { title: "AI Voice Tutor", body: "Human-like tone, pacing, and emphasis to replicate a live teacher.", icon: Mic, className: "md:col-span-2" },
  { title: "Whiteboard Teaching", body: "Step-by-step explanation layers for formulas, graphs, and reasoning.", icon: PenTool, className: "md:col-span-1" },
  { title: "Adaptive Learning", body: "Teaching style shifts by confidence, speed, and knowledge gaps.", icon: Brain, className: "md:col-span-1" },
  { title: "Real-Time Doubts", body: "Ask naturally and get instant visual + verbal explanation loops.", icon: MessageCircleQuestion, className: "md:col-span-2" },
  { title: "Study Planner", body: "Daily targets mapped to your syllabus and exam timeline.", icon: CalendarCheck2, className: "md:col-span-1" },
  { title: "Parent Dashboard", body: "Progress, focus, attendance, and weak-topic alerts in one view.", icon: BarChart3, className: "md:col-span-1" },
];

const storySteps = ["Student asks question", "AI explains visually", "Whiteboard demonstrates", "AI adapts depth instantly", "Progress updates live"];
const scenarios = ["Math concept mastery", "Science visualization", "Language speaking lab", "Exam revision sprint"];
const roadmap = ["Assessment", "Daily learning", "Revision cycles", "Weak topic detection", "Exam preparation"];
const parentMetrics = ["Progress Analytics", "Weekly Reports", "Attendance", "Focus Score", "Weak Topic Alerts"];
const testimonials = [
  "“My child now asks for study time. The AI feels like a real mentor.” — Parent",
  "“I improved from confusion to confidence in algebra within 3 weeks.” — Student",
  "+92% syllabus completion among consistent learners",
  "+38% average focus score improvement",
];

const GlassCard = ({ className, style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) => (
  <div style={style} className={`rounded-2xl border border-white/50 bg-white/65 backdrop-blur-xl shadow-[0_10px_40px_rgba(124,124,255,.12)] ${className ?? ""}`}>{children}</div>
);

export const NuralyticsStyleLanding = () => {
  return (
    <main className="bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden">
      <section className="relative min-h-screen px-6 pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#4DB6FF30,transparent_35%),radial-gradient(circle_at_85%_15%,#D946EF24,transparent_30%),radial-gradient(circle_at_50%_100%,#7C7CFF30,transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#64748B]"><Sparkles className="size-3.5 text-[#7C7CFF]" /> Human-centered AI tutor</p>
            <h1 className="mt-6 text-5xl md:text-7xl leading-tight font-semibold">Education becomes personal, adaptive, and deeply human again.</h1>
            <p className="mt-6 max-w-xl text-[#64748B] text-lg">An emotionally intelligent AI Tutor that teaches by voice, explains on interactive whiteboards, and adapts in real-time to each student.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/register" className="rounded-2xl px-6 py-3 text-white bg-gradient-to-r from-[#4DB6FF] via-[#7C7CFF] to-[#D946EF] shadow-[0_8px_28px_rgba(124,124,255,.35)] hover:-translate-y-0.5 transition inline-flex items-center gap-2">Start Free Trial <ArrowRight className="size-4" /></Link>
              <button className="rounded-2xl px-6 py-3 bg-white/80 border border-white text-[#0F172A] hover:bg-white transition">Meet Your AI Tutor</button>
            </div>
          </div>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between text-sm text-[#64748B]"><span>Live AI Teaching Session</span><Bot className="size-4 text-[#7C7CFF]" /></div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-gradient-to-br from-[#4DB6FF14] to-[#7C7CFF14]">Voice explanation in progress...</div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-[#D946EF14] to-[#7C7CFF14]">Floating syllabus roadmap</div>
            </div>
            <div className="mt-4 h-16 flex items-end gap-1">{Array.from({ length: 24 }).map((_, i) => <span key={i} className="w-1 rounded-full bg-[#7C7CFF] animate-pulse" style={{ height: `${10 + ((i * 7) % 35)}px`, animationDelay: `${i * 0.03}s` }} />)}</div>
          </GlassCard>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl grid md:grid-cols-4 gap-4 auto-rows-[170px]">
          {featureBento.map((item) => (
            <GlassCard key={item.title} className={`${item.className} p-6 hover:-translate-y-1 transition`}>
              <item.icon className="size-5 text-[#7C7CFF]" />
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-[#64748B]">{item.body}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 bg-white">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10">
          <div className="lg:sticky lg:top-24 h-fit">
            <h2 className="text-4xl font-semibold">Scroll the learning story.</h2>
            <p className="mt-4 text-[#64748B]">Each stage transforms UI state from question to understanding.</p>
          </div>
          <div className="space-y-6">
            {storySteps.map((step, i) => (
              <GlassCard key={step} className="p-6 hover:shadow-[0_14px_40px_rgba(77,182,255,.16)] transition">
                <p className="text-xs uppercase tracking-wider text-[#64748B]">Step {i + 1}</p>
                <h3 className="mt-2 text-2xl">{step}</h3>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 overflow-x-auto snap-x snap-mandatory flex gap-5">
        {scenarios.map((title) => (
          <GlassCard key={title} className="snap-start shrink-0 w-[84vw] lg:w-[38vw] p-8 bg-gradient-to-br from-white to-[#EEF4FF]">
            <h3 className="text-3xl font-semibold">{title}</h3>
            <p className="mt-4 text-[#64748B]">Horizontal panel mode for subject-specific tutoring and interaction patterns.</p>
          </GlassCard>
        ))}
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="mx-auto max-w-4xl relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#4DB6FF] via-[#7C7CFF] to-[#D946EF]" />
          {roadmap.map((step, i) => (
            <div key={step} className="relative pl-16 pb-10">
              <div className="absolute left-0 top-0 size-10 rounded-full bg-white border border-[#7C7CFF66] grid place-items-center text-sm">{i + 1}</div>
              <h3 className="text-2xl font-medium">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-3xl font-semibold">AI Speaking Interface</h3>
            <div className="mt-5 h-20 flex items-end gap-1">{Array.from({ length: 28 }).map((_, i) => <span key={i} className="w-1 rounded-full bg-[#D946EF] animate-pulse" style={{ height: `${12 + ((i * 11) % 36)}px`, animationDelay: `${i * 0.025}s` }} />)}</div>
            <p className="mt-4 text-[#64748B]">Live voice waveform, smart notes, and adaptive explanation tone.</p>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="text-3xl font-semibold">Interactive Whiteboard</h3>
            <div className="mt-5 rounded-xl h-48 bg-gradient-to-br from-[#EEF4FF] to-white border border-white grid place-items-center text-[#64748B]">Dynamic formula drawing + concept map overlays</div>
            <p className="mt-4 text-[#64748B]">Visual-first tutoring with clear, layered reasoning structure.</p>
          </GlassCard>
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="mx-auto max-w-7xl relative h-[390px]">
          {parentMetrics.map((m, i) => (
            <GlassCard key={m} className="absolute p-5 w-56" style={{ left: `${8 + i * 14}%`, top: `${10 + (i % 2) * 24}%` }} >
              <h4 className="font-medium">{m}</h4>
              <p className="mt-2 text-sm text-[#64748B]">Trust-building, transparent family reporting.</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl relative h-[400px] grid place-items-center">
          {testimonials.map((text, i) => (
            <GlassCard key={text} className="absolute p-4 max-w-xs animate-pulse" style={{ transform: `translate(${(i - 1.5) * 130}px, ${(i % 2) * 100 - 50}px)` }} >
              <p className="text-sm">{text}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="px-6 py-28 text-center bg-[radial-gradient(circle_at_top,#4DB6FF35,transparent_45%),radial-gradient(circle_at_bottom,#D946EF2f,transparent_42%),#F8FAFC]">
        <h2 className="text-5xl md:text-7xl font-semibold">Education should feel personal again.</h2>
        <p className="mt-4 max-w-2xl mx-auto text-[#64748B]">Build confidence, curiosity, and consistency with an AI mentor students trust.</p>
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link to="/register" className="rounded-2xl px-6 py-3 text-white bg-gradient-to-r from-[#4DB6FF] via-[#7C7CFF] to-[#D946EF] shadow-[0_8px_28px_rgba(124,124,255,.35)]">Start Free Trial</Link>
          <button className="rounded-2xl px-6 py-3 bg-white border border-white">Meet Your AI Tutor</button>
        </div>
      </section>

      <footer className="px-6 py-10 border-t border-[#E2E8F0] text-[#64748B] text-sm text-center inline-flex w-full items-center justify-center gap-2">
        <CheckCircle2 className="size-4" /> Designed for emotionally intelligent learning.
      </footer>
    </main>
  );
};
