"use client";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  onLogout?: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  const { locale, setLocale, t } = useLanguage();

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
            onClick={onLogout}
            className="border border-[#ddd] px-[16px] py-[10px] rounded-[12px] text-[16px] text-black tracking-[-0.8px] leading-none hover:bg-gray-50 transition-colors"
          >
            {t.common.logout}
          </button>
        </div>
      </div>
    </header>
  );
}
