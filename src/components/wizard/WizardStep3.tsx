import React from "react";
import { useWizard } from "@/context/WizardContext";
import { WizardShell } from "./WizardShell";
import { Button } from "@/components/ui/button";
import { LEARNING_PURPOSES, ALL_LANGUAGES } from "@/types/auth";

const WizardStep3: React.FC = () => {
  const { formData, updateFormData, nextStep } = useWizard();

  const handleSelectPurpose = (purposeId: string) => {
    const currentPurposes = formData.learningPurposes;
    const newPurposes = currentPurposes.includes(purposeId)
      ? currentPurposes.filter((p) => p !== purposeId)
      : [...currentPurposes, purposeId];
    updateFormData({ learningPurposes: newPurposes });
  };

  const handleContinue = () => {
    // Set a default purpose if none selected (skip-friendly)
    if (formData.learningPurposes.length === 0) {
      updateFormData({ learningPurposes: ["friendly"] });
    }
    nextStep();
  };

  const targetLanguage = ALL_LANGUAGES.find(
    (lang) => lang.code === formData.targetLanguage
  );

  return (
    <WizardShell
      stepTitle={`Why are you learning ${targetLanguage?.name || "this language"}?`}
      stepDescription="Select one or more reasons. This helps personalize your lessons."
      showSkip={false}
    >
      <div className="space-y-6">
        {/* Purpose Cards Grid */}
        <div className="grid gap-3 md:gap-4 md:grid-cols-2">
          {LEARNING_PURPOSES.map((purpose) => (
            <button
              key={purpose.id}
              onClick={() => handleSelectPurpose(purpose.id)}
              className={`p-4 md:p-6 rounded-lg border-2 transition-all text-left ${
                formData.learningPurposes.includes(purpose.id)
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-3 md:gap-4">
                {/* Icon */}
                <div className="text-2xl md:text-3xl flex-shrink-0">{purpose.icon}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm md:text-base mb-1">
                    {purpose.label}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {purpose.sublabel}
                  </p>
                </div>

                {/* Checkmark */}
                {formData.learningPurposes.includes(purpose.id) && (
                  <div className="text-xl md:text-2xl flex-shrink-0">✓</div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="p-4 rounded-lg bg-secondary/30 border border-border text-sm text-muted-foreground">
          <p className="text-xs md:text-sm">
            💡 <span className="font-medium">Tip:</span> You can select multiple purposes. We'll mix lesson styles based on your goals.
          </p>
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

export default WizardStep3;
