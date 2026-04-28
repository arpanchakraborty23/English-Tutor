import { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FileText,
  MessageSquare,
  FolderOpen,
  Settings,
  ChevronRight,
  ChevronLeft,
  PanelRightClose,
  PanelRight,
} from "lucide-react";
import { SessionNotes, SessionNote } from "./SessionNotes";
import { SessionChat, ChatMessage } from "./SessionChat";
import { SessionResources, Resource } from "./SessionResources";
import { SessionSettings, SessionSettingsData } from "./SessionSettings";

interface TutorSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  notes: SessionNote[];
  onAddNote: (content: string) => void;
  onEditNote?: (id: string, content: string) => void;
  onDeleteNote?: (id: string) => void;
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  resources: Resource[];
  settings: SessionSettingsData;
  onSettingsChange: (settings: Partial<SessionSettingsData>) => void;
  isConnected?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  className?: string;
}

export const TutorSidebar = forwardRef<HTMLDivElement, TutorSidebarProps>(
  (
    {
      isOpen,
      onToggle,
      notes,
      onAddNote,
      onEditNote,
      onDeleteNote,
      messages,
      onSendMessage,
      resources,
      settings,
      onSettingsChange,
      isConnected = false,
      activeTab = "notes",
      onTabChange,
      className,
    },
    ref
  ) => {
    const [currentTab, setCurrentTab] = useState(activeTab);

    const handleTabChange = (tab: string) => {
      setCurrentTab(tab);
      onTabChange?.(tab);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "fixed right-0 top-0 h-screen bg-white border-l border-[#E5E9EE] flex flex-col z-40 transition-all duration-300 shadow-lg",
          isOpen ? "w-80 md:w-[340px]" : "w-14",
          className
        )}
      >
        <button
          onClick={onToggle}
          className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#E5E9EE] shadow-md flex items-center justify-center hover:bg-[#F3F4F6] transition-colors z-50"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? (
            <ChevronRight className="w-4 h-4 text-[#6B7280]" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-[#6B7280]" />
          )}
        </button>

        {!isOpen && (
          <div className="flex flex-col items-center py-4 gap-4 mt-16">
            <button
              onClick={() => {
                onToggle();
                handleTabChange("notes");
              }}
              className="p-2 rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#10B981] transition-colors"
              title="Notes"
            >
              <FileText className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                onToggle();
                handleTabChange("chat");
              }}
              className="p-2 rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#10B981] transition-colors"
              title="Chat"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                onToggle();
                handleTabChange("resources");
              }}
              className="p-2 rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#10B981] transition-colors"
              title="Resources"
            >
              <FolderOpen className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                onToggle();
                handleTabChange("settings");
              }}
              className="p-2 rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#10B981] transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        )}

        {isOpen && (
          <>
            <div className="px-3 py-3 border-b border-[#E5E9EE]">
              <Tabs value={currentTab} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-4 bg-[#F3F4F6] h-10">
                  <TabsTrigger
                    value="notes"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#10B981] data-[state=active]:shadow-sm h-8"
                  >
                    <FileText className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="chat"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#10B981] data-[state=active]:shadow-sm h-8"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="resources"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#10B981] data-[state=active]:shadow-sm h-8"
                  >
                    <FolderOpen className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#10B981] data-[state=active]:shadow-sm h-8"
                  >
                    <Settings className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 overflow-hidden">
              {currentTab === "notes" && (
                <SessionNotes
                  notes={notes}
                  onAddNote={onAddNote}
                  onEditNote={onEditNote}
                  onDeleteNote={onDeleteNote}
                />
              )}

              {currentTab === "chat" && (
                <SessionChat
                  messages={messages}
                  onSendMessage={onSendMessage}
                  isConnected={isConnected}
                />
              )}

              {currentTab === "resources" && (
                <SessionResources resources={resources} />
              )}

              {currentTab === "settings" && (
                <SessionSettings
                  settings={settings}
                  onSettingsChange={onSettingsChange}
                  isConnected={isConnected}
                />
              )}
            </div>
          </>
        )}
      </div>
    );
  }
);

TutorSidebar.displayName = "TutorSidebar";
