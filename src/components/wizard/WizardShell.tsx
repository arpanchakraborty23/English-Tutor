import React from "react";
import { useWizard } from "@/context/WizardContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";

interface WizardShellProps {
  children: React.ReactNode;
  stepTitle: string;
  stepDescription?: string;
  showBack?: boolean;
  showSkip?: boolean;
  onSkip?: () => void;
}

const STEP_LABELS = [
  "Language to Learn",
  "Current Level",
  "Your Goal",
  "Daily Time",
  "Summary",
];

export const WizardShell: React.FC<WizardShellProps> = ({
  children,
  stepTitle,
  stepDescription,
  showBack = true,
  showSkip = false,
  onSkip,
}) => {
  const { currentStep, prevStep } = useWizard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          {/* Progress bar with dots */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      step < currentStep
                        ? "bg-success text-success-foreground"
                        : step === currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step < currentStep ? "✓" : step}
                  </div>
                  {step < 5 && (
                    <div
                      className={`h-1 w-8 mx-1 rounded-full transition-colors ${
                        step < currentStep ? "bg-success" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Skip and Close buttons */}
            <div className="flex items-center gap-2">
              {showSkip && onSkip && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Skip
                </Button>
              )}
            </div>
          </div>

          {/* Step info */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Step {currentStep} of 5
            </p>
            <h1 className="font-heading text-2xl md:text-3xl mb-1">{stepTitle}</h1>
            {stepDescription && (
              <p className="text-sm text-muted-foreground">{stepDescription}</p>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">{children}</div>
      </div>

      {/* Footer - Back button */}
      {showBack && currentStep > 1 && (
        <div className="border-t bg-background py-4 sticky bottom-0">
          <div className="container max-w-4xl mx-auto px-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevStep}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
