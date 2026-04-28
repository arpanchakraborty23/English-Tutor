import { useNavigate } from "react-router-dom";
import { Bell, Search, User, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface DashboardHeaderProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  notificationCount?: number;
  className?: string;
}

export function DashboardHeader({
  userName = "Student",
  userEmail = "student@example.com",
  userAvatar,
  notificationCount = 3,
  className,
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E8E4DC] bg-white/95 backdrop-blur-sm px-6",
        className
      )}
    >
      {/* Left - Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <Input
            placeholder="Search lessons, topics..."
            className="pl-10 bg-[#F3F4F6] border-transparent text-[#374151] placeholder:text-[#9CA3AF] focus:border-[#0D9488] focus:ring-[#0D9488]/20 w-full max-w-[320px] rounded-lg h-9 text-sm"
          />
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#6B7280] hover:text-[#374151] hover:bg-[#F0EDEA] rounded-full w-9 h-9"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#EF4444] rounded-full flex items-center justify-center text-[10px] text-white font-medium">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white border-[#E8E4DC] rounded-xl">
            <DropdownMenuLabel className="text-[#374151]">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#E8E4DC]" />
            <DropdownMenuItem className="text-[#374151] focus:bg-[#F0EDEA] cursor-pointer rounded-lg">
              <div className="flex flex-col gap-1 py-1">
                <p className="text-sm font-medium">Daily streak at risk!</p>
                <p className="text-xs text-[#9CA3AF]">Practice today to maintain your streak</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[#374151] focus:bg-[#F0EDEA] cursor-pointer rounded-lg">
              <div className="flex flex-col gap-1 py-1">
                <p className="text-sm font-medium">New lesson available</p>
                <p className="text-xs text-[#9CA3AF]">Python - Module 3</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[#374151] focus:bg-[#F0EDEA] cursor-pointer rounded-lg">
              <div className="flex flex-col gap-1 py-1">
                <p className="text-sm font-medium">Achievement unlocked!</p>
                <p className="text-xs text-[#9CA3AF]">Completed 10 sessions</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2.5 text-[#374151] hover:bg-[#F0EDEA] px-2.5 h-10 rounded-lg"
            >
              <Avatar className="h-8 w-8 border border-[#E8E4DC]">
                <AvatarImage src={userAvatar} />
                <AvatarFallback className="bg-[#0D9488]/10 text-[#0D9488] font-medium text-sm">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-[13px] font-medium text-[#374151]">{userName}</span>
                <span className="text-[11px] text-[#9CA3AF]">{userEmail}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border-[#E8E4DC] rounded-xl">
            <DropdownMenuLabel className="text-[#374151]">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#E8E4DC]" />
            <DropdownMenuItem 
              className="text-[#374151] focus:bg-[#F0EDEA] cursor-pointer rounded-lg"
              onClick={() => navigate("/settings")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-[#374151] focus:bg-[#F0EDEA] cursor-pointer rounded-lg"
              onClick={() => navigate("/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#E8E4DC]" />
            <DropdownMenuItem 
              className="text-[#EF4444] focus:bg-[#FEF2F2] cursor-pointer rounded-lg"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
