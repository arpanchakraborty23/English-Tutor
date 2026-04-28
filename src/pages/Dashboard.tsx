import React, { useState } from "react";
import {
  Video,
  Clock,
  BookOpen,
  MessageCircle,
  Code,
  TrendingUp,
  Brain,
  Target,
  Award,
  Zap,
  Flame,
  Star,
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  KPICard,
  ChartCard,
  TimeRangeSelector,
  DashboardSidebar,
  DashboardHeader,
} from "@/components/dashboard";
import { StreakWidget } from "@/components/dashboard/StreakWidget";

// Weekly learning activity data
const weeklyActivityData = [
  { day: "Mon", hours: 1.5, sessions: 2 },
  { day: "Tue", hours: 2.0, sessions: 3 },
  { day: "Wed", hours: 1.0, sessions: 1 },
  { day: "Thu", hours: 2.5, sessions: 4 },
  { day: "Fri", hours: 1.8, sessions: 2 },
  { day: "Sat", hours: 3.0, sessions: 3 },
  { day: "Sun", hours: 2.2, sessions: 2 },
];

// Subject distribution data
const subjectDistributionData = [
  { name: "Programming", value: 35, color: "#10B981" },
  { name: "Languages", value: 25, color: "#F59E0B" },
  { name: "Mathematics", value: 20, color: "#6366F1" },
  { name: "Sciences", value: 15, color: "#A78BFA" },
  { name: "Other", value: 5, color: "#3B82F6" },
];

// Skill progress trend
const progressTrendData = [
  { week: "W1", score: 45 },
  { week: "W2", score: 52 },
  { week: "W3", score: 58 },
  { week: "W4", score: 65 },
  { week: "W5", score: 72 },
  { week: "W6", score: 78 },
];

// Learning goals progress
const learningGoalsData = [
  { goal: "Complete Python Basics", progress: 85, target: 100 },
  { goal: "Master Spanish Verbs", progress: 60, target: 100 },
  { goal: "Finish Math Course", progress: 40, target: 100 },
];

// Recent sessions
const recentSessionsData = [
  { 
    id: 1,
    subject: "Python Programming", 
    topic: "List Comprehension", 
    duration: "32 min", 
    date: "Today, 10:30 AM",
    score: 92,
    type: "coding"
  },
  { 
    id: 2,
    subject: "Spanish", 
    topic: "Past Tense Conjugation", 
    duration: "28 min", 
    date: "Today, 9:00 AM",
    score: 88,
    type: "language"
  },
  { 
    id: 3,
    subject: "Mathematics", 
    topic: "Quadratic Equations", 
    duration: "45 min", 
    date: "Yesterday",
    score: 85,
    type: "math"
  },
  { 
    id: 4,
    subject: "Physics", 
    topic: "Newton's Laws", 
    duration: "38 min", 
    date: "2 days ago",
    score: 90,
    type: "science"
  },
];

// Skill radar data for current subject
const skillRadarData = [
  { skill: "Understanding", value: 85 },
  { skill: "Application", value: 78 },
  { skill: "Problem Solving", value: 72 },
  { skill: "Communication", value: 88 },
  { skill: "Creativity", value: 65 },
];

