import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileCheck, 
  Sparkles, 
  Clock, 
  Brain,
  Target,
  TrendingUp,
  Zap,
  Filter,
  Search,
  ChevronRight,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardSidebar, DashboardHeader } from "@/components/dashboard";
import { QuizCard } from "@/components/practice";
import { Button } from "@/components/ui/button";

const userSubjects = [
  { name: "Python Programming", progress: 72, weakAreas: ["Functions", "OOP"] },
  { name: "Mathematics", progress: 45, weakAreas: ["Calculus", "Algebra"] },
  { name: "Spanish", progress: 60, weakAreas: ["Verb Conjugation"] },
];

const recommendedTests = [
  {
    id: "rec-1",
    title: "Python Functions Review",
    subject: "Python Programming",
    reason: "Based on your recent sessions",
    questionCount: 10,
    duration: 15,
    difficulty: "intermediate" as const,
    type: "recommended",
  },
  {
    id: "rec-2",
    title: "Calculus Fundamentals",
    subject: "Mathematics",
    reason: "Strengthen your weak area",
    questionCount: 15,
    duration: 25,
    difficulty: "intermediate" as const,
    type: "recommended",
  },
  {
    id: "rec-3",
    title: "Spanish Verbs Practice",
    subject: "Spanish",
    reason: "Daily practice recommended",
    questionCount: 12,
    duration: 10,
    difficulty: "beginner" as const,
    type: "recommended",
  },
];

const testTypes = [
  { id: "quick", name: "Quick Quiz", icon: Zap, description: "5-10 questions, 5-10 min", color: "#F59E0B" },
  { id: "practice", name: "Practice Test", icon: FileCheck, description: "15-25 questions, 20-30 min", color: "#0D9488" },
  { id: "exam", name: "Exam Simulation", icon: Clock, description: "Full exam, timed, no pause", color: "#EF4444" },
  { id: "ai", name: "AI Generated", icon: Sparkles, description: "Personalized based on your progress", color: "#6366F1" },
];

const availableQuizzes = [
  {
    id: "q1",
    title: "Python Basics #1",
    subject: "Python Programming",
    questionCount: 10,
    duration: 15,
    difficulty: "beginner" as const,
    completed: true,
    score: 92,
  },
  {
    id: "q2",
    title: "Algebra - Linear Equations",
    subject: "Mathematics",
    questionCount: 15,
    duration: 25,
    difficulty: "intermediate" as const,
    completed: false,
  },
  {
    id: "q3",
    title: "Spanish Vocabulary",
    subject: "Spanish",
    questionCount: 20,
    duration: 20,
    difficulty: "beginner" as const,
    completed: true,
    score: 88,
  },
  {
    id: "q4",
    title: "OOP Concepts",
    subject: "Python Programming",
    questionCount: 12,
    duration: 20,
    difficulty: "advanced" as const,
    completed: false,
  },
];

const Practice: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedTestType, setSelectedTestType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleStartQuiz = (id: string) => {
    console.log("Starting quiz:", id);
  };

  const handlePreviewQuiz = (id: string) => {
    console.log("Previewing quiz:", id);
  };

  const handleGenerateTest = (testType: string) => {
    console.log("Generating test type:", testType);
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
                <h1 className="text-2xl font-bold text-[#111827]" style={{ fontFamily: "'Lora', serif" }}>
                  Practice & Tests
                </h1>
                <p className="text-[#9CA3AF] mt-1">
                  Personalized quizzes and tests based on your learning journey
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-[#E8E4DC] bg-white text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20"
                >
                  <option value="all">All Subjects</option>
                  {userSubjects.map((s) => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* AI Recommended Section */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-[#6366F1]/10">
                  <Lightbulb className="w-5 h-5 text-[#6366F1]" />
                </div>
                <h2 className="text-lg font-semibold text-[#111827]">Recommended for You</h2>
              </div>
              <p className="text-[13px] text-[#9CA3AF] mb-4">
                Based on your learning history and current progress
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {recommendedTests.map((test) => (
                  <div
                    key={test.id}
                    className="p-5 bg-white border border-[#E8E4DC] rounded-[18px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-[180ms] cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-[15px] font-semibold text-[#111827]">{test.title}</h3>
                        <p className="text-[12px] text-[#9CA3AF]">{test.subject}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-[#6366F1]/10 text-[#6366F1]">
                        {test.difficulty}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#6366F1] mb-3 flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {test.reason}
                    </p>
                    <div className="flex items-center gap-4 mb-4 text-[12px] text-[#6B7280]">
                      <span>{test.questionCount} Qs</span>
                      <span>{test.duration} min</span>
                    </div>
                    <Button
                      onClick={() => handleStartQuiz(test.id)}
                      className="w-full bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-white hover:shadow-[0_4px_12px_rgba(99,102,241,0.40)]"
                    >
                      Start Now
                    </Button>
                  </div>
                ))}
              </div>
            </section>

            {/* Choose Your Test Type */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#F59E0B]" />
                <h2 className="text-lg font-semibold text-[#111827]">Choose Your Test</h2>
              </div>
              <p className="text-[13px] text-[#9CA3AF] mb-4">
                Select a test type and we'll generate a personalized test for you
              </p>
              <div className="grid md:grid-cols-4 gap-4">
                {testTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => handleGenerateTest(type.id)}
                      className="p-5 bg-white border border-[#E8E4DC] rounded-[18px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-[180ms] text-left group"
                      style={{ borderLeftWidth: "3px", borderLeftColor: type.color }}
                    >
                      <Icon className="w-8 h-8 mb-3" style={{ color: type.color }} />
                      <h3 className="text-[14px] font-semibold text-[#111827] mb-1">{type.name}</h3>
                      <p className="text-[12px] text-[#9CA3AF]">{type.description}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Your Subjects & Weak Areas */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#0D9488]" />
                <h2 className="text-lg font-semibold text-[#111827]">Your Subjects</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {userSubjects.map((subject) => (
                  <div
                    key={subject.name}
                    className="p-5 bg-white border border-[#E8E4DC] rounded-[18px]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-[14px] font-semibold text-[#111827]">{subject.name}</h3>
                      <span className="text-[14px] font-bold text-[#0D9488]">{subject.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#F3F4F6] overflow-hidden mb-3">
                      <div
                        className="h-full rounded-full bg-[#0D9488] transition-all duration-500"
                        style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                    {subject.weakAreas.length > 0 && (
                      <div>
                        <p className="text-[11px] text-[#9CA3AF] mb-2">Focus areas:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {subject.weakAreas.map((area) => (
                            <button
                              key={area}
                              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A] transition-colors"
                            >
                              {area}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Available Quizzes */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#0D9488]" />
                  <h2 className="text-lg font-semibold text-[#111827]">Available Quizzes</h2>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                  <input
                    type="text"
                    placeholder="Search quizzes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E8E4DC] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableQuizzes.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    {...quiz}
                    onStart={handleStartQuiz}
                    onPreview={handlePreviewQuiz}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Practice;
