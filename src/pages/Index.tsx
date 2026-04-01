import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { BookOpen, Brain, MessageCircle, Repeat, Headphones, BarChart3 } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Bite-Sized Lessons",
    description: "Short, focused lessons that fit into your day. Learn in just 5 minutes between meetings or on your commute.",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Smart Repetition",
    description: "Our spaced repetition algorithm adapts to your memory, surfacing words right before you'd forget them.",
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Real Conversations",
    description: "Practice with AI conversation partners that respond naturally and correct you gently along the way.",
  },
  {
    icon: <Repeat className="h-6 w-6" />,
    title: "Daily Streaks",
    description: "Build a habit with daily streaks and milestones. Consistency beats intensity every time.",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "Native Audio",
    description: "Every word and sentence recorded by native speakers. Train your ear to hear the real language.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Progress Tracking",
    description: "Visual dashboards show your vocabulary growth, streak history, and fluency milestones over time.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        {/* Features */}
        <section id="features" className="py-20 bg-card/30">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="font-heading text-3xl md:text-4xl">
                Everything you need to become fluent
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A complete toolkit designed by linguists and engineers to make language learning effective, enjoyable, and lasting.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container text-center space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl">
              Ready to start your journey?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join millions of learners building real fluency every day. Your first lesson is free.
            </p>
            <div className="flex justify-center">
              <a href="#" className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent/90 transition-colors">
                Start Learning Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
