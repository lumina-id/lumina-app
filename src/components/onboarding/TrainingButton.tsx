"use client";
import { useEffect, useRef, useState } from "react";

interface TrainingButtonProps {
  isHovering: boolean;
  blinkDetected: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  texts: {
    title: string;
    instruction: string;
    buttonText: string;
    blinkDetected: string;
  };
}

export default function TrainingButton({
  isHovering,
  blinkDetected,
  onHoverStart,
  onHoverEnd,
  texts,
}: TrainingButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!buttonRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    setPointerPosition({
      x: buttonCenterX + 150,
      y: buttonCenterY - 50,
    });

    const animationTimer = setTimeout(() => {
      setIsAnimating(true);
      setPointerPosition({
        x: buttonCenterX,
        y: buttonCenterY,
      });

      const hoverTimer = setTimeout(() => {
        onHoverStart();
      }, 1000);

      return () => clearTimeout(hoverTimer);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, [onHoverStart]);

  return (
    <div className="flex flex-col items-center gap-[24px] w-full max-w-[500px]">
      <div className="flex flex-col items-center gap-[12px] text-center">
        <h2 className="text-[#202020] text-[24px] font-medium tracking-[-1.28px] leading-tight">
          {texts.title}
        </h2>
        <p className="text-[#999] text-[14px] tracking-[-0.56px] leading-[1.5] whitespace-pre-line">
          {texts.instruction}
        </p>
      </div>

      <div className="relative">
        <button
          ref={buttonRef}
          className={`relative px-[24px] py-[14px] rounded-[12px] text-white text-[16px] font-medium tracking-[-0.64px] transition-all duration-300 ${
            isHovering
              ? "bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] shadow-[0_0_30px_rgba(59,130,246,0.6)]"
              : "bg-gradient-to-r from-[#3b82f6] to-[#2563eb]"
          } ${blinkDetected ? "ring-4 ring-green-400 ring-opacity-50" : ""}`}
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
        >
          {texts.buttonText}
        </button>

        {!blinkDetected && (
          <div
            className={`fixed w-[40px] h-[40px] rounded-full bg-gradient-to-br from-[#ec4899] to-[#be185d] border-4 border-white shadow-lg pointer-events-none z-50 transition-all ${
              isAnimating ? "duration-1000" : "duration-0"
            }`}
            style={{
              left: pointerPosition.x,
              top: pointerPosition.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>

      {blinkDetected && (
        <div className="flex items-center gap-2 animate-fade-in">
          <span className="text-[#22c55e] text-[18px]">✓</span>
          <p className="text-[#22c55e] text-[16px] tracking-[-0.72px] font-medium">
            {texts.blinkDetected}
          </p>
        </div>
      )}
    </div>
  );
}
