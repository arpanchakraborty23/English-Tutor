import { Link, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Palette, Globe, Type, Bell, User, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const settingsNav = [
  { label: "Appearance", icon: Palette, id: "appearance" },
  { label: "Language", icon: Globe, id: "language" },
  { label: "Typography", icon: Type, id: "typography" },
  { label: "Notifications", icon: Bell, id: "notifications" },
  { label: "Account", icon: User, id: "account" },
];

const languages = [
  "English", "Español", "Français", "Deutsch", "日本語", "한국어", "Português", "中文", "العربية", "हिन्दी"
];

const fonts = ["DM Sans", "Inter", "System Default", "OpenDyslexic"];

export default function Settings() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-10">
          <h1 className="font-heading text-3xl mb-8">Settings</h1>

          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <nav className="space-y-1">
              {settingsNav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  <ChevronRight className="ml-auto h-4 w-4 opacity-40" />
                </a>
              ))}
            </nav>

            {/* Content */}
            <div className="space-y-10">
              {/* Appearance */}
              <section id="appearance" className="space-y-4">
                <h2 className="font-heading text-xl border-b pb-2">Appearance</h2>
                <div className="flex items-center justify-between rounded-lg border bg-card p-4">
                  <div>
                    <p className="font-medium text-sm">Theme</p>
                    <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                  </div>
                  <ThemeToggle />
                </div>
              </section>

              {/* Language */}
              <section id="language" className="space-y-4">
                <h2 className="font-heading text-xl border-b pb-2">Language Preferences</h2>
                <div className="rounded-lg border bg-card p-4 space-y-3">
                  <p className="font-medium text-sm">Interface Language</p>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang, i) => (
                      <button
                        key={lang}
                        className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                          i === 0
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-card-foreground hover:bg-secondary"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Typography */}
              <section id="typography" className="space-y-4">
                <h2 className="font-heading text-xl border-b pb-2">Typography</h2>
                <div className="rounded-lg border bg-card p-4 space-y-3">
                  <p className="font-medium text-sm">Font Family</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {fonts.map((font, i) => (
                      <button
                        key={font}
                        className={`rounded-lg border px-4 py-3 text-sm text-left transition-colors ${
                          i === 0
                            ? "border-primary bg-primary/5 text-foreground"
                            : "bg-card text-card-foreground hover:bg-secondary"
                        }`}
                      >
                        <span className="font-medium">{font}</span>
                        <p className="text-xs text-muted-foreground mt-1">The quick brown fox jumps over the lazy dog</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-4 space-y-3">
                  <p className="font-medium text-sm">Font Size</p>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">A</span>
                    <div className="flex-1 h-2 rounded-full bg-secondary relative">
                      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary shadow cursor-pointer" />
                    </div>
                    <span className="text-lg text-muted-foreground">A</span>
                  </div>
                </div>
              </section>

              {/* Notifications (placeholder) */}
              <section id="notifications" className="space-y-4">
                <h2 className="font-heading text-xl border-b pb-2">Notifications</h2>
                <div className="rounded-lg border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Notification preferences coming soon.</p>
                </div>
              </section>

              {/* Account (placeholder) */}
              <section id="account" className="space-y-4">
                <h2 className="font-heading text-xl border-b pb-2">Account</h2>
                <div className="rounded-lg border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Account management coming soon.</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
