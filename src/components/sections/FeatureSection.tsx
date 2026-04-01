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
    <section id="features" className="py-16 md:py-20 bg-card/30">
      <div className="container space-y-10">
        <header className="text-center space-y-3">
          <h2 className="font-heading text-2xl md:text-3xl">
            Everything you need to become fluent
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
            A complete toolkit designed by linguists and engineers to make language learning effective and lasting.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
