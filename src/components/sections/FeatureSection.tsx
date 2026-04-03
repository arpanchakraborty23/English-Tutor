import { FeatureCard } from "@/components/ui/FeatureCard";
import { BookOpen, Brain, MessageCircle, Repeat, Headphones, BarChart3 } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Bite-Sized Lessons",
    description: "Short, focused lessons that fit into your day. Learn in just 5 minutes between meetings.",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "Smart Repetition",
    description: "Spaced repetition adapts to your memory, surfacing words right before you'd forget them.",
  },
  {
    icon: <MessageCircle className="h-5 w-5" />,
    title: "Real Conversations",
    description: "Practice with AI conversation partners that respond naturally and correct you gently.",
  },
  {
    icon: <Repeat className="h-5 w-5" />,
    title: "Daily Streaks",
    description: "Build a habit with daily streaks and milestones. Consistency beats intensity every time.",
  },
  {
    icon: <Headphones className="h-5 w-5" />,
    title: "Native Audio",
    description: "Every word recorded by native speakers. Train your ear to hear the real language.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Progress Tracking",
    description: "Visual dashboards show vocabulary growth, streak history, and fluency milestones.",
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background pointer-events-none" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container relative space-y-14">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-block px-4 py-2 rounded-full bg-success/10 border border-success/20 backdrop-blur-sm">
            <span className="text-xs font-semibold text-success uppercase tracking-widest">🎯 Why Choose Polyglot</span>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl leading-tight">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">become fluent</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Designed by linguists, powered by AI. Learning that actually sticks.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className="group relative p-6 md:p-8 rounded-xl border border-border bg-card/40 hover:bg-card/60 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
            >
              {/* Icon background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative space-y-4">
                {/* Icon with background */}
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <div className="text-primary group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
