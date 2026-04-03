export const ProblemSolutionSection = () => {
  const problems = [
    "Expensive private tutors ($40–80/hr)",
    "Boring apps with no real conversation",
    "One-size-fits-all lessons that ignore your level",
    "No flexibility — fixed schedules",
    "Zero feedback on your pronunciation",
  ];

  const solutions = [
    "AI tutor available 24/7, completely free to start",
    "Real conversations that adapt to your vocabulary",
    "Personalised from day one based on your level & goals",
    "5 minutes or 50 — learn on your schedule",
    "Instant feedback on every answer, every session",
  ];

  return (
    <section className="section">
      <div className="container-landing">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-label mb-4">WHY LINGUAAI</h2>
          <h3
            className="text-4xl md:text-5xl font-bold text-text mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The problem with traditional language learning
          </h3>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-stretch">
          {/* Problems Column */}
          <div className="space-y-6">
            {problems.map((problem, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 text-2xl">❌</div>
                <p className="text-text-2" style={{ fontFamily: "var(--font-body)" }}>
                  {problem}
                </p>
              </div>
            ))}
          </div>

          {/* Divider on desktop */}
          <div
            className="hidden md:block absolute inset-y-0 left-1/2 w-px"
            style={{
              backgroundColor: "var(--border)",
              top: "25%",
              bottom: "25%",
            }}
          />

          {/* Solutions Column */}
          <div className="space-y-6">
            {solutions.map((solution, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 text-2xl">✅</div>
                <p className="text-text-2" style={{ fontFamily: "var(--font-body)" }}>
                  {solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
