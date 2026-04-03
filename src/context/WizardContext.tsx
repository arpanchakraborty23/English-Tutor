import React, { createContext, useContext, useState, useEffect } from "react";
import { WizardFormData } from "@/types/auth";

interface WizardContextType {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
  currentStep: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetWizard: () => void;
}

const DEFAULT_WIZARD_DATA: WizardFormData = {
  targetLanguage: "",
  nativeLanguage: "en",
  currentLevel: "A1",
  learningPurposes: [],
  dailyGoalMinutes: 15,
  reminderEnabled: false,
  reminderTime: "08:00",
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<WizardFormData>(() => {
    // Load from localStorage if exists
    const stored = localStorage.getItem("wizard_form_data");
    return stored ? JSON.parse(stored) : DEFAULT_WIZARD_DATA;
  });

  const [currentStep, setCurrentStep] = useState(() => {
    const stored = localStorage.getItem("wizard_current_step");
    return stored ? parseInt(stored) : 1;
  });

  // Save formData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wizard_form_data", JSON.stringify(formData));
  }, [formData]);

  // Save currentStep to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wizard_current_step", String(currentStep));
  }, [currentStep]);

  const updateFormData = (data: Partial<WizardFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 5) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetWizard = () => {
    setFormData(DEFAULT_WIZARD_DATA);
    setCurrentStep(1);
    localStorage.removeItem("wizard_form_data");
    localStorage.removeItem("wizard_current_step");
  };

  return (
    <WizardContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        goToStep,
        nextStep,
        prevStep,
        resetWizard,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
};
