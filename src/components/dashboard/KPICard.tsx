import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
  isLoading?: boolean;
}

export function KPICard({
  title,
  value,
  change,
  changeType = "positive",
  icon: Icon,
  description,
  isLoading = false,
}: KPICardProps) {
  if (isLoading) {
    return (
      <Card className="p-5 bg-white border border-[#E5E9EE] rounded-[14px] min-w-[160px]">
        <Skeleton className="h-9 w-9 rounded-lg bg-[#F3F4F6] mb-4" />
        <Skeleton className="h-4 w-24 bg-[#F3F4F6] mb-2" />
        <Skeleton className="h-7 w-16 bg-[#F3F4F6] mb-2" />
        <Skeleton className="h-3 w-20 bg-[#F3F4F6]" />
      </Card>
    );
  }

  const changeColors = {
    positive: "text-[#10B981]",
    negative: "text-[#EF4444]",
    neutral: "text-[#9CA3AF]",
  };

  const changeArrow = {
    positive: "↑",
    negative: "↓",
    neutral: "→",
  };

  return (
    <Card className="p-5 bg-white border border-[#E5E9EE] rounded-[14px] min-w-[160px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-150 cursor-pointer group">
      <div className="w-9 h-9 rounded-lg bg-[#D1FAE5] flex items-center justify-center mb-3.5 group-hover:bg-[#A7F3D0] transition-colors">
        <Icon className="w-[18px] h-[18px] text-[#10B981]" />
      </div>

      <p className="text-[13px] font-medium text-[#9CA3AF] mb-1">{title}</p>

      <h3 className="text-[28px] font-bold text-[#374151] leading-tight mb-1">{value}</h3>

      {change && (
        <div className="flex items-center gap-1.5 text-xs">
          <span className={cn("font-medium", changeColors[changeType])}>
            {changeArrow[changeType]} {change}
          </span>
          {description && (
            <span className="text-[#9CA3AF]">{description}</span>
          )}
        </div>
      )}
    </Card>
  );
}
