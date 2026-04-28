import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send, Copy, Check, Download } from "lucide-react";

export interface ChatMessage {
  id: string;
  content: string;
  author: "user" | "ai";
  timestamp: Date;
}

interface SessionChatProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  className?: string;
  isConnected?: boolean;
}

export function SessionChat({
  messages,
  onSendMessage,
  className,
  isConnected = true,
}: SessionChatProps) {
  const [newMessage, setNewMessage] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() && isConnected) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExport = () => {
    const text = messages
      .map((m) => `[${formatTime(m.timestamp)}] ${m.author === "ai" ? "AI Tutor" : "You"}: ${m.content}`)
      .join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `session-transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="px-4 py-3 border-b border-[#E5E9EE] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
          Transcript
        </span>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExport}
            className="h-6 text-xs text-[#6B7280] hover:text-[#374151]"
          >
            <Download className="w-3 h-3 mr-1" />
            Export
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1 px-4" ref={scrollRef}>
        <div className="space-y-3 py-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-[#9CA3AF]">
              <p className="text-sm">No messages yet</p>
              <p className="text-xs mt-1">Start speaking or type a message</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "group p-3 rounded-xl text-sm max-w-[90%] relative",
                  msg.author === "user"
                    ? "ml-auto bg-[#D1FAE5] text-[#065F46]"
                    : "mr-auto bg-[#F3F4F6] text-[#374151]"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  {msg.author === "ai" ? (
                    <Bot className="w-3.5 h-3.5 text-[#10B981]" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-[#6366F1]" />
                  )}
                  <span className="text-[10px] opacity-70">{formatTime(msg.timestamp)}</span>
                </div>
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <button
                  onClick={() => handleCopy(msg.content, msg.id)}
                  className={cn(
                    "absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity",
                    msg.author === "user" ? "hover:bg-[#A7F3D0]" : "hover:bg-[#E5E9EE]"
                  )}
                >
                  {copiedId === msg.id ? (
                    <Check className="w-3 h-3 text-[#10B981]" />
                  ) : (
                    <Copy className="w-3 h-3 text-[#6B7280]" />
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-[#E5E9EE]">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
            disabled={!isConnected}
            className="min-h-[40px] resize-none border-[#E5E9EE] focus:border-[#10B981]"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!newMessage.trim() || !isConnected}
            className="shrink-0 bg-[#10B981] hover:bg-[#059669] disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
