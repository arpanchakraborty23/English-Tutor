import { api } from "./api";

export interface DashboardStats {
  lessons_completed: number;
  practice_minutes: number;
  fluency_score: number;
  words_learned: number;
  listening_accuracy: number;
  pronunciation_issues: number;
  streak_days: number;
  weekly_goal_progress: number;
}

export interface WeeklyPracticeData {
  day: string;
  minutes: number;
  goal: number;
}

export interface SkillProgress {
  name: string;
  value: number;
  color: string;
}

export interface FluencyTrend {
  week: string;
  score: number;
}

export interface WordFrequency {
  word: string;
  count: number;
}

export interface RecentSession {
  id: string;
  date: string;
  type: string;
  duration: string;
  score: string;
  note: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlocked_at?: string;
  progress: number;
  total: number;
}

export interface DashboardData {
  stats: DashboardStats;
  weekly_practice: WeeklyPracticeData[];
  skill_progress: SkillProgress[];
  fluency_trend: FluencyTrend[];
  word_frequency: WordFrequency[];
  recent_sessions: RecentSession[];
  achievements: Achievement[];
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  target_date: string;
  progress: number;
  status: "not_started" | "in_progress" | "completed" | "missed";
}

export const progressService = {
  async getDashboardData(): Promise<DashboardData> {
    return api.get<DashboardData>("/api/progress/dashboard");
  },

  async getStats(): Promise<DashboardStats> {
    return api.get<DashboardStats>("/api/progress/stats");
  },

  async getWeeklyPractice(): Promise<WeeklyPracticeData[]> {
    return api.get<WeeklyPracticeData[]>("/api/progress/weekly-practice");
  },

  async getSkillProgress(): Promise<SkillProgress[]> {
    return api.get<SkillProgress[]>("/api/progress/skills");
  },

  async getFluencyTrend(): Promise<FluencyTrend[]> {
    return api.get<FluencyTrend[]>("/api/progress/fluency-trend");
  },

  async getWordFrequency(): Promise<WordFrequency[]> {
    return api.get<WordFrequency[]>("/api/progress/word-frequency");
  },

  async getRecentSessions(limit = 10): Promise<RecentSession[]> {
    return api.get<RecentSession[]>(`/api/progress/recent-sessions?limit=${limit}`);
  },

  async getAchievements(): Promise<Achievement[]> {
    return api.get<Achievement[]>("/api/progress/achievements");
  },

  async getLearningGoals(): Promise<LearningGoal[]> {
    return api.get<LearningGoal[]>("/api/progress/goals");
  },

  async createLearningGoal(goal: Omit<LearningGoal, "id" | "progress" | "status">): Promise<LearningGoal> {
    return api.post<LearningGoal>("/api/progress/goals", goal);
  },

  async updateLearningGoal(id: string, progress: number): Promise<LearningGoal> {
    return api.patch<LearningGoal>(`/api/progress/goals/${id}`, { progress });
  },
};
