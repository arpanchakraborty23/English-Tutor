import React, { useState } from "react";
import {
  TrendingUp,
  Clock,
  Target,
  Award,
  BookOpen,
  Calendar,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { DashboardSidebar, DashboardHeader } from "@/components/dashboard";

const weeklyProgressData = [
  { day: "Mon", hours: 1.5, sessions: 2, score: 85 },
  { day: "Tue", hours: 2.0, sessions: 3, score: 88 },
  { day: "Wed", hours: 1.0, sessions: 1, score: 82 },
  { day: "Thu", hours: 2.5, sessions: 4, score: 91 },
  { day: "Fri", hours: 1.8, sessions: 2, score: 87 },
  { day: "Sat", hours: 3.0, sessions: 3, score: 93 },
  { day: "Sun", hours: 2.2, sessions: 2, score: 90 },
];

const monthlyTrendData = [
  { week: "W1", hours: 8, score: 75 },
  { week: "W2", hours: 10, score: 78 },
  { week: "W3", hours: 12, score: 82 },
  { week: "W4", hours: 14, score: 85 },
];

const subjectProgress = [
  { subject: "Python Programming", progress: 85, lessons: 24, total: 30, color: "#0D9488" },
  { subject: "Mathematics", progress: 60, lessons: 12, total: 20, color: "#F59E0B" },
  { subject: "Spanish", progress: 45, lessons: 9, total: 20, color: "#6366F1" },
  { subject: "Physics", progress: 30, lessons: 6, total: 20, color: "#EC4899" },
];

const skillBreakdown = [
  { skill: "Problem Solving", score: 88 },
  { skill: "Concept Understanding", score: 92 },
  { skill: "Code Efficiency", score: 75 },
  { skill: "Test Performance", score: 85 },
  { skill: "Time Management", score: 70 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#E8E4DC] rounded-xl p-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
        <p className="text-[#374151] font-medium text-sm">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Progress: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-[#111827]" style={{ fontFamily: "'Lora', serif" }}>
                  My Progress
                </h1>
                <p className="text-[#9CA3AF] mt-1">
                  Track your learning journey and achievements
                </p>
              </div>
              <div className="flex items-center gap-2">
                {(["week", "month", "year"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                      timeRange === range
                        ? "bg-[#0D9488] text-white"
                        : "bg-white border border-[#E8E4DC] text-[#6B7280] hover:bg-[#F0EDEA]"
                    )}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-5 bg-white border border-[#E8E4DC] rounded-[18px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-[#CCFBF1]">
                    <TrendingUp className="w-5 h-5 text-[#0D9488]" />
                  </div>
                  <span className="text-[13px] text-[#9CA3AF]">Avg Score</span>
                </div>
                <p className="text-[28px] font-bold text-[#111827]" style={{ fontFamily: "'Lora', serif" }}>
                  87%
                </p>
                <p className="text-[12px] text-[#10B981]">+5% vs last week</p>
              </div>

              <div className="p-5 bg-white border border-[#E8E4DC] rounded-[18px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-[#FEF3C7]">
                    <Clock className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <span className="text-[13px] text-[#9CA3AF]">Total Hours</span>
                </div>
                <p className="text-[28px] font-bold text-[#111827]" style={{ fontFamily: "'Lora', serif" }}>
                  42.5h
                </p>
                <p className="text-[12px] text-[#10B981]">+8.3h this week</p>
              </div>

              <div className="p-5 bg-white border border-[#E8E4DC] rounded-[18px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-[#DBEAFE]">
                    <Target className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <span className="text-[13px] text-[#9CA3AF]">Goals Met</span>
                </div>
                <p className="text-[28px] font-bold text-[#111827]" style={{ fontFamily: "'Lora', serif" }}>
                  3/5
                </p>
                <p className="text-[12px] text-[#9CA3AF]">60% completion</p>
              </div>

              <div className="p-5 bg-white border border-[#E8E4DC] rounded-[18px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-[#FCE7F3]">
                    <Award className="w-5 h-5 text-[#EC4899]" />
                  </div>
                  <span className="text-[13px] text-[#9CA3AF]">Current Rank</span>
                </div>
                <p className="text-[28px] font-bold text-[#111827]" style={{ fontFamily: "'Lora', serif" }}>
                  Top 15%
                </p>
                <p className="text-[12px] text-[#10B981]">+3 positions</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-5 mb-8">
              <div className="p-6 bg-white border border-[#E8E4DC] rounded-[18px]">
                <h3 className="text-[15px] font-semibold text-[#111827] mb-4">
                  Weekly Activity
                </h3>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyProgressData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E4DC" />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9CA3AF", fontSize: 12 }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9CA3AF", fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F6F5F0" }} />
                      <Bar dataKey="hours" fill="#0D9488" radius={[4, 4, 0, 0]} barSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-6 bg-white border border-[#E8E4DC] rounded-[18px]">
                <h3 className="text-[15px] font-semibold text-[#111827] mb-4">
                  Score Trend
                </h3>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyProgressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0D9488" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E4DC" />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9CA3AF", fontSize: 12 }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        domain={[0, 100]}
                        tick={{ fill: "#9CA3AF", fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#0D9488"
                        strokeWidth={2}
                        fill="url(#scoreGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-5">
              <div className="p-6 bg-white border border-[#E8E4DC] rounded-[18px]">
                <h3 className="text-[15px] font-semibold text-[#111827] mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0D9488]" />
                  Subject Progress
                </h3>
                <div className="space-y-4">
                  {subjectProgress.map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-medium text-[#374151]">{subject.subject}</span>
                        <span className="text-[12px] text-[#9CA3AF]">
                          {subject.lessons}/{subject.total} lessons
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${subject.progress}%`,
                            backgroundColor: subject.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white border border-[#E8E4DC] rounded-[18px]">
                <h3 className="text-[15px] font-semibold text-[#111827] mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#F59E0B]" />
                  Skill Breakdown
                </h3>
                <div className="space-y-4">
                  {skillBreakdown.map((skill) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-medium text-[#374151]">{skill.skill}</span>
                        <span className="text-[12px] font-semibold text-[#0D9488]">{skill.score}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#0D9488] transition-all duration-500"
                          style={{ width: `${skill.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Progress;
