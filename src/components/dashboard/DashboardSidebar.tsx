import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
  CreditCard,
  Video,
  ChevronLeft,
  ChevronRight,
  Home,
  Flame,
  FileCheck,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const menuGroups = [
  {
    title: "LEARN",
    items: [
      { id: "dashboard", label: "Home", icon: Home, path: "/dashboard" },
      { id: "tutor", label: "Start Session", icon: Video, path: "/tutor", isCta: true },
      { id: "practice", label: "Practice", icon: FileCheck, path: "/practice" },
      { id: "exam", label: "Exams", icon: FileText, path: "/exam" },
      { id: "progress", label: "My Progress", icon: BarChart3, path: "/progress" },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
      { id: "billing", label: "Billing", icon: CreditCard, path: "/billing" },
    ],
  },
];

interface DashboardSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  isCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function DashboardSidebar({
  activeTab,
  onTabChange,
  isCollapsed: externalCollapsed,
  onCollapsedChange,
}: DashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;
  const setIsCollapsed = onCollapsedChange || setInternalCollapsed;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavClick = (item: { id: string; path: string }) => {
    if (onTabChange) {
      onTabChange(item.id);
    }
    navigate(item.path);
  };

  const isActive = (item: { id: string; path: string }) => {
    if (activeTab && activeTab === item.id) return true;
    if (location.pathname === item.path) return true;
    if (item.path !== "/dashboard" && location.pathname.startsWith(item.path)) return true;
    return false;
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-[#FDFCF8] border-r border-[#E8E4DC] flex flex-col z-40 transition-all duration-300",
        isCollapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo / App Name */}
      <div className={cn("px-3 py-4 border-b border-[#E8E4DC]", isCollapsed ? "px-2" : "px-4")}>
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0D9488] to-[#0F766E] flex items-center justify-center shrink-0 shadow-md shadow-[#0D9488]/20">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-[#374151] text-[13px] font-semibold leading-tight" style={{ fontFamily: "'Lora', serif" }}>
                ARIA
              </span>
              <span className="text-[#9CA3AF] text-[9px]">AI Tutor</span>
            </div>
          )}
        </Link>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-white border border-[#E8E4DC] shadow-sm flex items-center justify-center hover:bg-[#F0EDEA] transition-colors z-50"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3 text-[#6B7280]" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-[#6B7280]" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-4">
            {!isCollapsed && (
              <h4 className="px-3 mb-2 text-[10px] font-semibold text-[#9CA3AF] tracking-[0.08em] uppercase">
                {group.title}
              </h4>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item);

                if (item.isCta) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={cn(
                        "w-full flex items-center gap-2.5 rounded-lg transition-all duration-200 font-medium",
                        isCollapsed
                          ? "justify-center px-2 py-2.5 mx-auto my-1 w-10 h-10 bg-gradient-to-br from-[#0D9488] to-[#0F766E] text-white shadow-[0_2px_8px_rgba(13,148,136,0.30)] hover:shadow-[0_4px_12px_rgba(13,148,136,0.40)]"
                          : "px-3.5 py-2.5 mx-1 bg-gradient-to-br from-[#0D9488] to-[#0F766E] text-white text-[13px] shadow-[0_2px_8px_rgba(13,148,136,0.30)] hover:shadow-[0_4px_12px_rgba(13,148,136,0.40)] hover:-translate-y-px"
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className={cn("shrink-0", isCollapsed ? "w-4 h-4" : "w-4 h-4")} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={cn(
                      "w-full flex items-center gap-2.5 rounded-lg transition-all duration-150 text-[13px] font-medium",
                      isCollapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
                      active
                        ? "bg-[#CCFBF1] text-[#0D9488] border-l-[3px] border-[#0D9488]"
                        : "text-[#374151] hover:bg-[#F0EDEA] hover:translate-x-0.5 border-l-[3px] border-transparent"
                    )}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={cn(
                        "shrink-0",
                        isCollapsed ? "w-[18px] h-[18px]" : "w-[18px] h-[18px]",
                        active ? "text-[#0D9488]" : "text-[#6B7280]"
                      )}
                    />
                    {!isCollapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Streak Badge */}
      {!isCollapsed && (
        <div className="px-3 pb-3">
          <div className="rounded-xl p-3 bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] border border-[#F59E0B]/20">
            <div className="flex items-center gap-2.5">
              <Flame className="w-5 h-5 text-[#D97706]" />
              <div>
                <span className="text-[13px] font-semibold text-[#92400E]">7-day streak!</span>
                <p className="text-[11px] text-[#B45309]">Keep it up!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User / Log out */}
      <div className="p-2 border-t border-[#E8E4DC]">
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-2.5 rounded-lg text-[#6B7280] hover:bg-[#FEF2F2] hover:text-[#DC2626] transition-colors text-[13px] font-medium",
            isCollapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
          )}
          title={isCollapsed ? "Log out" : undefined}
        >
          <LogOut className={cn("shrink-0 w-[18px] h-[18px]")} />
          {!isCollapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}
