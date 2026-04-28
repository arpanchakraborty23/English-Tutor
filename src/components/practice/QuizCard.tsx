import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, HelpCircle, Play, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  id: string;
  title: string;
  subject: string;
  questionCount: number;
  duration: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  completed?: boolean;
  score?: number;
  onStart: (id: string) => void;
  onPreview?: (id: string) => void;
}

export function QuizCard({
  id,
  title,
  subject,
  questionCount,
  duration,
  difficulty = "intermediate",
  completed = false,
  score,
  onStart,
  onPreview,
}: QuizCardProps) {
  const difficultyColors = {
    beginner: "bg-[#D1FAE5] text-[#065F46]",
    intermediate: "bg-[#FEF3C7] text-[#92400E]",
    advanced: "bg-[#FEE2E2] text-[#991B1B]",
  };

  return (
    <Card className="p-5 bg-white border border-[#E8E4DC] rounded-[18px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-[180ms] group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-[15px] font-semibold text-[#111827] mb-1">{title}</h3>
          <p className="text-[13px] text-[#9CA3AF]">{subject}</p>
        </div>
        <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-medium capitalize", difficultyColors[difficulty])}>
          {difficulty}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-4 text-[13px] text-[#6B7280]">
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4" />
          <span>{questionCount} Qs</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{duration} min</span>
        </div>
      </div>

      {completed && score !== undefined && (
        <div className="mb-4 p-3 rounded-lg bg-[#F0FDF4] border border-[#10B981]/20">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#065F46]">Completed</span>
            <span className="text-[14px] font-semibold text-[#10B981]">{score}%</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button
          onClick={() => onStart(id)}
          className="flex-1 bg-gradient-to-br from-[#0D9488] to-[#0F766E] text-white hover:shadow-[0_4px_12px_rgba(13,148,136,0.40)]"
        >
          <Play className="w-4 h-4 mr-1.5" />
          Start
        </Button>
        {onPreview && (
          <Button
            variant="outline"
            onClick={() => onPreview(id)}
            className="border-[#E8E4DC] text-[#6B7280] hover:bg-[#F0EDEA]"
          >
            <Eye className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}
