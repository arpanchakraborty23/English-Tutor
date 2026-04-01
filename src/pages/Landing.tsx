import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="container text-center space-y-5">
            <h2 className="font-heading text-2xl md:text-3xl">
              Ready to start your journey?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
              Join millions of learners building real fluency every day. Your first lesson is free.
            </p>
            <Button variant="accent" size="lg">Start Learning Now</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
