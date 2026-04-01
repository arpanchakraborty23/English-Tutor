import { Button } from "@/components/ui/button";
import { LanguageBadge } from "@/components/LanguageBadge";

const languages = [
  { name: "Spanish", flag: "🇪🇸" },
  { name: "French", flag: "🇫🇷" },
  { name: "Japanese", flag: "🇯🇵" },
  { name: "German", flag: "🇩🇪" },
  { name: "Korean", flag: "🇰🇷" },
  { name: "Portuguese", flag: "🇧🇷" },
  { name: "Italian", flag: "🇮🇹" },
  { name: "Mandarin", flag: "🇨🇳" },
  { name: "Arabic", flag: "🇸🇦" },
  { name: "Hindi", flag: "🇮🇳" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative text-center space-y-8">
        <div className="flex flex-wrap justify-center gap-2 animate-fade-in-up">
          {languages.map((lang) => (
            <LanguageBadge key={lang.name} flag={lang.flag} name={lang.name} />
          ))}
        </div>

        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Learn any language,{" "}
          <span className="text-primary">naturally</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Immersive lessons, real conversations, and smart repetition — all in one beautiful app. Start speaking from day one.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Button variant="hero" size="lg">
            Start Learning — Free
          </Button>
          <Button variant="hero-outline" size="lg">
            See How It Works
          </Button>
        </div>

        <p className="text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          No credit card required · 50+ languages · Works offline
        </p>
      </div>
    </section>
  );
}
