const TESTIMONIALS = [
  {
    quote:
      "I tried Duolingo for a year and barely got past basic phrases. Three months with LinguaAI and I held a real conversation with my Japanese colleague. The AI tutor actually explains the 'why' behind grammar.",
    author: "Priya S.",
    location: "Bengaluru, India",
    flag: "🇮🇳",
    initials: "PS",
  },
  {
    quote:
      "The professional track was exactly what I needed. It taught me how to write business emails in French, not just 'where is the bathroom.' I got the job posting I wanted within 6 months.",
    author: "Marcus T.",
    location: "Toronto, Canada",
    flag: "🇨🇦",
    initials: "MT",
  },
  {
    quote:
      "I learn 15 minutes a day during my commute. The streak feature keeps me honest. I haven't missed a day in 4 months.",
    author: "Aigerim K.",
    location: "Almaty, Kazakhstan",
    flag: "🇰🇿",
    initials: "AK",
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section" style={{ backgroundColor: "var(--surface)" }}>
      <div className="container-landing">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-label mb-4">WHAT LEARNERS SAY</h2>
          <h3
            className="text-4xl md:text-5xl font-bold text-text"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Real people. Real progress.
          </h3>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={idx}
              className="card-landing"
              style={{
                backgroundColor: "var(--surface)",
                borderTop: "2px solid var(--accent)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-warning">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-text-2 mb-6 italic">"{testimonial.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-text font-semibold">{testimonial.author}</p>
                  <p className="text-text-3 text-sm">
                    {testimonial.location} {testimonial.flag}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
