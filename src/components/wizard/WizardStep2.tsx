import React from "react";
import { useWizard } from "@/context/WizardContext";
import { WizardShell } from "./WizardShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CEFR_LEVELS } from "@/types/auth";

const WizardStep2: React.FC = () => {
  const { formData, updateFormData, nextStep } = useWizard();

  const handleSelectLevel = (code: string) => {
    updateFormData({ currentLevel: code });
  };

  const handleContinue = () => {
    nextStep();
  };

  const selectedLevelLabel = CEFR_LEVELS.find(
    (level) => level.code === formData.currentLevel
  )?.label;

  return (
    <WizardShell
      stepTitle="How would you describe your current level?"
      stepDescription="This helps us create lessons at just the right difficulty."
      showSkip={false}
    >
      <div className="space-y-6">
        {/* CEFR Level Cards */}
        <div className="grid gap-3 md:gap-4">
          {CEFR_LEVELS.map((level) => (
            <button
              key={level.code}
              onClick={() => handleSelectLevel(level.code)}
              className={`p-4 md:p-6 rounded-lg border-2 transition-all text-left ${
                formData.currentLevel === level.code
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* CEFR Code */}
                <div
                  className={`text-2xl md:text-3xl font-bold font-heading ${
                    formData.currentLevel === level.code
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {level.code}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm md:text-base mb-1">
                    {level.label}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {level.description}
                  </p>
                </div>

                {/* Checkmark */}
                {formData.currentLevel === level.code && (
                  <div className="text-xl md:text-2xl">✓</div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <Button
            onClick={handleContinue}
            size="lg"
            className="w-full"
          >
            Continue to next step →
          </Button>
        </div>
      </div>
    </WizardShell>
  );
};

export default WizardStep2;
