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
  const hoverStartTime = useRef<number | null>(null);
  const dwellTriggered = useRef(false);

  // Check gaze hover for logout button
  useEffect(() => {
    if (!logoutRef.current) return;

    const padding = 20;
    const rect = logoutRef.current.getBoundingClientRect();
    const isOver =
      gazeX >= rect.left - padding &&
      gazeX <= rect.right + padding &&
      gazeY >= rect.top - padding &&
      gazeY <= rect.bottom + padding;

    if (isOver) {
      setIsGazeHover(true);
      if (hoverStartTime.current === null) {
        hoverStartTime.current = Date.now();
        dwellTriggered.current = false;
      } else {
        const elapsed = Date.now() - hoverStartTime.current;
        if (elapsed >= 1000 && !dwellTriggered.current && onLogout) {
          dwellTriggered.current = true;
          onLogout();
        }
      }
    } else {
      setIsGazeHover(false);
      hoverStartTime.current = null;
      dwellTriggered.current = false;
    }
  }, [gazeX, gazeY, onLogout]);

  return (
    <header className="w-full border-b border-[#ddd] px-4 md:px-[100px] py-[19px] flex justify-center">
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
          <button
            ref={logoutRef}
            onClick={onLogout}
            className={`border border-[#ddd] px-[16px] py-[10px] rounded-[12px] text-[16px] text-black tracking-[-0.8px] leading-none btn-hover-secondary transition-all duration-200 ${
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
