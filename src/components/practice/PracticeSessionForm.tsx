import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, Coffee, Plane, BookOpen, Target, Sparkles, Mic, Play, ArrowRight,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";

const purposes = [
  { id: "business", label: "Business Meeting", icon: "💼" },
  { id: "casual", label: "Casual Chat", icon: "☕" },
  { id: "travel", label: "Travel & Leisure", icon: "✈️" },
  { id: "exam", label: "Exam Prep", icon: "📚" },
  { id: "interview", label: "Job Interview", icon: "🤝" },
  { id: "dining", label: "Dining & Social", icon: "🍽️" },
  { id: "medical", label: "Medical / Emergency", icon: "🏥" },
  { id: "custom", label: "Custom", icon: "🎛️" },
];

const skills = [
  "Grammar & Conjugations",
  "Pronunciation",
  "Vocabulary Range",
  "Listening Comprehension",
  "Sentence Fluency",
  "Formal vs. Casual Tone",
  "Idioms & Expressions",
  "Response Speed",
];

const languages = [
  { name: "Japanese", flag: "🇯🇵" },
  { name: "French", flag: "🇫🇷" },
  { name: "German", flag: "🇩🇪" },
  { name: "Spanish", flag: "🇪🇸" },
  { name: "Italian", flag: "🇮🇹" },
  { name: "Portuguese", flag: "🇧🇷" },
  { name: "Mandarin", flag: "🇨🇳" },
  { name: "Korean", flag: "🇰🇷" },
];

const nativeLanguages = [
  { name: "Hindi", flag: "🇮🇳" },
  { name: "English", flag: "🇺🇸" },
  { name: "Bengali", flag: "🇧🇩" },
  { name: "Spanish", flag: "🇪🇸" },
  { name: "French", flag: "🇫🇷" },
];

