import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  action?: ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  children,
  className = "",
  isLoading = false,
  action,
}: ChartCardProps) {
  if (isLoading) {
    return (
      <Card className={`p-6 bg-white border border-[#E5E9EE] rounded-[14px] ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-5 w-32 bg-[#F3F4F6]" />
          {action && <Skeleton className="h-8 w-24 bg-[#F3F4F6]" />}
        </div>
        <Skeleton className="h-[280px] w-full bg-[#F3F4F6]" />
      </Card>
    );
  }

  return (
    <Card className={cn(
      "p-6 bg-white border border-[#E5E9EE] rounded-[14px]",
      className
    )}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[16px] font-semibold text-[#374151]">{title}</h3>
          {subtitle && (
            <p className="text-xs text-[#9CA3AF] mt-1">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </Card>
  );
}
