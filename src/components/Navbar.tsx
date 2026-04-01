import { Link } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Languages", href: "#languages" },
  { label: "Settings", href: "/settings" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl">
          <Globe className="h-6 w-6 text-primary" />
          <span>Polyglot</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) =>
            l.href.startsWith("#") ? (
              <a key={l.label} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ) : (
              <Link key={l.label} to={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </Link>
            )
          )}
          <ThemeToggle />
          <Button variant="hero" size="sm">Get Started</Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 pb-4 pt-2 space-y-2">
          {navLinks.map((l) =>
            l.href.startsWith("#") ? (
              <a key={l.label} href={l.href} className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
                {l.label}
              </a>
            ) : (
              <Link key={l.label} to={l.href} className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
                {l.label}
              </Link>
            )
          )}
          <Button variant="hero" size="sm" className="w-full">Get Started</Button>
        </div>
      )}
    </nav>
  );
}
