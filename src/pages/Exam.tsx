import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Sparkles,
  Target,
  Brain,
  Play,
  Settings,
  ChevronRight,
  Zap,
  FileText,
  Timer,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardSidebar, DashboardHeader } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const recommendedExams = [
  {
    id: "rec-exam-1",
    title: "Python Midterm Prep",
    subject: "Python Programming",
    reason: "Based on your weak areas: Functions & OOP",
    questionCount: 30,
    duration: 60,
    difficulty: "intermediate",
    topics: ["Functions", "OOP", "Error Handling"],
    score: null,
  },
  {
    id: "rec-exam-2",
    title: "Math Final Simulation",
    subject: "Mathematics",
    reason: "Exam in 2 weeks - practice recommended",
    questionCount: 40,
    duration: 90,
    difficulty: "advanced",
    topics: ["Calculus", "Algebra", "Trigonometry"],
    score: null,
  },
  {
    id: "rec-exam-3",
    title: "Spanish Proficiency Test",
    subject: "Spanish",
    reason: "Track your B1 level progress",
    questionCount: 25,
    duration: 45,
    difficulty: "intermediate",
    topics: ["Verbs", "Vocabulary", "Reading"],
    score: 78,
  },
];

const userSubjects = [
  "Python Programming",
  "Mathematics",
  "Spanish",
  "Physics",
  "Chemistry",
];

const topicOptions: Record<string, string[]> = {
  "Python Programming": ["Basics", "Functions", "OOP", "Data Structures", "Algorithms"],
  "Mathematics": ["Algebra", "Calculus", "Geometry", "Trigonometry", "Statistics"],
  "Spanish": ["Vocabulary", "Verbs", "Grammar", "Reading", "Writing"],
  "Physics": ["Mechanics", "Thermodynamics", "Waves", "Electromagnetism"],
  "Chemistry": ["Organic", "Inorganic", "Physical", "Biochemistry"],
};

const difficultyLevels = [
  { id: "beginner", label: "Beginner", color: "#10B981", description: "Basic concepts" },
  { id: "intermediate", label: "Intermediate", color: "#F59E0B", description: "Standard level" },
  { id: "advanced", label: "Advanced", color: "#EF4444", description: "Challenging problems" },
];

const timeOptions = [15, 30, 45, 60, 90, 120];

