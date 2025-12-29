"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useGaze } from "@/context/GazeContext";
import { useFaceMesh } from "@/hooks/useFaceMesh";
import ProgressBar from "@/components/ui/ProgressBar";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import GazeCursor from "@/components/gaze/GazeCursor";
import { ROUTES } from "@/lib/routes";

type OnboardingStep = 1 | 2 | 3;

export default function OnboardingPage() {
  const router = useRouter();
  const { locale, setLocale, t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const displayVideoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  
  const [hasPermission, setHasPermission] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverStartTime, setHoverStartTime] = useState<number | null>(null);
  const [blinkDetected, setBlinkDetected] = useState(false);
  const [isStep3Hovering, setIsStep3Hovering] = useState(false);
  const [step3HoverStartTime, setStep3HoverStartTime] = useState<number | null>(null);
  
  const { isFaceDetected, gazeX, gazeY, faceCenter } = useGaze();
  
  useFaceMesh(videoRef);

  // Start webcam
  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch {
        setHasPermission(false);
      }
    };

    startWebcam();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Sync stream to display video when permission is granted
  useEffect(() => {
    if (hasPermission && videoRef.current?.srcObject && displayVideoRef.current) {
      displayVideoRef.current.srcObject = videoRef.current.srcObject;
    }
  }, [hasPermission]);

  // Step 1: Auto-proceed when face is detected
  useEffect(() => {
    if (currentStep === 1 && isFaceDetected) {
      const timer = setTimeout(() => {
        setCurrentStep(2);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isFaceDetected]);

  // Step 2: Check if gaze is over button
  useEffect(() => {
    if (currentStep !== 2 || blinkDetected) return;

    const checkHover = () => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const padding = 30;
      const isOver = 
        gazeX >= rect.left - padding && 
        gazeX <= rect.right + padding && 
        gazeY >= rect.top - padding && 
        gazeY <= rect.bottom + padding;
      
      if (isOver) {
        setIsHovering(true);
        if (hoverStartTime === null) {
          setHoverStartTime(Date.now());
        } else if (Date.now() - hoverStartTime >= 1000) {
          setBlinkDetected(true);
          setTimeout(() => {
            setCurrentStep(3);
          }, 800);
        }
      } else {
        setIsHovering(false);
        setHoverStartTime(null);
      }
    };

    const interval = setInterval(checkHover, 50);
    return () => clearInterval(interval);
  }, [currentStep, gazeX, gazeY, hoverStartTime, blinkDetected]);

  // Step 3: Check if gaze is over start button
  useEffect(() => {
    if (currentStep !== 3) return;

    const checkHover = () => {
      if (!startButtonRef.current) return;
      
      const rect = startButtonRef.current.getBoundingClientRect();
      const padding = 30;
      const isOver = 
        gazeX >= rect.left - padding && 
        gazeX <= rect.right + padding && 
        gazeY >= rect.top - padding && 
        gazeY <= rect.bottom + padding;
      
      if (isOver) {
        setIsStep3Hovering(true);
        if (step3HoverStartTime === null) {
          setStep3HoverStartTime(Date.now());
        } else if (Date.now() - step3HoverStartTime >= 1000) {
          router.push(ROUTES.MAIN);
        }
      } else {
        setIsStep3Hovering(false);
        setStep3HoverStartTime(null);
      }
    };

    const interval = setInterval(checkHover, 50);
    return () => clearInterval(interval);
  }, [currentStep, gazeX, gazeY, step3HoverStartTime, router]);

  const handleComplete = () => {
    router.push(ROUTES.MAIN);
  };

  return (
    <div className="bg-white relative w-full min-h-screen flex flex-col items-center pb-20">
      <GazeCursor />
      
      {/* Hidden video element for face tracking - always mounted */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="fixed top-0 left-0 w-[1px] h-[1px] opacity-0 pointer-events-none"
      />
      
      <header className="w-full border-b border-[#ddd] px-4 md:px-[100px] py-[19px] flex justify-center relative z-10">
        <div className="w-full max-w-[1240px] flex items-center justify-between">
          <div className="flex gap-[8px] items-center">
            <div className="relative w-[48px] h-[48px]">
              <Image
                src="/assets/lumina-icon.svg"
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

      <main className="flex flex-col items-center mt-[20px] w-full max-w-[653px] px-4 relative z-10">
        <div className="mb-[20px]">
          <ProgressBar currentStep={currentStep} totalSteps={3} />
        </div>

        {/* Step 1: Camera & Face Detection */}
        {currentStep === 1 && (
          <>
            <div className="flex flex-col items-center gap-[10px] mb-[20px] text-center">
              <h1 className="text-[#202020] text-[24px] font-medium tracking-[-1.28px] leading-tight">
                {t.onboarding.step1.title}
              </h1>
              <p className="text-[#999] text-[16px] tracking-[-0.72px] leading-none">
                {t.onboarding.step1.subtitle}
              </p>
            </div>

            <div className="w-full flex flex-col gap-[16px] items-center">
              <div className="relative w-full max-w-[650px] aspect-[650/400] rounded-[24px] overflow-hidden border border-[#cbd5e1] shadow-lg bg-black">
                {/* Display video that shows the camera feed */}
                <video
                  ref={displayVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform scale-x-[-1]"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-[5]" />

                {isFaceDetected && (
                  <div 
                    className="absolute w-[200px] h-[200px] border-[3px] border-[#22c55e] rounded-[24px] shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-100 ease-out z-20"
                    style={{
                      left: `${faceCenter.x * 100}%`,
                      top: `${faceCenter.y * 100}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 bg-[#22c55e] px-[12px] py-[4px] rounded-full shadow-md">
                      <span className="text-white text-[12px] font-medium whitespace-nowrap">
                        {t.onboarding.step1.faceDetected}
                      </span>
                    </div>
                  </div>
                )}

                <p className="absolute bottom-[20px] left-1/2 -translate-x-1/2 text-white text-[14px] font-medium tracking-[-0.64px] z-10">
                  {t.onboarding.step1.cameraPreview}
                </p>
              </div>

              {isFaceDetected ? (
                <div className="flex items-center gap-2">
                  <span className="text-[#22c55e] text-[18px]">✓</span>
                  <p className="text-[#22c55e] text-[16px] tracking-[-0.72px] text-center font-medium">
                    {t.onboarding.step1.rightPosition}
                  </p>
                </div>
              ) : (
                <p className="text-[#999] text-[16px] tracking-[-0.72px] text-center">
                  {t.onboarding.step1.adjustPosition}
                </p>
              )}
            </div>
          </>
        )}

        {/* Step 2: Button Selection Training */}
        {currentStep === 2 && (
          <div className="flex flex-col items-center gap-[24px] w-full max-w-[500px]">
            <div className="flex flex-col items-center gap-[12px] text-center">
              <h2 className="text-[#202020] text-[24px] font-medium tracking-[-1.28px] leading-tight">
                {t.onboarding.step2.title}
              </h2>
              <p className="text-[#999] text-[14px] tracking-[-0.56px] leading-[1.5] whitespace-pre-line">
                {t.onboarding.step2.instruction}
              </p>
            </div>

            <div className="relative">
              <button
                ref={buttonRef}
                onClick={() => setCurrentStep(3)}
                className={`relative px-[32px] py-[16px] rounded-[12px] text-white text-[16px] font-medium tracking-[-0.64px] transition-all duration-300 hover:opacity-90 ${
                  isHovering
                    ? "shadow-[0_0_30px_rgba(11,31,183,0.6)] scale-105"
                    : ""
                } ${blinkDetected ? "ring-4 ring-green-400 ring-opacity-50" : ""}`}
                style={{
                  background: "linear-gradient(180deg, #0B1FB7 0%, #081787 100%)"
                }}
              >
                {t.onboarding.step2.buttonText}
              </button>
            </div>

            {blinkDetected && (
              <div className="flex items-center justify-center gap-2 animate-fade-in w-full">
                <span className="text-[#22c55e] text-[18px]">✓</span>
                <p className="text-[#22c55e] text-[16px] tracking-[-0.72px] font-medium">
                  {t.onboarding.step2.blinkDetected}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Completion */}
        {currentStep === 3 && (
          <div className="flex flex-col items-center gap-[24px] w-full max-w-[400px]">
            <div className="flex flex-col items-center gap-[12px] text-center">
              <h2 className="text-[#202020] text-[24px] font-medium tracking-[-1.28px] leading-tight">
                {t.onboarding.step3.title}
              </h2>
              <p className="text-[#999] text-[16px] tracking-[-0.72px] leading-none">
                {t.onboarding.step3.subtitle}
              </p>
            </div>

            <button
              ref={startButtonRef}
              onClick={handleComplete}
              className={`px-[32px] py-[14px] rounded-[12px] text-white text-[16px] font-medium tracking-[-0.64px] transition-all duration-300 ${
                isStep3Hovering
                  ? "shadow-[0_0_30px_rgba(11,31,183,0.6)] scale-105"
                  : ""
              }`}
              style={{
                background: "linear-gradient(180deg, #0B1FB7 0%, #081787 100%)"
              }}
            >
              {t.onboarding.step3.startButton}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
