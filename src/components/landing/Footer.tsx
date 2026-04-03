import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram } from "lucide-react";

export const LandingFooter = () => {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="container-landing py-16">
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-bg font-bold">
                🌍
              </div>
              <span className="text-lg font-bold text-text" style={{ fontFamily: "var(--font-display)" }}>
                LinguaAI
              </span>
            </div>
            <p className="text-text-3 text-sm">Learn any language naturally with AI that adapts to you.</p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border flex items-center justify-center text-text-3 hover:text-accent hover:border-accent transition-all"
                style={{ borderColor: "var(--border)" }}
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border flex items-center justify-center text-text-3 hover:text-accent hover:border-accent transition-all"
                style={{ borderColor: "var(--border)" }}
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border flex items-center justify-center text-text-3 hover:text-accent hover:border-accent transition-all"
                style={{ borderColor: "var(--border)" }}
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text text-sm uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
              Product
            </h3>
            <ul className="space-y-3">
              {["Features", "How it works", "Pricing", "Changelog", "API"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-text-3 hover:text-text transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text text-sm uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
              Company
            </h3>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Press", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-text-3 hover:text-text transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text text-sm uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
              Legal
            </h3>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Settings", "GDPR"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-text-3 hover:text-text transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-text-3 text-sm">© 2026 LinguaAI. All rights reserved.</p>

          {/* Language Selector */}
          <select
            className="bg-transparent text-text-3 text-sm border rounded-lg px-3 py-2 hover:text-text hover:border-text-2 transition-colors"
            style={{ borderColor: "var(--border)" }}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>
    </footer>
  );
};
