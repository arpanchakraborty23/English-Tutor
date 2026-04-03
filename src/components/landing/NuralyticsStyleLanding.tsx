import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Check,
  Globe2,
  Languages,
  Menu,
  MessageCircle,
  Sparkles,
  Star,
  X,
} from "lucide-react";

const navItems = [
  { name: "Home", id: "hero" },
  { name: "Features", id: "services" },
  { name: "About", id: "about" },
  { name: "Success", id: "testimonials" },
  { name: "Pricing", id: "pricing" },
  { name: "Contact", id: "contact" },
];

const services = [
  {
    number: "01",
    icon: Brain,
    title: "Adaptive AI Tutor",
    description:
      "Each lesson changes in real time based on grammar mistakes, confidence level, and speaking pace.",
    points: ["Personalized path", "Smart revision loops", "Daily difficulty tuning"],
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Conversation Simulator",
    description:
      "Practice real conversations for travel, interviews, meetings, and daily life with instant feedback.",
    points: ["Role-play scenarios", "Pronunciation hints", "Context-based vocabulary"],
  },
  {
    number: "03",
    icon: Globe2,
    title: "Progress Intelligence",
    description:
      "Track speaking, listening, reading, and writing with clear CEFR milestones and actionable guidance.",
    points: ["A1-C2 tracking", "Weak area detection", "Weekly progress reports"],
  },
];

const testimonials = [
  {
    quote:
      "I stopped memorizing random lists and started speaking naturally in 5 weeks. The daily plan keeps me consistent.",
    name: "Aarav S.",
    role: "Software Engineer, Learning German",
  },
  {
    quote:
      "The conversation simulator helped me prepare for my visa interview. I finally felt confident answering in Spanish.",
    name: "Meera K.",
    role: "Graduate Student, Learning Spanish",
  },
  {
    quote:
      "My team uses it for business English coaching. The AI feedback is sharp, practical, and easy to apply.",
    name: "Nikhil R.",
    role: "Operations Manager",
  },
];

const trustMetrics = [
  { value: "2.4M", label: "Practice sessions completed" },
  { value: "94%", label: "Learners feel more confident in 90 days" },
  { value: "4.8/5", label: "Average rating across 50k+ reviews" },
  { value: "78%", label: "Higher retention vs static lesson apps" },
  { value: "87%", label: "Professionals reporting career impact" },
  { value: "35+", label: "New lesson modules shipped every week" },
];

const personas = [
  {
    title: "Global Professionals",
    description: "Need practical speaking for meetings, interviews, and international collaboration.",
  },
  {
    title: "Frequent Travelers",
    description: "Want confident real-world conversation for local transport, dining, and emergencies.",
  },
  {
    title: "Lifelong Learners",
    description: "Care about steady cognitive growth, consistent habits, and clear progress milestones.",
  },
  {
    title: "Heritage Connectors",
    description: "Learning to reconnect with family roots, culture, and multilingual communities.",
  },
];

const learningPath = [
  {
    step: "01",
    title: "Foundation (Weeks 1-2)",
    description: "Build core vocabulary, daily phrases, and listening familiarity with adaptive spaced repetition.",
  },
  {
    step: "02",
    title: "Conversation Build (Weeks 3-6)",
    description: "Train short speaking loops with instant pronunciation and grammar corrections.",
  },
  {
    step: "03",
    title: "Immersion Practice (Weeks 7-10)",
    description: "Learn from realistic content and topic-based scenarios tailored to your goals.",
  },
  {
    step: "04",
    title: "Real-World Simulation (Weeks 11-14)",
    description: "Practice interviews, travel situations, and workplace conversations end-to-end.",
  },
  {
    step: "05",
    title: "Fluency Maintenance (Ongoing)",
    description: "Use revision systems and weekly routines to keep progress stable without burnout.",
  },
];

const faqs = [
  {
    q: "How quickly can I become conversational in a new language?",
    a: "Most learners notice practical speaking progress in 4 to 6 weeks with consistent daily sessions.",
  },
  {
    q: "Can I learn multiple languages at the same time?",
    a: "Yes. Pro plans support multi-language tracks with separate goals, level maps, and revision queues.",
  },
  {
    q: "How is this different from standard language apps?",
    a: "Lessons adapt to your mistakes and confidence level, so learning stays personal instead of generic.",
  },
  {
    q: "Do you support speaking and pronunciation feedback?",
    a: "Yes. Conversation mode analyzes pronunciation clarity, pacing, and grammar in every speaking drill.",
  },
  {
    q: "Is there support for teams or schools?",
    a: "Yes. Team plans include cohort tracking, manager dashboards, and guided onboarding support.",
  },
  {
    q: "What if I stop for a while and come back?",
    a: "The system recalibrates your level and automatically rebuilds a realistic recovery plan.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$0",
    subtitle: "For first-time learners",
    features: ["1 active language", "Daily bite-size lessons", "Basic progress tracking"],
    cta: "Start Free",
    to: "/register",
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    subtitle: "Per month, billed monthly",
    features: ["Unlimited conversation practice", "Pronunciation coaching", "Advanced analytics + weekly report"],
    cta: "Go Pro",
    to: "/register",
    featured: true,
  },
  {
    name: "Team",
    price: "$79",
    subtitle: "Up to 8 learners",
    features: ["Shared team dashboard", "Manager insights", "Priority support + onboarding"],
    cta: "Book a Demo",
    to: "/login",
    featured: false,
  },
];

