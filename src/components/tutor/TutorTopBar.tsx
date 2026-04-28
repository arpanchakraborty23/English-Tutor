import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Video,
  Phone,
  Clock,
  Code,
  Bookmark,
  MoreVertical,
  ArrowLeft,
  Settings,
  Share2,
} from "lucide-react";

type SessionState = "idle" | "connecting" | "connected" | "ended";

interface TutorTopBarProps {
  subject?: string;
  topic?: string;
  difficulty?: string;
  sessionState: SessionState;
  sessionDuration: number;
  showCodeEditor: boolean;
  onToggleCodeEditor: () => void;
  onEndSession: () => void;
  onBack?: () => void;
  className?: string;
}

export function TutorTopBar({
  subject = "General",
  topic = "Learning Session",
  difficulty = "Intermediate",
  sessionState,
  sessionDuration,
  showCodeEditor,
  onToggleCodeEditor,
  onEndSession,
  onBack,
  className,
}: TutorTopBarProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isConnected = sessionState === "connected";
  const isConnecting = sessionState === "connecting";

  return (
    <header
      className={cn(
        "sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-sm border-b border-[#E5E9EE] px-4 md:px-6 flex items-center justify-between",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9">
            <ArrowLeft className="w-5 h-5 text-[#6B7280]" />
          </Button>
        )}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-md shadow-[#10B981]/20">
            <Video className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-[#374151]">AI Tutor Session</h1>
            <p className="text-xs text-[#9CA3AF]">
              {subject} • {topic}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "ml-2",
            isConnected
              ? "bg-[#D1FAE5] text-[#10B981] border-[#10B981]/30"
              : isConnecting
                ? "bg-[#FEF3C7] text-[#D97706] border-[#F59E0B]/30"
                : "bg-[#F3F4F6] text-[#6B7280] border-[#E5E9EE]"
          )}
        >
          {difficulty}
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        {isConnected && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0FDF4] border border-[#10B981]/20">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <Clock className="w-4 h-4 text-[#10B981]" />
            <span className="font-mono text-sm text-[#10B981] font-medium">
              {formatDuration(sessionDuration)}
            </span>
          </div>
        )}

        <Separator orientation="vertical" className="h-8" />

        <Button
          variant="outline"
          size="sm"
          onClick={onToggleCodeEditor}
          className={cn(
            "hidden md:flex gap-2",
            showCodeEditor && "border-[#10B981] text-[#10B981] bg-[#F0FDF4]"
          )}
        >
          <Code className="w-4 h-4" />
          Code Editor
        </Button>

        <Button variant="ghost" size="icon" className="h-9 w-9 text-[#6B7280]">
          <Bookmark className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="icon" className="h-9 w-9 text-[#6B7280]">
          <Share2 className="w-4 h-4" />
        </Button>

        {isConnected && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onEndSession}
            className="gap-2 bg-[#EF4444] hover:bg-[#DC2626]"
          >
            <Phone className="w-4 h-4 rotate-[135deg]" />
            <span className="hidden sm:inline">End Session</span>
          </Button>
        )}
      </div>
    </header>
  );
}
