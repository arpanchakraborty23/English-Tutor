import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Camera,
  Mail,
  Lock,
  Trash2,
  Download,
  Eye,
  EyeOff,
  Brain,
  Plus,
  X,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Study data for AI agent
  const [studyProfile, setStudyProfile] = useState({
    bio: "",
    currentRole: "",
    experience: "",
    goals: [] as string[],
    subjects: [] as string[],
    dailyGoalMinutes: 30,
    preferredDifficulty: "intermediate" as "beginner" | "intermediate" | "advanced",
  });

  const [newGoal, setNewGoal] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const userData = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "",
    userType: "student",
    reminderEnabled: true,
    reminderTime: "09:00",
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      setStudyProfile(prev => ({ ...prev, goals: [...prev.goals, newGoal.trim()] }));
      setNewGoal("");
    }
  };

  const removeGoal = (index: number) => {
    setStudyProfile(prev => ({ ...prev, goals: prev.goals.filter((_, i) => i !== index) }));
  };

  const addSubject = () => {
    if (newSubject.trim()) {
      setStudyProfile(prev => ({ ...prev, subjects: [...prev.subjects, newSubject.trim()] }));
      setNewSubject("");
    }
  };

  const removeSubject = (index: number) => {
    setStudyProfile(prev => ({ ...prev, subjects: prev.subjects.filter((_, i) => i !== index) }));
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0]">
      <DashboardSidebar 
        isCollapsed={isSidebarCollapsed} 
        onCollapsedChange={setIsSidebarCollapsed} 
      />

      <div className={cn(
        "transition-all duration-300",
        isSidebarCollapsed ? "ml-[68px]" : "ml-[240px]"
      )}>
        <DashboardHeader userName={userData.name} userEmail={userData.email} />

        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-[#374151]" style={{ fontFamily: "'Lora', serif" }}>Settings</h1>
              <p className="text-[13px] text-[#9CA3AF] mt-1">Manage your account and learning preferences</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6 bg-white border border-[#E8E4DC] rounded-lg p-1">
                <TabsTrigger value="profile" className="data-[state=active]:bg-[#CCFBF1] data-[state=active]:text-[#0D9488] gap-2 rounded-md text-[13px]">
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="learning" className="data-[state=active]:bg-[#CCFBF1] data-[state=active]:text-[#0D9488] gap-2 rounded-md text-[13px]">
                  <Brain className="w-4 h-4" />
                  Learning Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-[#CCFBF1] data-[state=active]:text-[#0D9488] gap-2 rounded-md text-[13px]">
                  <Bell className="w-4 h-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="data-[state=active]:bg-[#CCFBF1] data-[state=active]:text-[#0D9488] gap-2 rounded-md text-[13px]">
                  <Shield className="w-4 h-4" />
                  Privacy
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4">
                <Card className="p-5 border-[#E8E4DC] bg-white rounded-xl shadow-sm">
                  <h3 className="text-[13px] font-semibold text-[#374151] mb-4">Profile Picture</h3>
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <Avatar className="w-16 h-16 border-2 border-[#E8E4DC]">
                        <AvatarImage src={userData.avatar} />
                        <AvatarFallback className="bg-[#CCFBF1] text-[#0D9488] text-lg font-medium">
                          {userData.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#0D9488] text-white flex items-center justify-center hover:bg-[#0F766E] transition-colors">
                        <Camera className="w-3 h-3" />
                      </button>
                    </div>
                    <div>
                      <p className="text-[13px] text-[#374151] mb-2">Upload a new avatar</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-[12px]">Upload Image</Button>
                        <Button variant="ghost" size="sm" className="h-8 text-[12px] text-[#EF4444]">Remove</Button>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 border-[#E8E4DC] bg-white rounded-xl shadow-sm">
                  <h3 className="text-[13px] font-semibold text-[#374151] mb-4">Personal Information</h3>
                  <div className="grid gap-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[12px] text-[#374151]">Display Name</Label>
                        <Input defaultValue={userData.name} className="h-9 border-[#E8E4DC] focus:border-[#0D9488] text-[13px]" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[12px] text-[#374151]">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                          <Input defaultValue={userData.email} className="pl-9 h-9 border-[#E8E4DC] focus:border-[#0D9488] text-[13px]" />
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[12px] text-[#374151]">Occupation</Label>
                        <Input 
                          value={studyProfile.currentRole}
                          onChange={(e) => setStudyProfile(prev => ({ ...prev, currentRole: e.target.value }))}
                          placeholder="e.g., Software Developer" 
                          className="h-9 border-[#E8E4DC] focus:border-[#0D9488] text-[13px]" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[12px] text-[#374151]">User Type</Label>
                        <div className="flex gap-2">
                          {["student", "professional", "hobbyist"].map((type) => (
                            <button
                              key={type}
                              className={cn(
                                "px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all capitalize",
                                userData.userType === type
                                  ? "bg-[#CCFBF1] text-[#0D9488] border border-[#0D9488]/20"
                                  : "bg-[#F3F4F6] text-[#6B7280] border border-transparent hover:bg-[#E5E9EE]"
                              )}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button size="sm" className="bg-[#0D9488] hover:bg-[#0F766E] h-9 text-[13px]">Save Changes</Button>
                  </div>
                </Card>

                <Card className="p-5 border-[#E8E4DC] bg-white rounded-xl shadow-sm">
                  <h3 className="text-[13px] font-semibold text-[#374151] mb-4">Password</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[12px] text-[#374151]">Current Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                        <Input type={showPassword ? "text" : "password"} className="pl-9 pr-9 h-9 border-[#E8E4DC] focus:border-[#0D9488] text-[13px]" />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[12px] text-[#374151]">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                        <Input type="password" className="pl-9 h-9 border-[#E8E4DC] focus:border-[#0D9488] text-[13px]" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" className="h-9 text-[13px]">Update Password</Button>
                  </div>
                </Card>
              </TabsContent>

              {/* Learning Profile Tab */}
              <TabsContent value="learning" className="space-y-4">
                <Card className="p-5 border-[#E8E4DC] bg-white rounded-xl shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Brain className="w-4 h-4 text-[#0D9488]" />
                    <h3 className="text-[13px] font-semibold text-[#374151]">Learning Profile</h3>
                  </div>
                  <p className="text-[12px] text-[#9CA3AF] mb-4">Help your AI tutor personalize sessions for you.</p>
                  
                  <div className="space-y-5">
                    {/* Bio */}
                    <div className="space-y-2">
                      <Label className="text-[12px] text-[#374151]">About You</Label>
                      <Textarea
                        value={studyProfile.bio}
                        onChange={(e) => setStudyProfile(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell us about yourself..."
                        className="min-h-[80px] border-[#E8E4DC] focus:border-[#0D9488] text-[13px]"
                      />
                    </div>

                    {/* Experience */}
                    <div className="space-y-2">
                      <Label className="text-[12px] text-[#374151]">Current Knowledge / Experience</Label>
                      <Textarea
                        value={studyProfile.experience}
                        onChange={(e) => setStudyProfile(prev => ({ ...prev, experience: e.target.value }))}
                        placeholder="What do you already know?"
                        className="min-h-[60px] border-[#E8E4DC] focus:border-[#0D9488] text-[13px]"
                      />
                    </div>

                    {/* Subjects */}
                    <div className="space-y-2">
                      <Label className="text-[12px] text-[#374151]">Subjects You Want to Learn</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {studyProfile.subjects.map((subject, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#CCFBF1] text-[#0D9488] text-[12px] font-medium"
                          >
                            {subject}
                            <button onClick={() => removeSubject(index)} className="hover:text-[#0F766E]">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newSubject}
                          onChange={(e) => setNewSubject(e.target.value)}
                          placeholder="Add subject..."
                          className="h-9 border-[#E8E4DC] focus:border-[#0D9488] text-[13px]"
                          onKeyDown={(e) => e.key === "Enter" && addSubject()}
                        />
                        <Button variant="outline" size="sm" onClick={addSubject} className="h-9 px-3">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Goals */}
                    <div className="space-y-2">
                      <Label className="text-[12px] text-[#374151]">Learning Goals</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {studyProfile.goals.map((goal, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] text-[12px] font-medium"
                          >
                            {goal}
                            <button onClick={() => removeGoal(index)} className="hover:text-[#B45309]">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newGoal}
                          onChange={(e) => setNewGoal(e.target.value)}
                          placeholder="Add goal..."
                          className="h-9 border-[#E8E4DC] focus:border-[#0D9488] text-[13px]"
                          onKeyDown={(e) => e.key === "Enter" && addGoal()}
                        />
                        <Button variant="outline" size="sm" onClick={addGoal} className="h-9 px-3">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Difficulty & Daily Goal */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[12px] text-[#374151]">Preferred Difficulty</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {["beginner", "intermediate", "advanced"].map((level) => (
                            <button
                              key={level}
                              onClick={() => setStudyProfile(prev => ({ ...prev, preferredDifficulty: level as any }))}
                              className={cn(
                                "p-2 rounded-lg text-[12px] font-medium transition-all capitalize",
                                studyProfile.preferredDifficulty === level
                                  ? "bg-[#CCFBF1] text-[#0D9488] border border-[#0D9488]/30"
                                  : "bg-[#F3F4F6] text-[#6B7280] border border-transparent hover:bg-[#E5E9EE]"
                              )}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[12px] text-[#374151]">Daily Learning Goal</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={studyProfile.dailyGoalMinutes}
                            onChange={(e) => setStudyProfile(prev => ({ ...prev, dailyGoalMinutes: parseInt(e.target.value) || 15 }))}
                            className="w-20 h-9 border-[#E8E4DC] focus:border-[#0D9488] text-[13px]"
                          />
                          <span className="text-[13px] text-[#6B7280]">minutes/day</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <Button size="sm" className="bg-[#0D9488] hover:bg-[#0F766E] h-9 text-[13px]">Save Profile</Button>
                  </div>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-4">
                <Card className="p-5 border-[#E8E4DC] bg-white rounded-xl shadow-sm">
                  <h3 className="text-[13px] font-semibold text-[#374151] mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { id: "session_reminders", label: "Session Reminders", description: "Get reminded before sessions" },
                      { id: "weekly_progress", label: "Weekly Progress Report", description: "Summary of your progress" },
                      { id: "streak_alerts", label: "Streak Alerts", description: "Don't lose your streak" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-[13px] font-medium text-[#374151]">{item.label}</p>
                          <p className="text-[11px] text-[#9CA3AF]">{item.description}</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-5 border-[#E8E4DC] bg-white rounded-xl shadow-sm">
                  <h3 className="text-[13px] font-semibold text-[#374151] mb-4">Daily Study Reminder</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-medium text-[#374151]">Enable daily reminders</p>
                      <p className="text-[11px] text-[#9CA3AF]">Get reminded to practice</p>
                    </div>
                    <Switch defaultChecked={userData.reminderEnabled} />
                  </div>
                  <div className="mt-4">
                    <Label className="text-[12px] text-[#374151]">Reminder time</Label>
                    <Input type="time" defaultValue={userData.reminderTime} className="w-28 mt-2 h-9 border-[#E8E4DC] focus:border-[#0D9488] text-[13px]" />
                  </div>
                </Card>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy" className="space-y-4">
                <Card className="p-5 border-[#E8E4DC] bg-white rounded-xl shadow-sm">
                  <h3 className="text-[13px] font-semibold text-[#374151] mb-4">Data & Privacy</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#E8E4DC] hover:bg-[#F3F4F6] transition-colors text-left">
                      <Download className="w-4 h-4 text-[#6B7280]" />
                      <div>
                        <p className="text-[13px] font-medium text-[#374151]">Download Your Data</p>
                        <p className="text-[11px] text-[#9CA3AF]">Export all your learning data</p>
                      </div>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#EF4444]/20 hover:bg-[#FEF2F2] transition-colors text-left">
                      <Trash2 className="w-4 h-4 text-[#EF4444]" />
                      <div>
                        <p className="text-[13px] font-medium text-[#EF4444]">Delete Account</p>
                        <p className="text-[11px] text-[#9CA3AF]">Permanently delete your account</p>
                      </div>
                    </button>
                  </div>
                </Card>

                <Card className="p-5 border-[#E8E4DC] bg-white rounded-xl shadow-sm">
                  <h3 className="text-[13px] font-semibold text-[#374151] mb-4">Subscription</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-medium text-[#374151]">Current Plan: Basic</p>
                      <p className="text-[11px] text-[#9CA3AF]">20 sessions/month</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 h-9 text-[13px]">
                      <CreditCard className="w-4 h-4" />
                      Manage
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
