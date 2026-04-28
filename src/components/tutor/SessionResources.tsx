import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FolderOpen,
  FileText,
  Link,
  Code,
  FileCode,
  Video,
  Download,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

export interface Resource {
  id: string;
  name: string;
  type: "pdf" | "link" | "code" | "video" | "document";
  url: string;
  description?: string;
  addedAt: Date;
}

interface SessionResourcesProps {
  resources: Resource[];
  onAddResource?: (resource: Omit<Resource, "id" | "addedAt">) => void;
  className?: string;
}

const typeIcons: Record<string, React.ElementType> = {
  pdf: FileText,
  link: Link,
  code: Code,
  video: Video,
  document: FileCode,
};

const typeColors: Record<string, string> = {
  pdf: "text-[#EF4444] bg-[#FEE2E2]",
  link: "text-[#3B82F6] bg-[#DBEAFE]",
  code: "text-[#10B981] bg-[#D1FAE5]",
  video: "text-[#8B5CF6] bg-[#EDE9FE]",
  document: "text-[#F59E0B] bg-[#FEF3C7]",
};

export function SessionResources({ resources, className }: SessionResourcesProps) {
  const handleOpen = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <ScrollArea className={cn("flex-1", className)}>
      <div className="p-4">
        {resources.length === 0 ? (
          <div className="text-center py-8 text-[#9CA3AF]">
            <div className="w-12 h-12 rounded-full bg-[#F3F4F6] mx-auto flex items-center justify-center mb-3">
              <FolderOpen className="w-6 h-6 text-[#6B7280]" />
            </div>
            <p className="text-sm">No resources yet</p>
            <p className="text-xs mt-1">Resources shared during the session will appear here</p>
          </div>
        ) : (
          <div className="space-y-2">
            {resources.map((resource) => {
              const Icon = typeIcons[resource.type] || FileText;
              const colorClass = typeColors[resource.type] || "text-[#6B7280] bg-[#F3F4F6]";

              return (
                <div
                  key={resource.id}
                  className="group p-3 rounded-xl border border-[#E5E9EE] bg-white hover:bg-[#F9FAFB] hover:border-[#10B981]/30 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", colorClass)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#374151] truncate">{resource.name}</p>
                      <p className="text-xs text-[#9CA3AF] capitalize">{resource.type}</p>
                      {resource.description && (
                        <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">{resource.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpen(resource.url)}
                        className="h-8 w-8 text-[#6B7280] hover:text-[#10B981]"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