const Exam: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showCustomExam, setShowCustomExam] = useState(false);
  const [customExam, setCustomExam] = useState({
    subject: "",
    topics: [] as string[],
    difficulty: "intermediate",
    questionCount: 20,
    duration: 30,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleStartExam = (examId: string) => {
    navigate(`/exam-session/${examId}`);
  };

  const handleGenerateExam = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      console.log("Generated exam:", customExam);
    }, 2000);
  };

  const handleTopicToggle = (topic: string) => {
    setCustomExam((prev) => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter((t) => t !== topic)
        : [...prev.topics, topic],
    }));
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0]">
      <DashboardSidebar
        isCollapsed={isSidebarCollapsed}
        onCollapsedChange={setIsSidebarCollapsed}
      />

      <div
        className={cn(
          "transition-all duration-300",
          isSidebarCollapsed ? "ml-[68px]" : "ml-[240px]"
        )}
      >
        <DashboardHeader
          userName="Arjun"
          userEmail="arjun@example.com"
          notificationCount={2}
        />

        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1
                  className="text-2xl font-bold text-[#111827]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Exams
                </h1>
                <p className="text-[#9CA3AF] mt-1">
                  AI-generated exams tailored to your learning journey
                </p>
              </div>
              <Button
                onClick={() => setShowCustomExam(!showCustomExam)}
                className={cn(
                  "gap-2",
                  showCustomExam
                    ? "bg-[#374151] text-white"
                    : "bg-gradient-to-br from-[#0D9488] to-[#0F766E] text-white"
                )}
              >
                <Settings className="w-4 h-4" />
                {showCustomExam ? "View Recommendations" : "Create Custom Exam"}
              </Button>
            </div>

            {!showCustomExam ? (
              <>
                {/* Recommended Exams */}
                <section className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-[#6366F1]/10">
                      <Sparkles className="w-5 h-5 text-[#6366F1]" />
                    </div>
                    <h2 className="text-lg font-semibold text-[#111827]">
                      Recommended for You
                    </h2>
                  </div>
                  <p className="text-[13px] text-[#9CA3AF] mb-4">
                    Based on your progress, weak areas, and upcoming deadlines
                  </p>
                  <div className="grid md:grid-cols-3 gap-5">
                    {recommendedExams.map((exam) => (
                      <Card
                        key={exam.id}
                        className="p-6 bg-white border border-[#E8E4DC] rounded-[18px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-[15px] font-semibold text-[#111827]">
                              {exam.title}
                            </h3>
                            <p className="text-[12px] text-[#9CA3AF]">{exam.subject}</p>
                          </div>
                          {exam.score && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#D1FAE5]">
                              <Award className="w-3 h-3 text-[#10B981]" />
                              <span className="text-[11px] font-medium text-[#065F46]">
                                {exam.score}%
                              </span>
                            </div>
                          )}
                        </div>

                        <p className="text-[12px] text-[#6366F1] mb-3 flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {exam.reason}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {exam.topics.map((topic) => (
                            <span
                              key={topic}
                              className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F3F4F6] text-[#6B7280]"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 mb-4 text-[12px] text-[#6B7280]">
                          <div className="flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            <span>{exam.questionCount} questions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Timer className="w-3.5 h-3.5" />
                            <span>{exam.duration} min</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleStartExam(exam.id)}
                          className="w-full bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-white hover:shadow-[0_4px_12px_rgba(99,102,241,0.40)]"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Exam
                        </Button>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* Quick Stats */}
                <section className="grid md:grid-cols-4 gap-4 mb-10">
                  <Card className="p-5 bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-white border-0 rounded-[18px]">
                    <Brain className="w-8 h-8 mb-3 opacity-80" />
                    <p className="text-[28px] font-bold" style={{ fontFamily: "'Lora', serif" }}>
                      12
                    </p>
                    <p className="text-[13px] opacity-80">Exams Completed</p>
                  </Card>
                  <Card className="p-5 bg-white border border-[#E8E4DC] rounded-[18px]">
                    <Award className="w-8 h-8 mb-3 text-[#F59E0B]" />
                    <p className="text-[28px] font-bold text-[#111827]" style={{ fontFamily: "'Lora', serif" }}>
                      85%
                    </p>
                    <p className="text-[13px] text-[#9CA3AF]">Avg Score</p>
                  </Card>
                  <Card className="p-5 bg-white border border-[#E8E4DC] rounded-[18px]">
                    <Clock className="w-8 h-8 mb-3 text-[#10B981]" />
                    <p className="text-[28px] font-bold text-[#111827]" style={{ fontFamily: "'Lora', serif" }}>
                      8.5h
                    </p>
                    <p className="text-[13px] text-[#9CA3AF]">Total Time</p>
                  </Card>
                  <Card className="p-5 bg-white border border-[#E8E4DC] rounded-[18px]">
                    <Zap className="w-8 h-8 mb-3 text-[#EF4444]" />
                    <p className="text-[28px] font-bold text-[#111827]" style={{ fontFamily: "'Lora', serif" }}>
                      3
                    </p>
                    <p className="text-[13px] text-[#9CA3AF]">Weak Areas to Focus</p>
                  </Card>
                </section>
              </>
            ) : (
              <>
                {/* Custom Exam Generator */}
                <section className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-[#0D9488]/10">
                      <Settings className="w-5 h-5 text-[#0D9488]" />
                    </div>
                    <h2 className="text-lg font-semibold text-[#111827]">
                      Create Your Custom Exam
                    </h2>
                  </div>
                  <p className="text-[13px] text-[#9CA3AF] mb-6">
                    AI will generate questions based on your selections
                  </p>

                  <Card className="p-6 bg-white border border-[#E8E4DC] rounded-[18px]">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-6">
                        {/* Subject Selection */}
                        <div>
                          <label className="text-[14px] font-medium text-[#374151] mb-2 block">
                            Subject
                          </label>
                          <select
                            value={customExam.subject}
                            onChange={(e) =>
                              setCustomExam({ ...customExam, subject: e.target.value, topics: [] })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-[#E8E4DC] bg-white text-[14px] text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20"
                          >
                            <option value="">Select a subject</option>
                            {userSubjects.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Topics Selection */}
                        {customExam.subject && (
                          <div>
                            <label className="text-[14px] font-medium text-[#374151] mb-2 block">
                              Topics (select multiple)
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {topicOptions[customExam.subject]?.map((topic) => (
                                <button
                                  key={topic}
                                  onClick={() => handleTopicToggle(topic)}
                                  className={cn(
                                    "px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all",
                                    customExam.topics.includes(topic)
                                      ? "bg-[#0D9488] text-white"
                                      : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E8E4DC]"
                                  )}
                                >
                                  {topic}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Difficulty */}
                        <div>
                          <label className="text-[14px] font-medium text-[#374151] mb-2 block">
                            Difficulty
                          </label>
                          <div className="flex gap-3">
                            {difficultyLevels.map((level) => (
                              <button
                                key={level.id}
                                onClick={() =>
                                  setCustomExam({ ...customExam, difficulty: level.id })
                                }
                                className={cn(
                                  "flex-1 p-3 rounded-xl border text-[13px] font-medium transition-all",
                                  customExam.difficulty === level.id
                                    ? "border-2"
                                    : "border-[#E8E4DC] bg-white text-[#6B7280]"
                                )}
                                style={{
                                  borderColor:
                                    customExam.difficulty === level.id ? level.color : undefined,
                                  backgroundColor:
                                    customExam.difficulty === level.id
                                      ? `${level.color}10`
                                      : undefined,
                                  color:
                                    customExam.difficulty === level.id ? level.color : undefined,
                                }}
                              >
                                {level.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Question Count */}
                        <div>
                          <label className="text-[14px] font-medium text-[#374151] mb-2 block">
                            Number of Questions: {customExam.questionCount}
                          </label>
                          <input
                            type="range"
                            min={5}
                            max={50}
                            step={5}
                            value={customExam.questionCount}
                            onChange={(e) =>
                              setCustomExam({
                                ...customExam,
                                questionCount: parseInt(e.target.value),
                              })
                            }
                            className="w-full h-2 rounded-full bg-[#E8E4DC] appearance-none cursor-pointer accent-[#0D9488]"
                          />
                          <div className="flex justify-between text-[11px] text-[#9CA3AF] mt-1">
                            <span>5</span>
                            <span>50</span>
                          </div>
                        </div>

                        {/* Duration */}
                        <div>
                          <label className="text-[14px] font-medium text-[#374151] mb-2 block">
                            Time Limit (minutes)
                          </label>
                          <div className="grid grid-cols-6 gap-2">
                            {timeOptions.map((time) => (
                              <button
                                key={time}
                                onClick={() => setCustomExam({ ...customExam, duration: time })}
                                className={cn(
                                  "p-2 rounded-lg text-[13px] font-medium transition-all",
                                  customExam.duration === time
                                    ? "bg-[#0D9488] text-white"
                                    : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E8E4DC]"
                                )}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Exam Summary */}
                        <div className="p-4 rounded-xl bg-[#F6F5F0] border border-[#E8E4DC]">
                          <h4 className="text-[14px] font-semibold text-[#374151] mb-3">
                            Exam Summary
                          </h4>
                          <div className="space-y-2 text-[13px]">
                            <div className="flex justify-between">
                              <span className="text-[#6B7280]">Subject:</span>
                              <span className="font-medium text-[#374151]">
                                {customExam.subject || "Not selected"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#6B7280]">Topics:</span>
                              <span className="font-medium text-[#374151]">
                                {customExam.topics.length > 0
                                  ? customExam.topics.join(", ")
                                  : "All topics"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#6B7280]">Questions:</span>
                              <span className="font-medium text-[#374151]">
                                {customExam.questionCount}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#6B7280]">Duration:</span>
                              <span className="font-medium text-[#374151]">
                                {customExam.duration} min
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#6B7280]">Difficulty:</span>
                              <span className="font-medium text-[#374151] capitalize">
                                {customExam.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Generate Button */}
                        <Button
                          onClick={handleGenerateExam}
                          disabled={!customExam.subject || isGenerating}
                          className="w-full py-6 text-[15px] bg-gradient-to-br from-[#0D9488] to-[#0F766E] text-white hover:shadow-[0_4px_16px_rgba(13,148,136,0.40)] disabled:opacity-50"
                        >
                          {isGenerating ? (
                            <>
                              <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                              Generating Questions...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5 mr-2" />
                              Generate AI Exam
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </section>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Exam;
