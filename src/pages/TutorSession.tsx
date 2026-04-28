import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Mic,
  Video,
  Bot,
  Code,
  Play,
  ArrowRight,
  Sparkles,
  Clock,
  Target,
  Zap,
  BookOpen,
  Brain,
  Lightbulb,
  TrendingUp,
  ChevronRight,
  X,
  FileText,
  MessageSquare,
  Image,
  ImagePlus,
} from "lucide-react";
import { TutorAvatar } from "@/components/tutor";
import type { SessionNote } from "@/components/tutor/SessionNotes";
import type { Resource } from "@/components/tutor/SessionResources";

type SessionState = "idle" | "connecting" | "connected" | "ended";
type AIState = "idle" | "listening" | "speaking" | "thinking";

interface TutorSessionConfig {
  subject: string;
  topic: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number;
  goal?: string;
}

interface ChatMessage {
  id: string;
  content: string;
  author: "user" | "ai";
  timestamp: Date;
  image?: string;
}

const userSubjects = [
  { name: "Python Programming", progress: 72, icon: Code, color: "#0D9488" },
  { name: "Mathematics", progress: 45, icon: TrendingUp, color: "#F59E0B" },
  { name: "Spanish", progress: 60, icon: BookOpen, color: "#6366F1" },
];

const recommendedTopics = [
  { subject: "Python Programming", topic: "Functions & Closures", reason: "Continue from last session", match: 95 },
  { subject: "Mathematics", topic: "Quadratic Equations", reason: "Strengthen weak area", match: 88 },
  { subject: "Spanish", topic: "Past Tense Verbs", reason: "Daily practice recommended", match: 82 },
];

const quickGoals = [
  "Understand a new concept",
  "Practice exercises",
  "Prepare for exam",
  "Review topics",
  "Solve problems",
  "Work on project",
];

const difficultyOptions = [
  { id: "beginner", label: "Beginner", description: "New to this topic", color: "#10B981" },
  { id: "intermediate", label: "Intermediate", description: "Some experience", color: "#F59E0B" },
  { id: "advanced", label: "Advanced", description: "Expert level", color: "#EF4444" },
];

const durationOptions = [15, 30, 45, 60];

