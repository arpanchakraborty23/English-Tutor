const STEPS = [
  {
    number: "①",
    title: "Sign up in 60 seconds",
    description:
      "Create your account, tell us what language you want to learn, your current level, and how much time you have each day.",
    visual: "📝",
  },
  {
    number: "②",
    title: "We build your personalised path",
    description:
      "Our AI analyses your profile and creates a curriculum just for you — vocabulary, grammar, conversation topics based on your goal.",
    visual: "🎯",
  },
  {
    number: "③",
    title: "Learn through daily lessons",
    description:
      "Complete short, interactive lessons — multiple choice, fill-in-the-blank, translation, and real conversation with the AI tutor.",
    visual: "📚",
  },
  {
    number: "④",
    title: "Track your progress & stay motivated",
    description:
      "Watch your level climb, maintain your streak, and unlock achievements as you hit milestones on your journey to fluency.",
    visual: "🏆",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section">
      <div className="container-landing">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-label mb-4">HOW IT WORKS</h2>
          <h3
            className="text-4xl md:text-5xl font-bold text-text"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From zero to conversational in 4 steps
          </h3>
        </div>

        {/* Timeline */}
        <div className="space-y-12 md:space-y-16 relative">
          {/* Vertical line for desktop */}
          <div
            className="hidden md:block absolute left-12 top-0 bottom-0 w-px"
            style={{
              backgroundImage:
                "linear-gradient(180deg, var(--border) 0%, var(--border) 40%, transparent 100%)",
            }}
          />

          {STEPS.map((step, idx) => (
            <div key={idx} className="md:flex gap-12 items-start relative">
              {/* Step Number */}
              <div className="flex-shrink-0 mb-6 md:mb-0 md:w-24">
                <div
                  className="text-6xl font-bold"
                  style={{
                    color: "var(--accent)",
                    opacity: 0.15,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <h4 className="text-2xl font-bold text-text" style={{ fontFamily: "var(--font-display)" }}>
                  {step.title}
                </h4>
                <p className="text-text-2 text-lg">{step.description}</p>

                {/* Visual Mockup Card */}
                <div
                  className="mt-6 p-8 rounded-2xl flex items-center justify-center min-h-48 text-4xl"
                  style={{
                    backgroundColor: "var(--surface-2)",
                    borderColor: "var(--border)",
                    border: "1px solid",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                    transform: idx % 2 === 0 ? "rotate(-1.5deg)" : "rotate(1.5deg)",
                  }}
                >
                  {step.visual}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
