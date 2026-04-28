import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TimeRangeSelectorProps {
  value: "7d" | "30d" | "90d" | "all";
  onChange: (value: "7d" | "30d" | "90d" | "all") => void;
  className?: string;
}

const labels: Record<string, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  "all": "All time",
};

export function TimeRangeSelector({ value, onChange, className }: TimeRangeSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "border-[#E5E9EE] bg-white text-[#374151] hover:bg-[#F3F4F6] rounded-lg px-4 py-2 h-9",
            className
          )}
        >
          {labels[value]}
          <ChevronDown className="ml-2 h-4 w-4 text-[#9CA3AF]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white border-[#E5E9EE] shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-lg"
      >
        {Object.entries(labels).map(([key, label]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => onChange(key as typeof value)}
            className={cn(
              "cursor-pointer text-sm",
              value === key
                ? "bg-[#D1FAE5] text-[#10B981] font-medium"
                : "text-[#374151] focus:bg-[#F3F4F6]"
            )}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
