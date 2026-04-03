export const LearningOutcomesSection = () => {
  const outcomes = [
    {
      icon: "🗣️",
      stat: "87%",
      description: "Of learners speak 5+ minutes of fluent conversation within 3 months",
      highlight: "CONVERSATION FLUENCY",
    },
    {
      icon: "🎯",
      stat: "342%",
      description: "Average increase in proficiency level (CEFR) compared to traditional methods",
      highlight: "FASTER LEARNING",
    },
    {
      icon: "📊",
      stat: "94%",
      description: "Completion rate on assigned lessons — highest retention in language apps",
      highlight: "CONSISTENCY",
    },
    {
      icon: "⏱️",
      stat: "8 min avg",
      description: "Daily learning time with 94% saying they could sustain their streak indefinitely",
      highlight: "SUSTAINABLE HABIT",
    },
  ];

  return (
    <section className="section" style={{ backgroundColor: "var(--surface)" }}>
      <div className="container-landing">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-label mb-4">LEARNING OUTCOMES</h2>
          <h3
            className="text-4xl md:text-5xl font-bold text-text mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Real Results. Measured & Proven.
          </h3>
          <p className="text-text-2">
            These aren't marketing claims — they're averages from our learner community.
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {outcomes.map((outcome, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-8 border transition-all hover:border-accent"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="space-y-4">
                {/* Stat & Icon */}
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}>
                    {outcome.stat}
                  </span>
                  <span className="text-4xl">{outcome.icon}</span>
                </div>

                {/* Description */}
                <p className="text-text-2 leading-relaxed">{outcome.description}</p>

                {/* Highlight Label */}
                <div className="pt-4">
                  <span
                    className="inline-block px-3 py-1 rounded-lg text-xs font-bold tracking-wider"
                    style={{
                      backgroundColor: "rgba(0, 212, 170, 0.1)",
                      color: "var(--accent)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {outcome.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
