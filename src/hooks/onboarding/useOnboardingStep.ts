"use client";
import { useCallback, useState } from "react";

type OnboardingStep = 1 | 2 | 3;

interface UseOnboardingStepReturn {
  currentStep: OnboardingStep;
  totalSteps: number;
  canProceed: boolean;
  setCanProceed: (value: boolean) => void;
  nextStep: () => void;
  reset: () => void;
}

export const useOnboardingStep = (): UseOnboardingStepReturn => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [canProceed, setCanProceed] = useState(false);
  const totalSteps = 3;

  const nextStep = useCallback(() => {
    if (canProceed && currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as OnboardingStep);
      setCanProceed(false);
    }
  }, [canProceed, currentStep]);

  const reset = useCallback(() => {
    setCurrentStep(1);
    setCanProceed(false);
  }, []);

  return {
    currentStep,
    totalSteps,
    canProceed,
    setCanProceed,
    nextStep,
    reset,
  };
};
