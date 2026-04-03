import React, { useState } from "react";
import { useWizard } from "@/context/WizardContext";
import { WizardShell } from "./WizardShell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DAILY_TIME_OPTIONS } from "@/types/auth";

const WizardStep4: React.FC = () => {
  const { formData, updateFormData, nextStep } = useWizard();

  const handleSelectTime = (minutes: number) => {
    updateFormData({ dailyGoalMinutes: minutes });
  };

  const handleToggleReminder = (enabled: boolean) => {
    updateFormData({ reminderEnabled: enabled });
  };

  const handleChangeReminderTime = (time: string) => {
    updateFormData({ reminderTime: time });
  };

  const handleContinue = () => {
    nextStep();
  };

  const selectedOption = DAILY_TIME_OPTIONS.find(
    (opt) => opt.minutes === formData.dailyGoalMinutes
  );

  return (
    <WizardShell
      stepTitle="How much time can you spend learning each day?"
      stepDescription="We'll create a schedule based on your commitment level."
      showSkip={false}
    >
      <div className="space-y-8">
        {/* Time Options - Pills */}
        <div className="grid gap-2 sm:gap-3 md:grid-cols-2 lg:grid-cols-3">
          {DAILY_TIME_OPTIONS.map((option) => (
            <button
              key={option.minutes}
              onClick={() => handleSelectTime(option.minutes)}
              className={`p-3 md:p-4 rounded-lg border-2 transition-all text-left ${
                formData.dailyGoalMinutes === option.minutes
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <p className="font-semibold text-base">{option.label}</p>
                    {option.popular && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-success/20 text-success">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{option.title}</p>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
                {formData.dailyGoalMinutes === option.minutes && (
                  <div className="text-xl flex-shrink-0">✓</div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Reminder Section */}
        <div className="p-4 md:p-6 rounded-lg border-2 border-border bg-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm md:text-base mb-1">
                🔔 Daily reminder
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                We'll send you a gentle notification to practice
              </p>
            </div>
            <Switch
              checked={formData.reminderEnabled}
              onCheckedChange={handleToggleReminder}
            />
          </div>

          {/* Time Picker - only show if reminder enabled */}
          {formData.reminderEnabled && (
            <div className="pt-2 border-t">
              <Label htmlFor="reminderTime" className="text-xs md:text-sm mb-2 block">
                What time should we remind you?
              </Label>
              <Input
                id="reminderTime"
                type="time"
                value={formData.reminderTime}
                onChange={(e) => handleChangeReminderTime(e.target.value)}
                className="h-10"
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 rounded-lg bg-secondary/30 border border-border text-sm text-muted-foreground">
          <p className="text-xs md:text-sm">
            💡 <span className="font-medium">Tip:</span> Studies show that consistent daily practice (even 10-15 minutes) is more effective than cramming. Set a time that fits your routine.
          </p>
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <Button
            onClick={handleContinue}
            size="lg"
            className="w-full"
          >
            Continue to summary →
          </Button>
        </div>
      </div>
    </WizardShell>
  );
};

export default WizardStep4;