export const NuralyticsStyleLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoursPerWeek, setHoursPerWeek] = useState(4);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const savedHours = useMemo(() => Math.round(hoursPerWeek * 0.35 * 52), [hoursPerWeek]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <div className={`mx-auto transition-all duration-500 ${isScrolled ? "max-w-4xl" : "max-w-5xl"}`}>
          <nav className="glass-nav flex items-center justify-between h-14 px-6 rounded-full">
            <button className="flex items-center gap-2" onClick={() => scrollToSection("hero")}> 
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                <Languages className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="font-bold text-lg text-primary font-display">LinguaTutor</span>
            </button>

            <div className="hidden lg:flex items-center gap-7 text-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white/70 hover:text-emerald-400 transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="button-outline-green px-4 py-2 text-sm rounded-xl">
                Log in
              </Link>
              <Link to="/register" className="button-gradient px-4 py-2 text-sm rounded-xl inline-flex items-center gap-1.5">
                Start free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <button
              className="md:hidden text-white/80"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>

        {isMobileMenuOpen && (
          <div className="max-w-5xl mx-auto mt-2 p-4 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-white/75 hover:text-emerald-400 transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link to="/login" className="button-outline-green rounded-lg px-3 py-2 text-center text-sm">
                  Log in
                </Link>
                <Link to="/register" className="button-gradient rounded-lg px-3 py-2 text-center text-sm">
                  Start free
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <section id="hero" className="relative min-h-screen pt-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="container px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-card/40 backdrop-blur-sm mb-8">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-medium">4.9 rated by 50,000+ learners</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.05] font-display">
              Learn Languages
              <br className="hidden sm:block" />
              Faster With <span className="text-gradient">AI Precision</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              LinguaTutor builds your personal learning system with adaptive lessons, real-time speaking feedback, and
              conversation drills designed for fluency.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link to="/register" className="button-gradient arrow-hover rounded-xl px-6 py-3 inline-flex items-center gap-2">
                Start Learning <ArrowRight className="w-4 h-4 arrow-icon" />
              </Link>
              <button onClick={() => scrollToSection("services")} className="button-outline-green rounded-xl px-6 py-3 inline-flex items-center gap-2">
                Explore Features <Sparkles className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-4 md:p-6 text-left">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs text-white/40 ml-2">linguatutor.app/session/live</span>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { label: "Speaking Score", value: "82%", change: "+12%" },
                    { label: "Words Mastered", value: "1,240", change: "+84" },
                    { label: "Weekly Streak", value: "19 days", change: "+3" },
                  ].map((card) => (
                    <div key={card.label} className="rounded-xl p-4 border border-white/10 bg-white/[0.02]">
                      <p className="text-xs text-white/50 mb-1">{card.label}</p>
                      <p className="text-2xl font-semibold text-white">{card.value}</p>
                      <p className="text-xs text-emerald-400 mt-1">{card.change}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative py-28">
        <div className="section-divider" />
        <div className="container px-4 relative">
          <div className="text-center mb-16">
            <span className="section-badge">Core Features</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-6 tracking-tight font-display leading-[1.1]">
              A Full <span className="text-gradient">Language Growth System</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-5 max-w-2xl mx-auto">
              Everything needed to move from beginner lessons to confident speaking in real-world situations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.number}
                  className="rounded-3xl p-7 border border-white/10 bg-white/[0.02] hover:border-emerald-500/35 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-semibold tracking-widest text-white/40">{service.number}</span>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/10 border border-emerald-500/25">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 font-display">{service.title}</h3>
                  <p className="text-white/65 leading-relaxed mb-5">{service.description}</p>
                  <ul className="space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="text-sm text-white/70 flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" /> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {trustMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl p-5 border border-white/10 bg-white/[0.02] text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-emerald-400 font-display">{metric.value}</p>
                <p className="text-xs md:text-sm text-white/65 mt-1.5">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="section-divider" />
        <div className="container px-4 relative">
          <div className="text-center mb-14">
            <span className="section-badge">Who This Is For</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-6 tracking-tight font-display leading-[1.1]">
              Built for Different <span className="text-gradient">Learning Goals</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {personas.map((persona) => (
              <div key={persona.title} className="rounded-3xl p-7 border border-white/10 bg-white/[0.02]">
                <h3 className="text-2xl font-semibold font-display mb-3">{persona.title}</h3>
                <p className="text-white/70 leading-relaxed">{persona.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="section-badge">Learning Path</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-6 tracking-tight font-display leading-[1.1]">
              Your Roadmap to <span className="text-gradient">Practical Fluency</span>
            </h2>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {learningPath.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl p-6 md:p-7 border border-white/10 bg-white/[0.02] md:flex items-start gap-6"
              >
                <p className="text-4xl md:text-5xl font-bold text-emerald-500/30 font-display mb-2 md:mb-0">
                  {item.step}
                </p>
                <div>
                  <h3 className="text-2xl font-semibold font-display mb-2">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative py-28 bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-black/50 to-background pointer-events-none" />
        <div className="container px-4 relative">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="section-badge">About LinguaTutor</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-6 mb-6 tracking-tight font-display leading-[1.1]">
                We Build Learning Plans That <span className="text-gradient">Actually Stick</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-7">
                Most apps stop at gamification. LinguaTutor focuses on practical fluency with adaptive repetition,
                contextual conversation practice, and measurable skill growth.
              </p>
              <p className="text-white/70 leading-relaxed">
                Learners typically report stronger speaking confidence within 30 days and measurable CEFR progress in
                the first 8 to 10 weeks.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { value: "50k+", label: "Active Learners" },
                { value: "40+", label: "Languages Offered" },
                { value: "92%", label: "Weekly Completion Rate" },
                { value: "4.9/5", label: "Average Satisfaction" },
              ].map((metric) => (
                <div key={metric.label} className="rounded-2xl p-5 border border-white/10 bg-white/[0.02] flex items-center justify-between">
                  <p className="text-white/65 text-sm">{metric.label}</p>
                  <p className="text-2xl font-semibold text-emerald-400">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-3xl p-8 border border-emerald-500/20 bg-emerald-500/[0.05]">
            <p className="text-sm text-white/70 mb-2">Learning Time Estimator</p>
            <div className="grid md:grid-cols-[1fr_auto] gap-5 items-center">
              <div>
                <label className="text-sm text-white/70 block mb-2">Hours you can study each week: {hoursPerWeek}</label>
                <input
                  type="range"
                  min={2}
                  max={14}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-black/20 px-6 py-4 text-center">
                <p className="text-xs text-white/60">Projected focused practice / year</p>
                <p className="text-3xl font-bold text-emerald-400">{savedHours} hrs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="relative py-28">
        <div className="section-divider" />
        <div className="container px-4 relative">
          <div className="text-center mb-16">
            <span className="section-badge">Learner Stories</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-6 tracking-tight font-display leading-[1.1]">
              Real <span className="text-gradient">Fluency Wins</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-3xl p-7 border border-white/10 bg-white/[0.02]">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>
                <p className="text-white/80 leading-relaxed mb-5">"{item.quote}"</p>
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-white/55">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative py-28 bg-background">
        <div className="container px-4">
          <div className="text-center mb-14">
            <span className="section-badge">Pricing</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-6 tracking-tight font-display leading-[1.1]">
              Choose Your <span className="text-gradient">Learning Pace</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-7 border ${
                  plan.featured
                    ? "border-emerald-500/40 bg-emerald-500/[0.07]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <p className="text-sm text-white/65 mb-1">{plan.name}</p>
                <p className="text-4xl font-bold font-display text-white mb-2">{plan.price}</p>
                <p className="text-sm text-white/60 mb-6">{plan.subtitle}</p>
                <ul className="space-y-2 mb-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-sm text-white/75 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" /> {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.to}
                  className={`w-full justify-center rounded-xl px-4 py-2.5 inline-flex items-center gap-2 ${
                    plan.featured ? "button-gradient" : "button-outline-green"
                  }`}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28">
        <div className="section-divider" />
        <div className="container px-4">
          <div className="text-center mb-14">
            <span className="section-badge">FAQ</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-6 tracking-tight font-display leading-[1.1]">
              Questions Before You <span className="text-gradient">Start</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <summary className="cursor-pointer list-none text-white font-semibold flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-emerald-400 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-white/70 leading-relaxed mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-28 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center_bottom,rgba(16,185,129,0.08),transparent_70%)]" />
        <div className="container px-4 relative">
          <div className="text-center mb-14">
            <span className="section-badge">Let&apos;s Start</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-6 tracking-tight font-display leading-[1.1]">
              Ready to <span className="text-gradient">Speak With Confidence?</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-5 max-w-2xl mx-auto">
              Start free today and get a personalized weekly plan in under two minutes.
            </p>
          </div>

          <div className="max-w-3xl mx-auto rounded-3xl p-8 border border-white/10 bg-white/[0.02] text-center">
            <div className="grid sm:grid-cols-2 gap-3">
              <Link to="/register" className="button-gradient rounded-xl px-5 py-3 inline-flex items-center justify-center gap-2">
                Create Free Account <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="button-outline-green rounded-xl px-5 py-3 inline-flex items-center justify-center gap-2">
                I Already Have an Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-background">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="container px-4 pt-16 pb-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                  <Languages className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="font-bold text-xl text-white font-display">LinguaTutor</span>
              </div>
              <p className="text-white/55 text-sm leading-relaxed max-w-xs">
                Adaptive language tutoring platform for learners, teams, and institutions that want measurable fluency outcomes.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:justify-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm text-white/60 hover:text-emerald-400 transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="md:text-right">
              <p className="text-sm text-white/45">support@linguatutor.app</p>
              <p className="text-sm text-white/45 mt-1">Mon-Fri, 9:00 AM-6:00 PM</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
