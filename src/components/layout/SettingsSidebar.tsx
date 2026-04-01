import { Palette, Globe, Type, Bell, User, ChevronRight } from "lucide-react";

const settingsNav = [
  { label: "Appearance", icon: Palette, id: "appearance" },
  { label: "Language", icon: Globe, id: "language" },
  { label: "Typography", icon: Type, id: "typography" },
  { label: "Notifications", icon: Bell, id: "notifications" },
  { label: "Account", icon: User, id: "account" },
];

interface SettingsSidebarProps {
  activeSection?: string;
}

export function SettingsSidebar({ activeSection = "appearance" }: SettingsSidebarProps) {
  return (
    <nav className="space-y-0.5" aria-label="Settings navigation">
      {settingsNav.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
            <ChevronRight className={`ml-auto h-4 w-4 ${isActive ? "opacity-70" : "opacity-30"}`} />
          </a>
        );
      })}
    </nav>
  );
}
