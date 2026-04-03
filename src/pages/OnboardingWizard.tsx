import React from "react";
import { WizardProvider, useWizard } from "@/context/WizardContext";
import WizardStep1 from "@/components/wizard/WizardStep1";
import WizardStep2 from "@/components/wizard/WizardStep2";
import WizardStep3 from "@/components/wizard/WizardStep3";
import WizardStep4 from "@/components/wizard/WizardStep4";
import WizardStep5 from "@/components/wizard/WizardStep5";

const OnboardingWizardContent: React.FC = () => {
  const { currentStep } = useWizard();

  return (
    <>
      {currentStep === 1 && <WizardStep1 />}
      {currentStep === 2 && <WizardStep2 />}
      {currentStep === 3 && <WizardStep3 />}
      {currentStep === 4 && <WizardStep4 />}
      {currentStep === 5 && <WizardStep5 />}
    </>
  );
};

const OnboardingWizard: React.FC = () => {
  return (
    <WizardProvider>
      <OnboardingWizardContent />
    </WizardProvider>
  );
};

export default OnboardingWizard;
