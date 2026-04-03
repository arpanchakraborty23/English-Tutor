import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-surface/80 backdrop-blur-xl border-b" : "bg-transparent"
      }`}
      style={{
        borderColor: isScrolled ? "var(--border)" : "transparent",
      }}
    >
      <div className="container-landing flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-text font-semibold">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-bg font-bold">
            🌍
          </div>
          <span className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
            LinguaAI
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-text-2 hover:text-text transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-text-2 hover:text-text transition-colors">
            How it works
          </a>
          <a href="#pricing" className="text-text-2 hover:text-text transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="text-text-2 hover:text-text transition-colors">
            Testimonials
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="btn-ghost-landing">
            Log in
          </Link>
          <Link to="/register" className="btn-primary-landing">
            Start for free →
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-text"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t" style={{ borderColor: "var(--border)" }}>
          <div className="container-landing py-4 space-y-4 flex flex-col">
            <a
              href="#features"
              className="text-text-2 hover:text-text transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-text-2 hover:text-text transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="text-text-2 hover:text-text transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-text-2 hover:text-text transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <div className="flex flex-col gap-2 pt-4">
              <Link to="/login" className="btn-ghost-landing text-center">
                Log in
              </Link>
              <Link to="/register" className="btn-primary-landing text-center">
                Start for free →
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
