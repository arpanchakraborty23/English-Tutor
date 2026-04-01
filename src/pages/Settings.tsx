import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SettingsSidebar } from "@/components/layout/SettingsSidebar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const interfaceLanguages = [
  "English", "Español", "Français", "Deutsch", "日本語", "한국어", "Português", "中文", "العربية", "हिन्दी",
];

const fonts = ["DM Sans", "Inter", "System Default", "OpenDyslexic"];

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8 md:py-10">
          <h1 className="font-heading text-2xl md:text-3xl mb-6">Settings</h1>

          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            <SettingsSidebar />

            <div className="space-y-8">
              {/* Appearance */}
              <section id="appearance" className="space-y-3">
                <h2 className="font-heading text-lg border-b pb-2">Appearance</h2>
                <div className="flex items-center justify-between rounded-lg border bg-card p-4">
                  <div>
                    <p className="font-medium text-sm">Theme</p>
                    <p className="text-xs text-muted-foreground">Switch between light and dark mode</p>
                  </div>
                  <ThemeToggle />
                </div>
              </section>

              {/* Language */}
              <section id="language" className="space-y-3">
                <h2 className="font-heading text-lg border-b pb-2">Language Preferences</h2>
                <div className="rounded-lg border bg-card p-4 space-y-3">
                  <p className="font-medium text-sm">Interface Language</p>
                  <div className="flex flex-wrap gap-2">
                    {interfaceLanguages.map((lang, i) => (
                      <button
                        key={lang}
                        className={`rounded-full border px-3 py-1 text-sm transition-colors ${
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
              <section id="typography" className="space-y-3">
                <h2 className="font-heading text-lg border-b pb-2">Typography</h2>
                <div className="rounded-lg border bg-card p-4 space-y-3">
                  <p className="font-medium text-sm">Font Family</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {fonts.map((font, i) => (
                      <button
                        key={font}
                        className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                          i === 0
                            ? "border-primary bg-primary/5"
                            : "bg-card hover:bg-secondary"
                        }`}
                      >
                        <span className="font-medium">{font}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">The quick brown fox jumps…</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-4 space-y-2">
                  <p className="font-medium text-sm">Font Size</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">A</span>
                    <div className="flex-1 h-1.5 rounded-full bg-secondary relative">
                      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-primary shadow cursor-pointer" />
                    </div>
                    <span className="text-lg text-muted-foreground">A</span>
                  </div>
                </div>
              </section>

              {/* Notifications */}
              <section id="notifications" className="space-y-3">
                <h2 className="font-heading text-lg border-b pb-2">Notifications</h2>
                <div className="rounded-lg border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Notification preferences coming soon.</p>
                </div>
              </section>

              {/* Account */}
              <section id="account" className="space-y-3">
                <h2 className="font-heading text-lg border-b pb-2">Account</h2>
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
};

export default Settings;
