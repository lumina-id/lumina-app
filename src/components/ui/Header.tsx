"use client";
import { useGaze } from "@/context/GazeContext";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  onLogout?: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  const { locale, setLocale, t } = useLanguage();
  const { gazeX, gazeY } = useGaze();
  const logoutRef = useRef<HTMLButtonElement>(null);
  const [isGazeHover, setIsGazeHover] = useState(false);

  // Check gaze hover for logout button - visual feedback only
  // Actual click is handled by blink detection in useFaceMesh
  useEffect(() => {
    if (!logoutRef.current) return;

    const padding = 20;
    const rect = logoutRef.current.getBoundingClientRect();
    const isOver =
      gazeX >= rect.left - padding &&
      gazeX <= rect.right + padding &&
      gazeY >= rect.top - padding &&
      gazeY <= rect.bottom + padding;

    setIsGazeHover(isOver);
  }, [gazeX, gazeY]);

  return (
    <header className="w-full border-b border-[#ddd] px-3 md:px-[100px] py-3 md:py-[19px] flex justify-center">
      <div className="w-full max-w-[1240px] flex items-center justify-between gap-2">
        {/* Logo - smaller on mobile */}
        <div className="flex gap-1 md:gap-[8px] items-center flex-shrink-0">
          <div className="relative w-[32px] h-[32px] md:w-[48px] md:h-[48px]">
            <Image
              src="/assets/lumina-icon.svg"
              alt="Lumina Icon"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[20px] md:text-[28px] font-medium text-black tracking-[-1.12px] leading-none">
            Lumina
          </span>
        </div>

        {/* Actions - smaller on mobile */}
        <div className="flex gap-1 md:gap-[8px] items-center">
          <LanguageSwitcher locale={locale} onLocaleChange={setLocale} />
          <button
            ref={logoutRef}
            onClick={onLogout}
            className={`border border-[#ddd] px-3 py-2 md:px-[16px] md:py-[10px] rounded-[8px] md:rounded-[12px] text-[12px] md:text-[16px] text-black tracking-[-0.8px] leading-none btn-hover-secondary transition-all duration-200 ${
              isGazeHover
                ? "scale-105 bg-[#f3f4f6] shadow-[0_2px_12px_rgba(0,0,0,0.1)] border-[#c7d2fe]"
                : ""
            }`}
          >
            {t.common.logout}
          </button>
        </div>
      </div>
    </header>
  );
}
