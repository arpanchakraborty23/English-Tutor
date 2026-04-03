import { useEffect, useState } from "react";

const FEATURES = [
  {
    icon: "🧠",
    title: "AI-powered personalisation",
    description: "Lessons rebuild themselves around what you struggle with. The more you practice, the smarter it gets.",
    featured: true,
  },
  {
    icon: "💬",
    title: "Real conversation practice",
    description: "Chat with an AI tutor in your target language. No judgement, no rushing — just real dialogue.",
  },
  {
    icon: "📊",
    title: "Proficiency tracking",
    description: "See exactly where you are on the A1–C2 scale, updated after every lesson.",
  },
  {
    icon: "🎯",
    title: "Goal-based learning",
    description: "Whether you're prepping for a business meeting or a holiday, your curriculum adapts to your purpose.",
  },
  {
    icon: "🔔",
    title: "Daily streaks & reminders",
    description: "Stay consistent with streak tracking, XP rewards, and gentle nudges at the time you choose.",
  },
  {
    icon: "🌍",
    title: "40+ languages",
    description: "From Spanish and Mandarin to Swahili and Bengali — every language taught with the same depth.",
  },
];

export const FeaturesSection = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);

  useEffect(() => {
    // Simulate scroll-based reveal
    FEATURES.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleFeatures((prev) => [...prev, idx]);
      }, idx * 100);
    });
  }, []);

  return (
    <section id="features" className="section">
      <div className="container-landing">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-label mb-4">FEATURES</h2>
          <h3
            className="text-4xl md:text-5xl font-bold text-text mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Everything you need to go from beginner to fluent
          </h3>
          <p className="text-text-2">
            Built around how humans actually learn languages — not textbooks.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className={`card-landing group transition-all duration-500 ${
                visibleFeatures.includes(idx) ? "reveal visible" : "reveal"
              } ${feature.featured ? "md:col-span-3 border-l-4" : ""}`}
              style={{
                borderLeftColor: feature.featured ? "var(--accent)" : undefined,
              }}
            >
              <div className="flex gap-4">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: "var(--accent-glow)" }}
                >
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {feature.title}
                  </h4>
                  <p className="text-text-2">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