// Light theme tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#E5E9EE] rounded-xl p-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
        <p className="text-[#374151] font-medium text-sm">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "all">("7d");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F5F0]">
      {/* Sidebar */}
      <DashboardSidebar 
        isCollapsed={isSidebarCollapsed} 
        onCollapsedChange={setIsSidebarCollapsed} 
      />

      {/* Main Content */}
      <div className={cn(
        "transition-all duration-300",
        isSidebarCollapsed ? "ml-[68px]" : "ml-[240px]"
      )}>
        {/* Header */}
        <DashboardHeader
          userName="Alex Johnson"
          userEmail="alex@example.com"
          notificationCount={3}
        />

        {/* Page Content */}
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-[#374151]">
                  Welcome back, Alex!
                </h1>
                <p className="text-[#9CA3AF] mt-1">
                  Continue your learning journey
                </p>
              </div>
              <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
            </div>

            {/* Primary KPI Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <KPICard
                title="Sessions"
                value={12}
                change="+3"
                changeType="positive"
                icon={Video}
                description="this week"
              />
              <KPICard
                title="Learning Hours"
                value="4h 30m"
                change="+45m"
                changeType="positive"
                icon={Clock}
                description="this week"
              />
              <KPICard
                title="Day Streak"
                value={7}
                change="best: 12"
                changeType="neutral"
                icon={Flame}
              />
              <KPICard
                title="Lessons Done"
                value="24/40"
                change="60%"
                changeType="positive"
                icon={BookOpen}
              />
              <KPICard
                title="Avg Score"
                value="85%"
                change="Top 15%"
                changeType="positive"
                icon={Target}
              />
              <KPICard
                title="XP Points"
                value="1,250"
                change="Level 5"
                changeType="positive"
                icon={Star}
              />
            </div>

            {/* Second Row - AI Insights & Progress Trend */}
            <div className="grid lg:grid-cols-2 gap-5 mb-8">
              {/* AI Insights */}
              <ChartCard
                title="AI Learning Insights"
                subtitle="Personalized recommendations"
              >
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#10B981]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-[#10B981]" />
                      <h4 className="text-[#065F46] font-semibold text-sm">Strengths Identified</h4>
                    </div>
                    <p className="text-sm text-[#374151] leading-relaxed">
                      Excellent problem-solving skills in Python! Your code efficiency has improved by 25% this week.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#F59E0B]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-[#F59E0B]" />
                      <h4 className="text-[#92400E] font-semibold text-sm">Focus Areas</h4>
                    </div>
                    <p className="text-sm text-[#374151] leading-relaxed">
                      Spanish verb conjugations need practice. Try scheduling 10 minutes of daily conjugation drills.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#3B82F6]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-[#3B82F6]" />
                      <h4 className="text-[#1E40AF] font-semibold text-sm">AI Recommendation</h4>
                    </div>
                    <p className="text-sm text-[#374151] leading-relaxed">
                      Based on your learning patterns, morning sessions show 18% better retention. Consider scheduling before 10 AM.
                    </p>
                  </div>
                </div>
              </ChartCard>

              {/* Progress Trend */}
              <ChartCard title="Learning Progress Trend">
                <div className="w-full h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                      <XAxis
                        dataKey="week"
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
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: "#10B981", strokeWidth: 2, r: 4, stroke: "#fff" }}
                        activeDot={{ r: 6, fill: "#10B981", stroke: "#fff", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#374151]">
                    <strong className="text-[#374151]">+33%</strong> improvement from week 1
                  </span>
                </div>
              </ChartCard>
            </div>

            {/* Learning Goals & Recent Sessions */}
            <div className="grid lg:grid-cols-2 gap-5 mb-8">
              {/* Learning Goals */}
              <ChartCard title="Learning Goals" subtitle="Your progress">
                <div className="space-y-4">
                  {learningGoalsData.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#374151]">{goal.goal}</span>
                        <span className="text-sm font-medium text-[#374151]">{goal.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] transition-all duration-500"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full py-2.5 rounded-lg border border-[#E5E9EE] text-sm text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#374151] transition-colors">
                  + Add New Goal
                </button>
              </ChartCard>

              {/* Recent Sessions */}
              <ChartCard title="Recent Sessions">
                <div className="space-y-3">
                  {recentSessionsData.map((session) => (
                    <div
                      key={session.id}
                      className="p-3 rounded-xl border border-[#E5E9EE] bg-white hover:border-[#10B981]/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-[#374151] truncate">{session.subject}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#6B7280] capitalize">
                              {session.type}
                            </span>
                          </div>
                          <p className="text-xs text-[#9CA3AF]">{session.topic}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-semibold text-[#10B981]">{session.score}%</span>
                          <p className="text-[10px] text-[#9CA3AF]">{session.duration}</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-[#9CA3AF] mt-2">{session.date}</p>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => window.location.href = "/tutor"}
                  className="mt-4 w-full py-2.5 rounded-lg bg-[#10B981] text-white text-sm font-medium hover:bg-[#059669] transition-colors flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  Start New Session
                </button>
              </ChartCard>
            </div>

            {/* Skill Radar */}
            <ChartCard title="Current Skill Profile" subtitle="Based on your recent sessions">
              <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillRadarData}>
                    <PolarGrid stroke="#E5E9EE" />
                    <PolarAngleAxis 
                      dataKey="skill" 
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]} 
                      tick={{ fill: "#9CA3AF", fontSize: 10 }}
                    />
                    <Radar
                      name="Skills"
                      dataKey="value"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
