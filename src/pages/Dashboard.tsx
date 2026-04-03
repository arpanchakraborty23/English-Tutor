import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  CreditCard,
  MessageSquare,
  Cpu,
  Brain,
  Activity,
  LogOut,
  TrendingUp,
  Settings,
  AlertTriangle,
  DollarSign
} from "lucide-react";
import { Card } from "@/components/ui/card";
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
  Cell
} from "recharts";

const activityData = [
  { time: "00:00", interviews: 12 },
  { time: "02:00", interviews: 8 },
  { time: "04:00", interviews: 5 },
  { time: "06:00", interviews: 15 },
  { time: "08:00", interviews: 45 },
  { time: "10:00", interviews: 62 },
  { time: "12:00", interviews: 48 },
  { time: "14:00", interviews: 55 },
  { time: "16:00", interviews: 42 },
  { time: "18:00", interviews: 28 },
  { time: "20:00", interviews: 18 },
  { time: "22:00", interviews: 10 },
];

const modelUsageData = [
  { name: "GPT-4o", value: 68, color: "#10b981" }, // Emerald 500
  { name: "GPT-4o-mini", value: 24, color: "#f59e0b" }, // Amber 500
  { name: "Claude 3.5", value: 8, color: "#3b82f6" }, // Blue 500
];

const menuGroups = [
  {
    title: "OVERVIEW",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard }
    ]
  },
  {
    title: "AI OBSERVABILITY",
    items: [
      { id: "intelligence", label: "AI Intelligence", icon: Brain },
      { id: "limits", label: "AI Usage & Limits", icon: Cpu }
    ]
  },
  {
    title: "OPERATIONS",
    items: [
      { id: "interviews", label: "Interviews", icon: MessageSquare },
      { id: "payments", label: "Payments", icon: CreditCard }
    ]
  },
  {
    title: "INFRASTRUCTURE",
    items: [
      { id: "health", label: "System Health", icon: Activity }
    ]
  }
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="h-screen bg-background text-foreground overflow-hidden flex">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden block">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-emerald-500/10 blur-3xl opacity-50" />
        <div className="absolute bottom-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-emerald-400/10 blur-3xl opacity-50" />
      </div>

      {/* Sidebar */}
      <aside className="relative z-20 w-64 flex flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl shrink-0">
        <div className="flex h-20 items-center px-6 mt-2 mb-4">
          <Link to="/" className="flex items-center gap-3 font-display font-bold">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-lg leading-tight">AI Interview</span>
              <span className="text-white/40 text-xs font-medium">Admin Console</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-4 space-y-6 custom-scrollbar">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <h4 className="px-3 mb-3 text-xs font-bold text-white/30 tracking-wider uppercase">
                {group.title}
              </h4>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group font-medium text-sm ${
                        isActive 
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
                          : "text-white/60 hover:bg-white/5 hover:text-white border border-transparent"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-white/50 group-hover:text-emerald-400 transition-colors"}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto relative z-10 w-full custom-scrollbar">
        <main className="flex-1 container max-w-7xl mx-auto px-6 py-10 pb-20">
          
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              
              {/* Top Title */}
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-2">
                  Dashboard
                </h1>
                <p className="text-white/50 mt-2 text-sm md:text-base">
                  Real-time AI platform health and business metrics
                </p>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {/* Card 1 */}
                <Card className="p-5 border border-white/10 bg-white/[0.02] rounded-2xl hover:border-emerald-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm text-white/50">Interviews Today</p>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-2">342</h3>
                  <div className="flex items-center text-xs">
                    <span className="text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded">↗ +8.5%</span>
                    <span className="text-white/40 ml-2">(vs yesterday)</span>
                  </div>
                </Card>

                {/* Card 2 */}
                <Card className="p-5 border border-white/10 bg-white/[0.02] rounded-2xl hover:border-emerald-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm text-white/50">Revenue Today</p>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-2">$4,847</h3>
                  <div className="flex items-center text-xs">
                    <span className="text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded">↗ +12.5%</span>
                    <span className="text-white/40 ml-2">(vs yesterday)</span>
                  </div>
                </Card>

                {/* Card 3 */}
                <Card className="p-5 border border-white/10 bg-white/[0.02] rounded-2xl hover:border-emerald-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm text-white/50">AI Cost Today</p>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-2">$127</h3>
                  <div className="flex items-center text-xs">
                    <span className="text-red-400 font-medium bg-red-500/10 px-1.5 py-0.5 rounded">↘ -4.2%</span>
                    <span className="text-white/40 ml-2">(vs yesterday)</span>
                  </div>
                </Card>

                {/* Card 4 */}
                <Card className="p-5 border border-white/10 bg-white/[0.02] rounded-2xl hover:border-emerald-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm text-white/50">Profit Today</p>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-2">$4,720</h3>
                  <div className="flex items-center text-xs">
                    <span className="text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded">↗ +14.8%</span>
                    <span className="text-white/40 ml-2">(vs yesterday)</span>
                  </div>
                </Card>

                {/* Card 5 */}
                <Card className="p-5 border border-white/10 bg-white/[0.02] rounded-2xl hover:border-emerald-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm text-white/50 leading-tight">Avg Cost/<br/>Interview</p>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-2">$0.37</h3>
                  <div className="flex items-center text-xs">
                    <span className="text-red-400 font-medium bg-red-500/10 px-1.5 py-0.5 rounded">↘ -8.2%</span>
                    <span className="text-white/40 ml-2">(vs yesterday)</span>
                  </div>
                </Card>

                {/* Card 6 */}
                <Card className="p-5 border border-white/10 bg-white/[0.02] rounded-2xl hover:border-emerald-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm text-white/50">Failure Rate</p>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-2">0.8%</h3>
                  <div className="flex items-center text-xs">
                    <span className="text-red-400 font-medium bg-red-500/10 px-1.5 py-0.5 rounded">↘ -15.3%</span>
                    <span className="text-white/40 ml-2">(vs yesterday)</span>
                  </div>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="grid lg:grid-cols-3 gap-6">
                
                {/* Bar Chart - 2/3 width */}
                <Card className="p-6 lg:col-span-2 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col">
                  <h3 className="font-bold text-white mb-6 font-display">Today's Activity</h3>
                  <div className="flex-1 w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={activityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis 
                          dataKey="time" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                        />
                        <Tooltip 
                          cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                          contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                        />
                        <Bar 
                          dataKey="interviews" 
                          fill="#10b981" 
                          radius={[4, 4, 0, 0]} 
                          barSize={32}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex gap-4 text-sm text-white/50">
                    <p>Peak: <span className="text-white">10:00 AM</span> (62 interviews)</p>
                    <p className="px-3 border-l border-white/10">Avg: <span className="text-white">29</span> interviews/hour</p>
                  </div>
                </Card>

                {/* Donut Chart - 1/3 width */}
                <Card className="p-6 lg:col-span-1 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col">
                  <h3 className="font-bold text-white mb-6 font-display">Model Usage</h3>
                  <div className="flex-1 relative flex items-center justify-center h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={modelUsageData}
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {modelUsageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                          itemStyle={{ color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 space-y-3">
                    {modelUsageData.map((model, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: model.color }} />
                          <span className="text-white/70">{model.name}</span>
                        </div>
                        <span className="font-medium text-white">{model.value}%</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab !== "dashboard" && (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-2">Module Active</h2>
                <p className="text-white/50">The {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} view is ready to be populated.</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
