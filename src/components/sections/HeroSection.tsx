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
    <section className="relative overflow-hidden py-24 md:py-40">
      {/* Animated gradient backgrounds */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/12 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl pointer-events-none animate-pulse [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-success/8 blur-3xl pointer-events-none animate-pulse [animation-delay:2s]" />

      <div className="container relative text-center space-y-8 max-w-4xl mx-auto">
        {/* Language badges */}
        <div className="flex flex-wrap justify-center gap-2 animate-fade-in-up" id="languages">
          {languages.map((lang) => (
            <LanguageBadge key={lang.name} flag={lang.flag} name={lang.name} />
          ))}
        </div>

        {/* Main heading with gradient */}
        <div className="space-y-3">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">✨ Fluency Through Immersion</span>
          </div>
          
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-bold animate-fade-in-up">
            Master any language,<br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">naturally</span>
          </h1>
        </div>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:200ms]">
          AI-powered personalization meets immersive lessons. Learn through real conversations, not memorization. Your brain will thank you.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 py-6 md:py-8 animate-fade-in-up [animation-delay:300ms]">
          <div className="p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
            <p className="text-2xl md:text-3xl font-bold text-primary">50+</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Languages</p>
          </div>
          <div className="p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
            <p className="text-2xl md:text-3xl font-bold text-success">5M+</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Learners</p>
          </div>
          <div className="p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
            <p className="text-2xl md:text-3xl font-bold text-accent">96%</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Success Rate</p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up [animation-delay:400ms]">
          <Button variant="hero" size="lg" className="gap-2">
            🚀 Start Learning Free
          </Button>
          <Button variant="hero-outline" size="lg" className="gap-2">
            📖 See How It Works
          </Button>
        </div>

        {/* Trust indicators */}
        <p className="text-xs text-muted-foreground pt-6 animate-fade-in-up [animation-delay:500ms]">
          ✓ No credit card required · ✓ 7-day money-back guarantee · ✓ Works offline
        </p>
      </div>
    </section>
  );
}
