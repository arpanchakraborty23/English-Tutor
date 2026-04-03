import React from "react";
import { useWizard } from "@/context/WizardContext";
import { useNavigate } from "react-router-dom";
import { WizardShell } from "./WizardShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ALL_LANGUAGES, CEFR_LEVELS, LEARNING_PURPOSES, DAILY_TIME_OPTIONS } from "@/types/auth";
import { toast } from "sonner";

const WizardStep5: React.FC = () => {
  const { formData, updateFormData, goToStep, resetWizard } = useWizard();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const targetLanguage = ALL_LANGUAGES.find(
    (lang) => lang.code === formData.targetLanguage
  );
  const nativeLanguage = ALL_LANGUAGES.find(
    (lang) => lang.code === formData.nativeLanguage
  );
  const currentLevelInfo = CEFR_LEVELS.find(
    (level) => level.code === formData.currentLevel
  );
  const purposes = LEARNING_PURPOSES.filter((p) =>
    formData.learningPurposes.includes(p.id)
  );
  const timeOption = DAILY_TIME_OPTIONS.find(
    (opt) => opt.minutes === formData.dailyGoalMinutes
  );

  const handleEditStep = (step: number) => {
    goToStep(step);
  };

  const handleStartLearning = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Call API to save user profile
      console.log("Saving user profile:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Welcome to English Tutor! 🎉");
      resetWizard();
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <WizardShell
      stepTitle="Here's what we've set up for you"
      stepDescription="Does everything look right? You can edit any field below."
      showSkip={false}
    >
      <div className="space-y-6">
        {/* Summary Card */}
        <Card className="p-6 md:p-8 space-y-4 border-2">
          {/* Language to Learn */}
          <div className="flex items-start justify-between pb-4 border-b last:border-b-0">
            <div className="flex items-start gap-3 flex-1">
              <span className="text-2xl">🌐</span>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Learning
                </p>
                <p className="text-base md:text-lg font-semibold">
                  {targetLanguage?.flag} {targetLanguage?.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Native: {nativeLanguage?.flag} {nativeLanguage?.name}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditStep(1)}
              className="text-primary hover:underline text-xs"
            >
              Edit
            </Button>
          </div>

          {/* Current Level */}
          <div className="flex items-start justify-between pb-4 border-b last:border-b-0">
            <div className="flex items-start gap-3 flex-1">
              <span className="text-2xl">📊</span>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Your Level
                </p>
                <p className="text-lg font-heading font-bold">{currentLevelInfo?.code}</p>
                <p className="text-sm text-foreground mt-1">{currentLevelInfo?.label}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {currentLevelInfo?.description}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditStep(2)}
              className="text-primary hover:underline text-xs"
            >
              Edit
            </Button>
          </div>

          {/* Purpose */}
          <div className="flex items-start justify-between pb-4 border-b last:border-b-0">
            <div className="flex items-start gap-3 flex-1">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Purpose
                </p>
                <div className="space-y-1">
                  {purposes.map((purpose) => (
                    <p key={purpose.id} className="text-sm flex items-center gap-2">
                      <span>{purpose.icon}</span>
                      {purpose.label}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditStep(3)}
              className="text-primary hover:underline text-xs"
            >
              Edit
            </Button>
          </div>

          {/* Daily Goal */}
          <div className="flex items-start justify-between pb-4 border-b last:border-b-0">
            <div className="flex items-start gap-3 flex-1">
              <span className="text-2xl">⏱️</span>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Daily Goal
                </p>
                <p className="text-sm font-semibold">{timeOption?.label} — {timeOption?.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{timeOption?.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditStep(4)}
              className="text-primary hover:underline text-xs"
            >
              Edit
            </Button>
          </div>

          {/* Reminder */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <span className="text-2xl">🔔</span>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Reminder
                </p>
                {formData.reminderEnabled ? (
                  <>
                    <p className="text-sm font-semibold">Daily at {formData.reminderTime}</p>
                    <p className="text-xs text-muted-foreground mt-1">We'll notify you to practice</p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Not enabled</p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditStep(4)}
              className="text-primary hover:underline text-xs"
            >
              Edit
            </Button>
          </div>
        </Card>

        {/* Confirmation */}
        <div className="p-4 rounded-lg bg-success/10 border border-success/30 text-center space-y-2">
          <p className="text-sm font-medium text-foreground">
            You're all set! 🎓
          </p>
          <p className="text-xs text-muted-foreground">
            Your personalized learning path is ready. Let's start your journey!
          </p>
        </div>

        {/* Start Learning Button */}
        <div className="flex gap-3">
          <Button
            onClick={handleStartLearning}
            disabled={isSubmitting}
            size="lg"
            className="flex-1"
          >
            {isSubmitting ? "Creating profile..." : "Start learning →"}
          </Button>
        </div>
      </div>
    </WizardShell>
  );
};

export default WizardStep5;
