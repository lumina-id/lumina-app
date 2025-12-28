"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCamera } from "@/hooks/onboarding/useCamera";
import { useFaceDetection } from "@/hooks/onboarding/useFaceDetection";
import { useBlinkDetection } from "@/hooks/onboarding/useBlinkDetection";
import { useOnboardingStep } from "@/hooks/onboarding/useOnboardingStep";
import ProgressBar from "@/components/ui/ProgressBar";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import CameraPreview from "@/components/onboarding/CameraPreview";
import TrainingButton from "@/components/onboarding/TrainingButton";
import CompletionCard from "@/components/onboarding/CompletionCard";
import { ROUTES } from "@/lib/routes";

export default function OnboardingShell() {
  const router = useRouter();
  const { locale, setLocale, t } = useLanguage();
  const { videoRef, hasPermission, permissionDenied, isLoading } = useCamera();
  const { faceDetected } = useFaceDetection(hasPermission);
  const { blinkDetected, isHovering, startHover, endHover } = useBlinkDetection();
  const { currentStep, totalSteps, nextStep, setCanProceed } = useOnboardingStep();

  useEffect(() => {
    if (currentStep === 1 && faceDetected) {
      setCanProceed(true);
      const timer = setTimeout(() => {
        nextStep();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, faceDetected, setCanProceed, nextStep]);

  useEffect(() => {
    if (currentStep === 2 && blinkDetected) {
      setCanProceed(true);
      const timer = setTimeout(() => {
        nextStep();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, blinkDetected, setCanProceed, nextStep]);

  const handleComplete = () => {
    router.push(ROUTES.MAIN);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="flex flex-col items-center gap-[10px] mb-[20px] text-center">
              <h1 className="text-[#202020] text-[24px] font-medium tracking-[-1.28px] leading-tight">
                {t.onboarding.step1.title}
              </h1>
              <p className="text-[#999] text-[16px] tracking-[-0.72px] leading-none">
                {t.onboarding.step1.subtitle}
              </p>
            </div>
            <CameraPreview
              videoRef={videoRef}
              faceDetected={faceDetected}
              permissionDenied={permissionDenied}
              isLoading={isLoading}
              texts={{
                faceDetected: t.onboarding.step1.faceDetected,
                cameraPreview: t.onboarding.step1.cameraPreview,
                adjustPosition: t.onboarding.step1.adjustPosition,
                rightPosition: t.onboarding.step1.rightPosition,
                permissionDenied: t.onboarding.step1.permissionDenied,
                requestingPermission: t.onboarding.step1.requestingPermission,
              }}
            />
          </>
        );
      case 2:
        return (
          <TrainingButton
            isHovering={isHovering}
            blinkDetected={blinkDetected}
            onHoverStart={startHover}
            onHoverEnd={endHover}
            texts={{
              title: t.onboarding.step2.title,
              instruction: t.onboarding.step2.instruction,
              buttonText: t.onboarding.step2.buttonText,
              blinkDetected: t.onboarding.step2.blinkDetected,
            }}
          />
        );
      case 3:
        return (
          <CompletionCard
            texts={{
              title: t.onboarding.step3.title,
              subtitle: t.onboarding.step3.subtitle,
              startButton: t.onboarding.step3.startButton,
            }}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white relative w-full min-h-screen flex flex-col items-center pb-20">
      <header className="w-full border-b border-[#ddd] px-4 md:px-[100px] py-[19px] flex justify-center">
        <div className="w-full max-w-[1240px] flex items-center justify-between">
          <div className="flex gap-[8px] items-center">
            <div className="relative w-[48px] h-[48px]">
              <Image
                src="/assets/lumina-icon.png"
                alt="Lumina Icon"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[28px] font-medium text-black tracking-[-1.12px] leading-none">
              Lumina
            </span>
          </div>

          <div className="flex gap-[8px] items-center">
            <LanguageSwitcher locale={locale} onLocaleChange={setLocale} />
            <button className="border border-[#ddd] px-[16px] py-[10px] rounded-[12px] text-[16px] text-black tracking-[-0.8px] leading-none hover:bg-gray-50 transition-colors">
              {t.common.logout}
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center mt-[20px] w-full max-w-[653px] px-4">
        <div className="mb-[20px]">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {renderStepContent()}
      </main>
    </div>
  );
}