export const PracticeSessionForm: React.FC = () => {
  const navigate = useNavigate();
  
  // Session Setup
  const [targetLanguage, setTargetLanguage] = useState("Japanese");
  const [nativeLanguage, setNativeLanguage] = useState("Hindi");
  const [duration, setDuration] = useState("15");

  // Practice Purpose
  const [selectedPurpose, setSelectedPurpose] = useState("business");

  // Skills Focus
  const [focusedSkills, setFocusedSkills] = useState<Set<string>>(
    new Set(["Grammar & Conjugations", "Vocabulary Range"])
  );

  // Scenario Context
  const [scenarioContext, setScenarioContext] = useState("");

  // Tutor Behavior
  const [difficulty, setDifficulty] = useState("intermediate");
  const [correctionStyle, setCorrectionStyle] = useState("gentle");
  const [speakingPace, setSpeakingPace] = useState("normal");

  // Mood
  const [mood, setMood] = useState("focused");

  const toggleSkill = (skill: string) => {
    const newSkills = new Set(focusedSkills);
    if (newSkills.has(skill)) {
      newSkills.delete(skill);
    } else {
      newSkills.add(skill);
    }
    setFocusedSkills(newSkills);
  };

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/voice-agent", {
      state: {
        practiceSession: {
          targetLanguage,
          nativeLanguage,
          duration,
          purpose: selectedPurpose,
          focusedSkills: Array.from(focusedSkills),
          scenario: scenarioContext,
          difficulty,
          correctionStyle,
          speakingPace,
          mood,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
              <Mic className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              New Practice Session
            </h1>
          </div>
          <p className="text-slate-400 ml-16 text-base">
            Set your goals and let the AI tutor personalize every moment.
          </p>
        </div>

        <form onSubmit={handleStartSession} className="space-y-4">
          {/* Section 1: Session Setup */}
          <Card className="border border-slate-800 bg-slate-950 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-lg">⚡</span>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Session Setup
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Target Language
                </label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-lg px-3 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                >
                  {languages.map((lang) => (
                    <option key={lang.name} value={lang.name}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Native Language
                </label>
                <select
                  value={nativeLanguage}
                  onChange={(e) => setNativeLanguage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-lg px-3 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                >
                  {nativeLanguages.map((lang) => (
                    <option key={lang.name} value={lang.name}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Session Duration
              </label>
              <div className="flex flex-wrap gap-2">
                {["5", "15", "30", "45", "60"].map((min) => (
                  <button
                    key={min}
                    type="button"
                    onClick={() => setDuration(min)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      duration === min
                        ? "bg-emerald-500 text-slate-950 border border-emerald-500"
                        : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {min} min
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Section 2: Practice Purpose */}
          <Card className="border border-slate-800 bg-slate-950 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-lg">🎯</span>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Practice Purpose
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {purposes.map((purpose) => (
                <button
                  key={purpose.id}
                  type="button"
                  onClick={() => setSelectedPurpose(purpose.id)}
                  className={`p-4 rounded-lg border transition-all text-left text-sm font-medium ${
                    selectedPurpose === purpose.id
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-200 shadow-lg shadow-emerald-500/20"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="text-lg mb-2">{purpose.icon}</div>
                  <div className="text-xs font-semibold">{purpose.label}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Section 3: Skills Focus */}
          <Card className="border border-slate-800 bg-slate-950 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎓</span>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Skills to Focus On
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Pick all that apply — AI will prioritize corrections in these areas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {skills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`p-3 rounded-lg border transition-all text-left text-sm font-medium flex items-center gap-3 ${
                    focusedSkills.has(skill)
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-200"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      focusedSkills.has(skill) ? "bg-emerald-400" : "bg-slate-600"
                    }`}
                  />
                  {skill}
                </button>
              ))}
            </div>
          </Card>

          {/* Section 4: Scenario Context */}
          <Card className="border border-slate-800 bg-slate-950 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">📝</span>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Scenario Context
              </h2>
            </div>

            <textarea
              value={scenarioContext}
              onChange={(e) => setScenarioContext(e.target.value)}
              placeholder="e.g. I'm presenting a project proposal to a Japanese client. Keep it formal. Correct me when I use wrong politeness levels (keigo)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors resize-none min-h-[100px]"
            />

            <div className="mt-3 p-3 bg-slate-900/50 border border-slate-800 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400">
                The more detail you add, the more realistic and targeted the roleplay will be.
              </p>
            </div>
          </Card>

          {/* Section 5: AI Tutor Behavior */}
          <Card className="border border-slate-800 bg-slate-950 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-lg">🤖</span>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                AI Tutor Behaviour
              </h2>
            </div>

            <div className="space-y-6">
              {/* Difficulty */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setDifficulty(level.toLowerCase().replace(" ", "-"))}
                      className={`py-2 rounded-lg text-sm font-semibold transition-all uppercase tracking-wider ${
                        difficulty === level.toLowerCase().replace(" ", "-")
                          ? "bg-emerald-500 text-slate-950 border border-emerald-500"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Correction Style */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Correction Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Gentle", "Direct", "After Turn"].map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setCorrectionStyle(style.toLowerCase().replace(" ", "-"))}
                      className={`py-2 rounded-lg text-sm font-semibold transition-all uppercase tracking-wider ${
                        correctionStyle === style.toLowerCase().replace(" ", "-")
                          ? "bg-emerald-500 text-slate-950 border border-emerald-500"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speaking Pace */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Speaking Pace
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Slow", "Normal", "Native Speed"].map((pace) => (
                    <button
                      key={pace}
                      type="button"
                      onClick={() => setSpeakingPace(pace.toLowerCase().replace(" ", "-"))}
                      className={`py-2 rounded-lg text-sm font-semibold transition-all uppercase tracking-wider ${
                        speakingPace === pace.toLowerCase().replace(" ", "-")
                          ? "bg-emerald-500 text-slate-950 border border-emerald-500"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      {pace}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Section 6: Today's Energy */}
          <Card className="border border-slate-800 bg-slate-950 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💡</span>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Today's Energy
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Helps the AI calibrate session intensity.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                { value: "low", label: "😴 Low energy" },
                { value: "focused", label: "🙂 Focused" },
                { value: "motivated", label: "🔥 Motivated" },
                { value: "anxious", label: "😰 Anxious — go easy" },
              ].map((moodOption) => (
                <button
                  key={moodOption.value}
                  type="button"
                  onClick={() => setMood(moodOption.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    mood === moodOption.value
                      ? "bg-emerald-500 text-slate-950 border border-emerald-500"
                      : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {moodOption.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Start Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:-translate-y-0.5"
            >
              <Play className="w-5 h-5 fill-current" />
              Start Session
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
