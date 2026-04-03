// Auth types
export interface User {
  id: string;
  email: string;
  fullName: string;
  targetLanguage: string;
  nativeLanguage: string;
  currentLevel: string;
  learningPurposes: string[];
  dailyGoalMinutes: number;
  reminderEnabled: boolean;
  reminderTime: string;
  termsAccepted: boolean;
  createdAt: string;
}

export interface WizardFormData {
  targetLanguage: string;
  nativeLanguage: string;
  currentLevel: string;
  learningPurposes: string[];
  dailyGoalMinutes: number;
  reminderEnabled: boolean;
  reminderTime: string;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

// Languages type
export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const CEFR_LEVELS = [
  { code: "A1", label: "Complete Beginner", description: "I know no words at all" },
  { code: "A2", label: "Elementary", description: "I know a few basic phrases" },
  { code: "B1", label: "Intermediate", description: "I can hold simple conversations" },
  { code: "B2", label: "Upper Intermediate", description: "I can discuss most everyday topics" },
  { code: "C1", label: "Advanced", description: "I can express myself fluently" },
  { code: "C2", label: "Mastery", description: "I'm nearly native level" },
] as const;

export const LEARNING_PURPOSES = [
  { id: "professional", label: "Professional / Work", icon: "💼", sublabel: "Job, business meetings, emails" },
  { id: "travel", label: "Travel", icon: "✈️", sublabel: "Holidays, exploring, short trips" },
  { id: "friendly", label: "Friendly Conversation", icon: "💬", sublabel: "Talk to friends, online communities" },
  { id: "culture", label: "Culture & Media", icon: "🎬", sublabel: "Movies, music, books, anime" },
  { id: "moving", label: "Moving Abroad", icon: "🏠", sublabel: "Relocating, long-term living" },
  { id: "academic", label: "Academic Study", icon: "📚", sublabel: "Exams, university, research" },
  { id: "fun", label: "Just for Fun", icon: "🎯", sublabel: "Curiosity, personal challenge" },
] as const;

export const DAILY_TIME_OPTIONS = [
  { minutes: 5, label: "5 min", title: "Just a Little", description: "1 short exercise" },
  { minutes: 10, label: "10 min", title: "Casual", description: "2–3 exercises" },
  { minutes: 15, label: "15 min", title: "Regular", description: "A full lesson", popular: true },
  { minutes: 20, label: "20 min", title: "Dedicated", description: "Lesson + review" },
  { minutes: 30, label: "30 min", title: "Serious", description: "Deep practice" },
  { minutes: 60, label: "30 min+", title: "Intensive", description: "Multiple lessons" },
] as const;

export const POPULAR_LANGUAGES: Language[] = [
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "zh", name: "Mandarin", flag: "🇨🇳" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
];

// All languages (simplified - add more as needed)
export const ALL_LANGUAGES: Language[] = [
  ...POPULAR_LANGUAGES,
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "sv", name: "Swedish", flag: "🇸🇪" },
  { code: "no", name: "Norwegian", flag: "🇳🇴" },
  { code: "da", name: "Danish", flag: "🇩🇰" },
  { code: "fi", name: "Finnish", flag: "🇫🇮" },
  { code: "th", name: "Thai", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
  { code: "tu", name: "Turkish", flag: "🇹🇷" },
  { code: "el", name: "Greek", flag: "🇬🇷" },
  { code: "hu", name: "Hungarian", flag: "🇭🇺" },
  { code: "cz", name: "Czech", flag: "🇨🇿" },
  { code: "uk", name: "Ukrainian", flag: "🇺🇦" },
  { code: "he", name: "Hebrew", flag: "🇮🇱" },
  // Add more as needed - up to 100+
];
