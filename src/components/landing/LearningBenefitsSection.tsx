import { BookOpen, MessageSquare, BarChart3, Zap } from "lucide-react";

const LEARNING_BENEFITS = [
  {
    icon: BookOpen,
    title: "Adaptive Curriculum",
    description:
      "Smart lessons that adjust difficulty based on your mistakes. Master foundations before moving forward.",
    color: "#00D4AA",
  },
  {
    icon: MessageSquare,
    title: "Real Conversations",
    description:
      "Chat with our AI tutor in your target language. No judgment, unlimited retries, instant feedback.",
    color: "#10B981",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Track your progress across vocabulary, grammar, pronunciation, and conversation skills in real-time.",
    color: "#F59E0B",
  },
  {
    icon: Zap,
    title: "Streak System",
    description:
      "Build consistency with our gamified streak tracking. Stay motivated with daily goals and achievements.",
    color: "#6366F1",
  },
];

export const LearningBenefitsSection = () => {
  return (
    <section className="section">
      <div className="container-landing">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="section-label mb-4">THE LINGUAAI ADVANTAGE</h2>
          <h3
            className="text-4xl md:text-5xl font-bold text-text mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            language learning, reimagined
          </h3>
          <p className="text-xl text-text-2">
            We've eliminated everything that doesn't work and doubled down on what does — AI-powered personalisation, real practice, and genuine progress.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {LEARNING_BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl p-8 border group hover:border-accent transition-all"
                style={{
                  backgroundColor: "var(--surface-2)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${benefit.color}20` }}
                  >
                    <Icon size={28} style={{ color: benefit.color }} />
                  </div>

                  {/* Title */}
                  <h4 className="text-2xl font-bold text-text" style={{ fontFamily: "var(--font-display)" }}>
                    {benefit.title}
                  </h4>

                  {/* Description */}
                  <p className="text-text-2 leading-relaxed">{benefit.description}</p>

                  {/* CTA Link */}
                  <div className="pt-4">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all"
                      style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}
                    >
                      Learn more → 
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