const TutorSession: React.FC = () => {
  const navigate = useNavigate();
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [aiState, setAiState] = useState<AIState>("idle");
  const [sessionDuration, setSessionDuration] = useState(0);

  const [activeTab, setActiveTab] = useState<"notes" | "chat">("chat");
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const [notes, setNotes] = useState<SessionNote[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [chatInput, setChatInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [config, setConfig] = useState<TutorSessionConfig>({
    subject: "",
    topic: "",
    difficulty: "intermediate",
    duration: 30,
    goal: "",
  });

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionState === "connected") {
      interval = setInterval(() => {
        setSessionDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionState]);

  useEffect(() => {
    if (sessionState === "connected") {
      const aiStates: AIState[] = ["listening", "speaking", "thinking"];
      const interval = setInterval(() => {
        setAiState(aiStates[Math.floor(Math.random() * aiStates.length)]);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [sessionState]);

  const handleStartSession = useCallback(() => {
    setSessionState("connecting");
    setTimeout(() => {
      setSessionState("connected");
      setAiState("listening");
      setMessages([
        {
          id: "1",
          content: `Hello! I'm ready to help you learn ${config.topic}. What would you like to explore first?`,
          author: "ai",
          timestamp: new Date(),
        },
      ]);
    }, 2000);
  }, [config.topic]);

  const handleEndSession = useCallback(() => {
    setSessionState("ended");
    navigate("/dashboard");
  }, [navigate]);

  const handleAddNote = useCallback((content: string) => {
    const newNote: SessionNote = {
      id: Date.now().toString(),
      content,
      author: "user",
      timestamp: new Date(),
    };
    setNotes((prev) => [...prev, newNote]);
  }, []);

  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSendMessage = useCallback((content: string, image?: string) => {
    if (!content.trim() && !image) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      author: "user",
      timestamp: new Date(),
      image,
    };
    setMessages((prev) => [...prev, newMessage]);
    setChatInput("");
    setSelectedImage(null);

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: image 
          ? "I can see the image you shared. Let me analyze it and provide feedback..." 
          : "Great question! Let me explain that concept in detail...",
        author: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const canStart = config.subject && config.topic && config.duration;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F5F0] via-[#FDFCF8] to-[#F0EDEA]">
      {sessionState === "idle" ? (
        <SessionSetupView
          config={config}
          onConfigChange={setConfig}
          onStart={handleStartSession}
          canStart={!!canStart}
        />
      ) : (
        <div className="min-h-screen flex flex-col">
          {/* Top Bar */}
          <header className="h-14 bg-white/80 backdrop-blur border-b border-[#E8E4DC] flex items-center justify-between px-4 sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSessionState("idle")}
                className="text-[#6B7280] hover:text-[#374151] transition-colors"
              >
                ← Back
              </button>
              <div className="h-4 w-px bg-[#E8E4DC]" />
              <div>
                <span className="font-medium text-[#374151]">{config.subject}</span>
                <span className="text-[#9CA3AF] mx-2">·</span>
                <span className="text-[#6B7280]">{config.topic}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[#6B7280]">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatDuration(sessionDuration)}</span>
              </div>
              <Button
                onClick={handleEndSession}
                variant="destructive"
                size="sm"
                className="bg-[#EF4444] hover:bg-[#DC2626] text-white"
              >
                End Session
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex">
            {/* Left: Avatar */}
<main className="flex-1 flex flex-col p-6 overflow-hidden">
              <Card
                className="flex-1 border-[#E8E4DC] rounded-[18px] bg-white/60 backdrop-blur overflow-hidden relative"
              >
                <div className="h-full">
                  <TutorAvatar
                    isConnecting={sessionState === "connecting"}
                    isConnected={sessionState === "connected"}
                    isListening={aiState === "listening"}
                    isSpeaking={aiState === "speaking"}
                    isThinking={aiState === "thinking"}
                  />
                </div>
                {/* AI State Indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    aiState === "listening" && "bg-[#10B981] animate-pulse",
                    aiState === "speaking" && "bg-[#0D9488]",
                    aiState === "thinking" && "bg-[#F59E0B] animate-pulse",
                    aiState === "idle" && "bg-[#9CA3AF]"
                  )} />
                  <span className="text-[12px] font-medium text-[#374151] capitalize">{aiState}</span>
                </div>
                {/* Mic/Video Controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={cn(
                      "gap-2 rounded-full",
                      isMicOn ? "border-[#0D9488] bg-[#CCFBF1] text-[#0D9488]" : "border-[#E8E4DC] bg-white text-[#9CA3AF]"
                    )}
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={cn(
                      "gap-2 rounded-full",
                      isVideoOn ? "border-[#0D9488] bg-[#CCFBF1] text-[#0D9488]" : "border-[#E8E4DC] bg-white text-[#9CA3AF]"
                    )}
                  >
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </main>

            {/* Right: Chat + Notes Sidebar */}
            <aside className="w-[380px] border-l border-[#E8E4DC] bg-white/80 backdrop-blur flex flex-col">
              {/* Tab Headers */}
              <div className="flex border-b border-[#E8E4DC]">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={cn(
                    "flex-1 py-3 text-[14px] font-medium transition-all flex items-center justify-center gap-2",
                    activeTab === "chat"
                      ? "text-[#0D9488] border-b-2 border-[#0D9488]"
                      : "text-[#6B7280] hover:text-[#374151]"
                  )}
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab("notes")}
                  className={cn(
                    "flex-1 py-3 text-[14px] font-medium transition-all flex items-center justify-center gap-2",
                    activeTab === "notes"
                      ? "text-[#0D9488] border-b-2 border-[#0D9488]"
                      : "text-[#6B7280] hover:text-[#374151]"
                  )}
                >
                  <FileText className="w-4 h-4" />
                  Notes
                </button>
              </div>

              {/* Chat Tab */}
              {activeTab === "chat" && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Messages */}
                  <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex",
                          msg.author === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[85%] rounded-2xl px-4 py-2.5",
                            msg.author === "user"
                              ? "bg-[#0D9488] text-white"
                              : "bg-[#F3F4F6] text-[#374151]"
                          )}
                        >
                          {msg.author === "ai" && (
                            <div className="flex items-center gap-2 mb-1">
                              <Bot className="w-3.5 h-3.5 text-[#0D9488]" />
                              <span className="text-[11px] font-medium text-[#0D9488]">ARIA</span>
                            </div>
                          )}
                          {msg.image && (
                            <img
                              src={msg.image}
                              alt="Shared"
                              className="max-w-full rounded-lg mb-2 max-h-[200px] object-contain"
                            />
                          )}
                          {msg.content && <p className="text-[14px]">{msg.content}</p>}
                        </div>
                      </div>
                    ))}
                    {sessionState === "connecting" && (
                      <div className="flex justify-start">
                        <div className="bg-[#F3F4F6] rounded-2xl px-4 py-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce" />
                            <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce delay-100" />
                            <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce delay-200" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Image Preview */}
                  {selectedImage && (
                    <div className="px-4 pb-2">
                      <div className="relative inline-block">
                        <img
                          src={selectedImage}
                          alt="Preview"
                          className="h-20 rounded-lg border border-[#E8E4DC]"
                        />
                        <button
                          onClick={() => setSelectedImage(null)}
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#EF4444] text-white flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-3 border-t border-[#E8E4DC] bg-white/50">
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => fileInputRef.current?.click()}
                        className="shrink-0 w-10 h-10 rounded-full border-[#E8E4DC] text-[#6B7280] hover:text-[#0D9488] hover:border-[#0D9488]"
                      >
                        <ImagePlus className="w-4 h-4" />
                      </Button>
                      <Textarea
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(chatInput, selectedImage || undefined);
                          }
                        }}
                        placeholder="Type a message or share an image..."
                        className="min-h-[40px] max-h-[120px] resize-none border-[#E8E4DC] bg-white"
                      />
                      <Button
                        size="icon"
                        onClick={() => handleSendMessage(chatInput, selectedImage || undefined)}
                        disabled={!chatInput.trim() && !selectedImage}
                        className="shrink-0 w-10 h-10 bg-[#0D9488] hover:bg-[#0F766E] text-white"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes Tab */}
              {activeTab === "notes" && (
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-3">
                    {notes.length === 0 && (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-[#D1D5DB] mx-auto mb-3" />
                        <p className="text-sm text-[#9CA3AF]">
                          Notes will appear here during the session
                        </p>
                      </div>
                    )}
                    {notes.map((note) => (
                      <div
                        key={note.id}
                        className="p-4 rounded-xl bg-[#F6F5F0] border border-[#E8E4DC]"
                      >
                        <p className="text-sm text-[#374151]">{note.content}</p>
                        <p className="text-[11px] text-[#9CA3AF] mt-2">
                          {note.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => handleAddNote("Note: " + new Date().toLocaleTimeString())}
                      className="w-full border-dashed border-[#E8E4DC] text-[#6B7280]"
                    >
                      + Add Note
                    </Button>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};

interface SessionSetupViewProps {
  config: TutorSessionConfig;
  onConfigChange: (config: TutorSessionConfig) => void;
  onStart: () => void;
  canStart: boolean;
}

function SessionSetupView({ config, onConfigChange, onStart, canStart }: SessionSetupViewProps) {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#CCFBF1] mb-4">
              <Sparkles className="w-4 h-4 text-[#0D9488]" />
              <span className="text-[13px] font-medium text-[#0D9488]">Start Your Learning Session</span>
            </div>
            <h1 className="text-3xl font-bold text-[#374151] mb-2" style={{ fontFamily: "'Lora', serif" }}>
              What would you like to learn today?
            </h1>
            <p className="text-[#6B7280]">
              Tell us your preferences and we'll tailor the session for you
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-2 rounded-full transition-all",
                  s <= step ? "bg-[#0D9488]" : "bg-[#E8E4DC]",
                  s === step ? "w-10" : "w-2"
                )}
              />
            ))}
          </div>

          <Card className="p-8 border-[#E8E4DC] rounded-[24px] bg-white/80 backdrop-blur">
            {step === 1 && (
              <Step1Subject config={config} onConfigChange={onConfigChange} onNext={() => setStep(2)} />
            )}
            {step === 2 && (
              <Step2TopicGoal config={config} onConfigChange={onConfigChange} onNext={() => setStep(3)} onBack={() => setStep(1)} />
            )}
            {step === 3 && (
              <Step3Settings config={config} onConfigChange={onConfigChange} onBack={() => setStep(2)} onStart={onStart} canStart={canStart} />
            )}
          </Card>
        </div>
      </div>

      <div className="w-[380px] bg-gradient-to-br from-[#F0EDEA] via-[#E8E4DC] to-[#DDD8CF] p-8 flex flex-col justify-center relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-[#0D9488] flex items-center justify-center mb-6">
            <Brain className="w-7 h-7 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-[#374151] mb-3" style={{ fontFamily: "'Lora', serif" }}>
            Your AI Tutor Awaits
          </h2>
          <p className="text-[#6B7280] mb-8 leading-relaxed">
            Personalized lessons, instant feedback, and adaptive learning at your pace.
          </p>

          <div className="space-y-4">
            <FeatureItem icon={Target} title="Personalized Path" description="Lessons tailored to you" />
            <FeatureItem icon={Zap} title="Instant Feedback" description="Real-time guidance" />
            <FeatureItem icon={Lightbulb} title="Smart Examples" description="Context-aware explanations" />
            <FeatureItem icon={Image} title="Image Validation" description="Share images for analysis" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Step1Subject({ config, onConfigChange, onNext }: {
  config: TutorSessionConfig;
  onConfigChange: (config: TutorSessionConfig) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-[#374151] mb-1">Choose a Subject</h3>
      <p className="text-[13px] text-[#6B7280] mb-6">What would you like to learn about?</p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {userSubjects.map((subject) => {
          const Icon = subject.icon;
          const isSelected = config.subject === subject.name;
          return (
            <button
              key={subject.name}
              onClick={() => onConfigChange({ ...config, subject: subject.name })}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all",
                isSelected
                  ? "border-[#0D9488] bg-[#CCFBF1]"
                  : "border-[#E8E4DC] bg-white hover:border-[#0D9488]/50"
              )}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 bg-[#F3F4F6]">
                <Icon className="w-5 h-5" style={{ color: subject.color }} />
              </div>
              <p className="text-[14px] font-medium text-[#374151]">{subject.name}</p>
              <p className="text-[11px] text-[#6B7280]">{subject.progress}% progress</p>
            </button>
          );
        })}
      </div>

      <div className="p-4 rounded-xl bg-[#F6F5F0] border border-[#E8E4DC]">
        <p className="text-[12px] font-medium text-[#6B7280] mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
          Recommended based on your progress
        </p>
        <div className="space-y-2">
          {recommendedTopics.slice(0, 2).map((rec, idx) => (
            <button
              key={idx}
              onClick={() => onConfigChange({ ...config, subject: rec.subject, topic: rec.topic })}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-[#E8E4DC] hover:border-[#0D9488] transition-all"
            >
              <div className="text-left">
                <p className="text-[13px] font-medium text-[#374151]">{rec.topic}</p>
                <p className="text-[11px] text-[#6B7280]">{rec.subject}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          onClick={onNext}
          disabled={!config.subject}
          className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-6"
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function Step2TopicGoal({ config, onConfigChange, onNext, onBack }: {
  config: TutorSessionConfig;
  onConfigChange: (config: TutorSessionConfig) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const topicSuggestions: Record<string, string[]> = {
    "Python Programming": ["Functions", "OOP", "Data Structures", "Algorithms", "Error Handling"],
    "Mathematics": ["Algebra", "Calculus", "Geometry", "Statistics", "Trigonometry"],
    "Spanish": ["Vocabulary", "Verbs", "Grammar", "Conversation", "Reading"],
  };

  const topics = topicSuggestions[config.subject] || [];

  return (
    <div>
      <h3 className="text-lg font-semibold text-[#374151] mb-1">Topic & Learning Goal</h3>
      <p className="text-[13px] text-[#6B7280] mb-6">What specific topic and goal do you have?</p>

      <div className="mb-6">
        <label className="text-[14px] font-medium text-[#374151] mb-2 block">Topic</label>
        <input
          type="text"
          value={config.topic}
          onChange={(e) => onConfigChange({ ...config, topic: e.target.value })}
          placeholder="e.g., Functions & Closures"
          className="w-full px-4 py-3 rounded-xl border border-[#E8E4DC] bg-white text-[14px] text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => onConfigChange({ ...config, topic })}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all",
                config.topic === topic
                  ? "bg-[#0D9488] text-white"
                  : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E8E4DC]"
              )}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[14px] font-medium text-[#374151] mb-2 block">Learning Goal</label>
        <div className="grid grid-cols-2 gap-2">
          {quickGoals.map((goal) => (
            <button
              key={goal}
              onClick={() => onConfigChange({ ...config, goal })}
              className={cn(
                "p-3 rounded-xl text-[13px] text-left transition-all border-2",
                config.goal === goal
                  ? "border-[#0D9488] bg-[#CCFBF1] text-[#0D9488]"
                  : "border-[#E8E4DC] bg-white text-[#374151] hover:border-[#0D9488]/50"
              )}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack} className="border-[#E8E4DC] text-[#6B7280]">
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!config.topic}
          className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-6"
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function Step3Settings({ config, onConfigChange, onBack, onStart, canStart }: {
  config: TutorSessionConfig;
  onConfigChange: (config: TutorSessionConfig) => void;
  onBack: () => void;
  onStart: () => void;
  canStart: boolean;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-[#374151] mb-1">Session Settings</h3>
      <p className="text-[13px] text-[#6B7280] mb-6">Finalize your preferences</p>

      <div className="space-y-6">
        <div>
          <label className="text-[14px] font-medium text-[#374151] mb-2 block">Difficulty Level</label>
          <div className="grid grid-cols-3 gap-3">
            {difficultyOptions.map((level) => (
              <button
                key={level.id}
                onClick={() => onConfigChange({ ...config, difficulty: level.id as "beginner" | "intermediate" | "advanced" })}
                className={cn(
                  "p-3 rounded-xl border-2 text-center transition-all",
                  config.difficulty === level.id ? "" : "border-[#E8E4DC] bg-white hover:border-[#0D9488]/50"
                )}
                style={{
                  borderColor: config.difficulty === level.id ? level.color : undefined,
                  backgroundColor: config.difficulty === level.id ? `${level.color}15` : undefined,
                }}
              >
                <p className="text-[14px] font-medium text-[#374151]">{level.label}</p>
                <p className="text-[11px] text-[#6B7280]">{level.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[14px] font-medium text-[#374151] mb-2 block">Session Duration</label>
          <div className="grid grid-cols-4 gap-3">
            {durationOptions.map((dur) => (
              <button
                key={dur}
                onClick={() => onConfigChange({ ...config, duration: dur })}
                className={cn(
                  "p-3 rounded-xl border-2 text-center transition-all",
                  config.duration === dur
                    ? "border-[#0D9488] bg-[#CCFBF1]"
                    : "border-[#E8E4DC] bg-white hover:border-[#0D9488]/50"
                )}
              >
                <p className="text-[18px] font-bold text-[#374151]">{dur}</p>
                <p className="text-[11px] text-[#6B7280]">min</p>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#F6F5F0] border border-[#E8E4DC]">
          <p className="text-[13px] font-semibold text-[#374151] mb-3">Session Summary</p>
          <div className="grid grid-cols-2 gap-3 text-[13px]">
            <div><span className="text-[#6B7280]">Subject:</span> <span className="ml-2 font-medium text-[#374151]">{config.subject}</span></div>
            <div><span className="text-[#6B7280]">Topic:</span> <span className="ml-2 font-medium text-[#374151]">{config.topic}</span></div>
            <div><span className="text-[#6B7280]">Difficulty:</span> <span className="ml-2 font-medium text-[#374151] capitalize">{config.difficulty}</span></div>
            <div><span className="text-[#6B7280]">Duration:</span> <span className="ml-2 font-medium text-[#374151]">{config.duration} min</span></div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack} className="border-[#E8E4DC] text-[#6B7280]">
          Back
        </Button>
        <Button
          onClick={onStart}
          disabled={!canStart}
          className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-8 py-6 text-[15px] font-semibold"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Learning
        </Button>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-white">
        <Icon className="w-5 h-5 text-[#0D9488]" />
      </div>
      <div>
        <p className="font-medium text-[#374151] text-[14px]">{title}</p>
        <p className="text-[#6B7280] text-[12px]">{description}</p>
      </div>
    </div>
  );
}

export default TutorSession;
