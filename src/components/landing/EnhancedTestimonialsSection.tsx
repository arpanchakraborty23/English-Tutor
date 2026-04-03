import { Star } from "lucide-react";

const ENHANCED_TESTIMONIALS = [
  {
    quote:
      "I've spent $3,000+ on traditional courses with minimal results. Three months with LinguaAI and I'm holding 20-minute conversations in Japanese. The AI tutor corrects my pronunciation in real-time and explains the 'why' behind grammar. Game changer.",
    author: "Priya Singh",
    title: "Product Manager, Google",
    location: "San Francisco, USA",
    improvement: "Beginner → B1 in 3 months",
    rating: 5,
    flag: "🇺🇸",
  },
  {
    quote:
      "The streak system keeps me accountable. I've learned more Spanish for my business in 2 months than I did in 2 years of Duolingo. The conversation practice is what sold me. No translation, just real dialogue.",
    author: "Marcus Torres",
    title: "Founder, StartupXYZ",
    location: "Madrid, Spain",
    improvement: "A2 → B2 in 2 months",
    rating: 5,
    flag: "🇪🇸",
  },
  {
    quote:
      "As a busy parent, 15-minute lessons fit perfectly. My kids are learning alongside me now. The adaptive difficulty means we're always challenged but never frustrated. Best decision for our family.",
    author: "Aigerim Bekbayeva",
    title: "Healthcare Executive",
    location: "Almaty, Kazakhstan",
    improvement: "Zero → Conversational in 4 months",
    rating: 5,
    flag: "🇰🇿",
  },
];

export const EnhancedTestimonialsSection = () => {
  return (
    <section className="section">
      <div className="container-landing">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-label mb-4">LEARNER VOICES</h2>
          <h3
            className="text-4xl md:text-5xl font-bold text-text mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What Our Communities Say
          </h3>
          <p className="text-text-2">
            Unfiltered feedback from real learners who've achieved fluency using LinguaAI.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {ENHANCED_TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-8 border bg-surface-2 hover:border-accent transition-all"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--surface-2)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--warning)" style={{ color: "var(--warning)" }} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-text-2 italic mb-8 leading-relaxed">"{testimonial.quote}"</p>

              {/* Improvement Badge */}
              <div className="mb-6 pb-6 border-t border-opacity-50" style={{ borderColor: "var(--border)" }}>
                <p className="text-xs text-text-3 mb-2">PROGRESS</p>
                <p className="text-sm font-semibold text-accent">{testimonial.improvement}</p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {testimonial.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-text font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-text-3 text-xs">{testimonial.title}</p>
                </div>
                <span className="text-xl">{testimonial.flag}</span>
              </div>

              {/* Location */}
              <p className="text-text-3 text-xs mt-2">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
