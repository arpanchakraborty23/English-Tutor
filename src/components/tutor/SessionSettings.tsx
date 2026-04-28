import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Code, 
  Languages, 
  Music, 
  Palette, 
  Calculator,
  Atom,
  Briefcase,
  Globe 
} from "lucide-react";

export interface SessionSettingsData {
  difficulty: "beginner" | "intermediate" | "advanced";
  speakingPace: "slow" | "normal" | "fast";
  sessionDuration: number;
  subject?: string;
  topic?: string;
}

interface SessionSettingsProps {
  settings: SessionSettingsData;
  onSettingsChange: (settings: Partial<SessionSettingsData>) => void;
  className?: string;
  isConnected?: boolean;
}

const subjectIcons: Record<string, React.ElementType> = {
  programming: Code,
  python: Code,
  javascript: Code,
  spanish: Languages,
  french: Languages,
  japanese: Languages,
  mathematics: Calculator,
  physics: Atom,
  art: Palette,
  music: Music,
  business: Briefcase,
  english: Globe,
};

export function SessionSettings({
  settings,
  onSettingsChange,
  className,
  isConnected = false,
}: SessionSettingsProps) {
  const SubjectIcon = settings.subject 
    ? subjectIcons[settings.subject.toLowerCase()] || FileText 
    : FileText;

  return (
    <ScrollArea className={cn("flex-1", className)}>
      <div className="p-4 space-y-6">
        {!isConnected && (
          <div className="p-3 rounded-lg bg-[#FEF3C7] border border-[#F59E0B]/20">
            <p className="text-xs text-[#92400E]">
              Settings can only be changed before starting the session.
            </p>
          </div>
        )}

        <div>
          <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
            Current Session
          </h3>
          <div className="p-4 rounded-xl bg-[#F3F4F6] border border-[#E5E9EE]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                <SubjectIcon className="w-5 h-5 text-[#10B981]" />
              </div>
              <div>
                <p className="font-medium text-[#374151]">{settings.subject || "General"}</p>
                <p className="text-xs text-[#6B7280]">{settings.topic || "No topic selected"}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
            Difficulty Level
          </Label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(["beginner", "intermediate", "advanced"] as const).map((level) => (
              <button
                key={level}
                onClick={() => !isConnected && onSettingsChange({ difficulty: level })}
                disabled={isConnected}
                className={cn(
                  "px-3 py-2.5 rounded-lg text-xs font-medium transition-all",
                  settings.difficulty === level
                    ? "bg-[#D1FAE5] text-[#10B981] border border-[#10B981]/30"
                    : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E9EE] border border-transparent",
                  isConnected && "opacity-50 cursor-not-allowed"
                )}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-[#9CA3AF]">
            {settings.difficulty === "beginner" && "Focus on fundamentals with simple examples"}
            {settings.difficulty === "intermediate" && "Balanced pace with practical exercises"}
            {settings.difficulty === "advanced" && "In-depth topics with complex scenarios"}
          </p>
        </div>

        <div>
          <Label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
            Speaking Pace
          </Label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(["slow", "normal", "fast"] as const).map((pace) => (
              <button
                key={pace}
                onClick={() => !isConnected && onSettingsChange({ speakingPace: pace })}
                disabled={isConnected}
                className={cn(
                  "px-3 py-2.5 rounded-lg text-xs font-medium transition-all",
                  settings.speakingPace === pace
                    ? "bg-[#D1FAE5] text-[#10B981] border border-[#10B981]/30"
                    : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E9EE] border border-transparent",
                  isConnected && "opacity-50 cursor-not-allowed"
                )}
              >
                {pace.charAt(0).toUpperCase() + pace.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
            Session Duration: {settings.sessionDuration} minutes
          </Label>
          <div className="mt-3 px-1">
            <Slider
              value={[settings.sessionDuration]}
              onValueChange={([value]) => !isConnected && onSettingsChange({ sessionDuration: value })}
              min={15}
              max={60}
              step={15}
              disabled={isConnected}
              className={cn(isConnected && "opacity-50")}
            />
            <div className="flex justify-between mt-2 text-xs text-[#9CA3AF]">
              <span>15m</span>
              <span>30m</span>
              <span>45m</span>
              <span>60m</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E5E9EE]">
          <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
            Tips for This Session
          </h3>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-[#F0FDF4] border border-[#10B981]/20">
              <p className="text-xs text-[#065F46]">
                Ask questions anytime - your AI tutor adapts to your pace.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#EFF6FF] border border-[#3B82F6]/20">
              <p className="text-xs text-[#1E40AF]">
                Use the code editor for hands-on practice during programming sessions.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#FEF3C7] border border-[#F59E0B]/20">
              <p className="text-xs text-[#92400E]">
                Take notes in the sidebar to remember key concepts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
