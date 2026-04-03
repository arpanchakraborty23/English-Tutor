import { Link } from "react-router-dom";

export const FinalCTASection = () => {
  return (
    <section className="section relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(0, 212, 170, 0.1) 0%, transparent 70%)`,
        }}
      />

      <div className="container-landing relative z-10 text-center space-y-8 max-w-3xl mx-auto">
        {/* Headline */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-text"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ready to start speaking a new language?
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-text-2">
          Join 50,000+ learners already on their journey to fluency. Start learning for free today.
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <Link to="/register" className="btn-primary-landing inline-block">
            Start learning for free →
          </Link>
        </div>

        {/* Fine Print */}
        <p className="text-sm text-text-3" style={{ fontFamily: "var(--font-mono)" }}>
          No credit card · Cancel anytime
        </p>
      </div>
    </section>
  );
};
