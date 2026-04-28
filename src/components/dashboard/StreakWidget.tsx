import { Flame, Target, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakWidgetProps {
  currentStreak: number;
  longestStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
  goalUnit?: string;
}

export function StreakWidget({
  currentStreak,
  longestStreak,
  weeklyGoal,
  weeklyProgress,
  goalUnit = "mins",
}: StreakWidgetProps) {
  const goalPercentage = Math.min((weeklyProgress / weeklyGoal) * 100, 100);
  const isGoalMet = weeklyProgress >= weeklyGoal;

  return (
    <div className="p-5 rounded-[14px] bg-gradient-to-br from-[#065F46] to-[#10B981] text-white min-w-[160px] h-full flex flex-col">
      {/* Streak Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <Flame className="w-5 h-5 text-white" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold leading-tight">{currentStreak} days</p>
          <p className="text-xs text-white/70">Best: {longestStreak} days</p>
        </div>
      </div>

      {/* Weekly Goal */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-white/80" />
            <span className="text-sm text-white/90">Weekly Goal</span>
          </div>
          <span className="text-sm font-medium text-white">
            {weeklyProgress}/{weeklyGoal} {goalUnit}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 rounded-full bg-white/30 overflow-hidden">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${goalPercentage}%` }}
          />
        </div>

        {isGoalMet && (
          <div className="flex items-center gap-1.5 mt-2">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-xs text-amber-200 font-medium">Goal achieved!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function StreakCardInline({
  currentStreak,
  longestStreak,
  weeklyGoal,
  weeklyProgress,
  goalUnit = "mins",
}: StreakWidgetProps) {
  const goalPercentage = Math.min((weeklyProgress / weeklyGoal) * 100, 100);
  const isGoalMet = weeklyProgress >= weeklyGoal;

  return (
    <div className="p-5 bg-white border border-[#E5E9EE] rounded-[14px] min-w-[160px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-150">
      {/* Icon and Title */}
      <div className="w-9 h-9 rounded-lg bg-[#D1FAE5] flex items-center justify-center mb-3.5">
        <Flame className="w-[18px] h-[18px] text-[#10B981]" />
      </div>
      <p className="text-[13px] font-medium text-[#9CA3AF] mb-1">Current Streak</p>
      <h3 className="text-[28px] font-bold text-[#374151] leading-tight mb-1">
        {currentStreak} <span className="text-sm font-normal text-[#9CA3AF]">days</span>
      </h3>
      {longestStreak > currentStreak && (
        <p className="text-xs text-[#9CA3AF]">Best: {longestStreak} days</p>
      )}

      {/* Weekly Goal */}
      <div className="mt-4 pt-4 border-t border-[#E5E9EE]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm text-[#374151]">Weekly Goal</span>
          </div>
          <span className="text-sm text-[#374151]">
            {weeklyProgress}/{weeklyGoal} {goalUnit}
          </span>
        </div>
        <div className="h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              isGoalMet ? "bg-[#10B981]" : "bg-[#10B981]"
            )}
            style={{ width: `${goalPercentage}%` }}
          />
        </div>
        {isGoalMet && (
          <div className="flex items-center gap-1.5 mt-2">
            <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="text-xs text-[#F59E0B] font-medium">Goal achieved!</span>
          </div>
        )}
      </div>
    </div>
  );
}
