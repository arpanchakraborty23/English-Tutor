import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

const LANGUAGES = ["Spanish", "Japanese", "French", "Mandarin", "Arabic", "German", "Portuguese"];

export const HeroSection = () => {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentLanguageIndex((prev) => (prev + 1) % LANGUAGES.length);
        setIsTransitioning(false);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-20">
      {/* Background with gradients */}
      <div className="absolute inset-0 -z-10">
        {/* Base background */}
        <div className="absolute inset-0" style={{ backgroundColor: "var(--bg)" }} />

        {/* Radial gradients */}
        <div
          className="absolute top-0 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{
            backgroundColor: "rgba(0, 212, 170, 0.12)",
          }}
        />
        <div
          className="absolute bottom-0 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{
            backgroundColor: "rgba(99, 102, 241, 0.08)",
          }}
        />
      </div>

      <div className="container-landing flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center">
        {/* Trust Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{ backgroundColor: "rgba(0, 212, 170, 0.1)", borderColor: "var(--border)" }}
        >
          <span className="text-text-2 text-sm">★ Trusted by 50,000+ language learners worldwide</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4 mb-8 max-w-4xl">
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Learn{" "}
            <span
              className={`inline-block transition-all duration-300 ${
                isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
              style={{ color: "var(--accent)" }}
            >
              {LANGUAGES[currentLanguageIndex]}
            </span>{" "}
            naturally
          </h1>
          <h2
            className="text-4xl md:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            with AI that adapts to you
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-text-2 max-w-2xl mb-10">
          Personalised lessons, real conversations, and a tutor that never gets tired — available 24/7.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link to="/register" className="btn-primary-landing inline-flex justify-center items-center gap-2">
            Start for free →
          </Link>
          <button
            className="btn-ghost-landing inline-flex justify-center items-center gap-2"
            onClick={() => alert("Demo video would play here")}
          >
            <Play size={18} />
            Watch 2-min demo
          </button>
        </div>

        {/* App Preview Card */}
        <div
          className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden float-animation"
          style={{
            backgroundColor: "var(--surface)",
            boxShadow: "0 40px 80px rgba(0, 0, 0, 0.6)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-text" style={{ fontFamily: "var(--font-display)" }}>
                Lesson Preview
              </h3>
              <div className="space-y-2 text-text-2">
                <p>Question: What does "Buenos días" mean?</p>
                <div className="grid grid-cols-1 gap-2">
                  <button className="px-4 py-2 rounded-lg border transition-all hover:border-accent hover:text-accent">
                    Good morning
                  </button>
                  <button className="px-4 py-2 rounded-lg border transition-all hover:border-accent hover:text-accent">
                    Good evening
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
