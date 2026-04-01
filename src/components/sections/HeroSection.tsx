import { Button } from "@/components/ui/button";
import { LanguageBadge } from "@/components/ui/LanguageBadge";

const languages = [
  { name: "English", flag: "🇺🇸" },
  { name: "Spanish", flag: "🇪🇸" },
  { name: "French", flag: "🇫🇷" },
  { name: "Japanese", flag: "🇯🇵" },
  { name: "German", flag: "🇩🇪" },
  { name: "Korean", flag: "🇰🇷" },
  { name: "Portuguese", flag: "🇧🇷" },
  { name: "Mandarin", flag: "🇨🇳" },
  { name: "Italian", flag: "🇮🇹" },
  { name: "Arabic", flag: "🇸🇦" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-accent/6 blur-3xl pointer-events-none" />

      <div className="container relative text-center space-y-7">
        <div className="flex flex-wrap justify-center gap-2 animate-fade-in-up" id="languages">
          {languages.map((lang) => (
            <LanguageBadge key={lang.name} flag={lang.flag} name={lang.name} />
          ))}
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl mx-auto leading-tight animate-fade-in-up [animation-delay:100ms]">
          Learn any language,{" "}
          <span className="text-primary">naturally</span>
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto animate-fade-in-up [animation-delay:200ms]">
          Immersive lessons, real conversations, and smart repetition — all in one beautiful app.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up [animation-delay:300ms]">
          <Button variant="hero" size="lg">Start Learning — Free</Button>
          <Button variant="hero-outline" size="lg">See How It Works</Button>
        </div>

        <p className="text-xs text-muted-foreground animate-fade-in-up [animation-delay:400ms]">
          No credit card required · 50+ languages · Works offline
        </p>
      </div>
    </section>
  );
}
