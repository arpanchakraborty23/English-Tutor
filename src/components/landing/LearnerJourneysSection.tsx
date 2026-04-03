import { ExternalLink } from "lucide-react";

const LEARNER_JOURNEYS = [
  {
    name: "Jessica's Japanese Journey",
    goal: "Business Japanese",
    timeline: "3 months",
    result: "Fluent in business meetings",
    languages: ["Japanese", "AI Tutoring"],
    emoji: "🇯🇵",
  },
  {
    name: "Marco's Multi-Language Push",
    goal: "B2 in 3 Languages",
    timeline: "6 months",
    result: "Passed DELF, DELE & KPD exams",
    languages: ["French", "Spanish", "German"],
    emoji: "🗺️",
  },
  {
    name: "Sofia's Professional Spanish",
    goal: "Spanish for Tech",
    timeline: "2 months",
    result: "Leading talks in Spanish",
    languages: ["Spanish", "Tech Vocabulary"],
    emoji: "💼",
  },
  {
    name: "Chen's Mandarin Mastery",
    goal: "Conversational Fluency",
    timeline: "4 months",
    result: "Travel-ready & business-confident",
    languages: ["Mandarin", "Pronunciation"],
    emoji: "🇨🇳",
  },
];

export const LearnerJourneysSection = () => {
  return (
    <section className="section" style={{ backgroundColor: "var(--surface)" }}>
      <div className="container-landing">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-label mb-4">LEARNER JOURNEYS</h2>
          <h3
            className="text-4xl md:text-5xl font-bold text-text mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Real Learners. Real Fluency.
          </h3>
          <p className="text-text-2">
            From zero to conversation-ready in months, not years. Here's how they did it.
          </p>
        </div>

        {/* Journeys Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {LEARNER_JOURNEYS.map((journey, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-8 border group hover:-translate-y-2 transition-all"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Header with Emoji */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h4 className="text-2xl font-bold text-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {journey.name}
                  </h4>
                  <p className="text-accent text-sm font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                    {journey.goal}
                  </p>
                </div>
                <span className="text-3xl">{journey.emoji}</span>
              </div>

              {/* Timeline & Result */}
              <div className="space-y-3 mb-6 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
                <div className="flex justify-between">
                  <span className="text-text-3 text-sm">Timeline</span>
                  <span className="text-text font-semibold">{journey.timeline}</span>
                </div>
                <div>
                  <span className="text-text-3 text-sm">Result</span>
                  <p className="text-text mt-1">{journey.result}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {journey.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: "rgba(0, 212, 170, 0.1)",
                      color: "var(--accent)",
                    }}
                  >
                    {lang}
                  </span>
                ))}
              </div>

              {/* CTA Link */}
              <div className="flex items-center gap-2 text-accent text-sm font-semibold mt-4 group-hover:gap-3 transition-all">
                Read full story <ExternalLink size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
