import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Plus, Edit2, Trash2, Check, X } from "lucide-react";

export interface SessionNote {
  id: string;
  content: string;
  author: "user" | "ai";
  timestamp: Date;
  isEditing?: boolean;
}

interface SessionNotesProps {
  notes: SessionNote[];
  onAddNote: (content: string) => void;
  onEditNote?: (id: string, content: string) => void;
  onDeleteNote?: (id: string) => void;
  className?: string;
}

export function SessionNotes({
  notes,
  onAddNote,
  onEditNote,
  onDeleteNote,
  className,
}: SessionNotesProps) {
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote("");
    }
  };

  const handleStartEdit = (note: SessionNote) => {
    setEditingId(note.id);
    setEditingContent(note.content);
  };

  const handleSaveEdit = () => {
    if (editingId && editingContent.trim()) {
      onEditNote?.(editingId, editingContent.trim());
      setEditingId(null);
      setEditingContent("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingContent("");
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
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-3 py-4">
          {notes.length === 0 ? (
            <div className="text-center py-8 text-[#9CA3AF]">
              <p className="text-sm">No notes yet</p>
              <p className="text-xs mt-1">Add notes during your session</p>
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className={cn(
                  "group p-3 rounded-xl text-sm transition-all",
                  note.author === "user"
                    ? "bg-[#F0FDF4] border border-[#10B981]/20"
                    : "bg-[#F3F4F6] border border-[#E5E9EE]"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {note.author === "ai" ? (
                      <Bot className="w-3.5 h-3.5 text-[#10B981]" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-[#6366F1]" />
                    )}
                    <span className="text-[10px] text-[#9CA3AF]">
                      {formatTime(note.timestamp)}
                    </span>
                  </div>
                  {note.author === "user" && onEditNote && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleStartEdit(note)}
                        className="p-1 rounded hover:bg-white/50"
                      >
                        <Edit2 className="w-3 h-3 text-[#6B7280]" />
                      </button>
                      {onDeleteNote && (
                        <button
                          onClick={() => onDeleteNote(note.id)}
                          className="p-1 rounded hover:bg-red-100"
                        >
                          <Trash2 className="w-3 h-3 text-[#EF4444]" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
                {editingId === note.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="min-h-[60px] resize-none border-[#E5E9EE]"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleSaveEdit}
                        className="h-7 bg-[#10B981] hover:bg-[#059669]"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="h-7"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#374151] whitespace-pre-wrap">{note.content}</p>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-[#E5E9EE]">
        <div className="flex gap-2">
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddNote();
              }
            }}
            placeholder="Add a note..."
            className="min-h-[60px] resize-none border-[#E5E9EE] focus:border-[#10B981]"
          />
          <Button
            size="icon"
            onClick={handleAddNote}
            disabled={!newNote.trim()}
            className="shrink-0 bg-[#10B981] hover:bg-[#059669] disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
