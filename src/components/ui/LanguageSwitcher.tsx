"use client";
import Image from "next/image";

type Locale = "en" | "id";

interface LanguageSwitcherProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function LanguageSwitcher({ locale, onLocaleChange }: LanguageSwitcherProps) {
  return (
    <div className="bg-[#f8fafc] border border-[#e2e8f0] flex gap-[8px] items-center px-[8px] py-[6px] rounded-[12px]">
      <div className="relative w-[20px] h-[20px]">
        <Image
          src="/assets/language-icon.svg"
          alt="Language"
          fill
          className="object-contain"
        />
      </div>
      <button
        onClick={() => onLocaleChange("en")}
        className={`px-[8px] py-[4px] rounded-[8px] transition-all ${
          locale === "en"
            ? "bg-white shadow-sm"
            : "bg-transparent hover:bg-white/50"
        }`}
      >
        <span
          className={`text-[16px] font-medium tracking-[-0.8px] leading-none ${
            locale === "en" ? "text-black" : "text-[#777]"
          }`}
        >
          EN
        </span>
      </button>
      <button
        onClick={() => onLocaleChange("id")}
        className={`px-[8px] py-[4px] rounded-[8px] transition-all ${
          locale === "id"
            ? "bg-white shadow-sm"
            : "bg-transparent hover:bg-white/50"
        }`}
      >
        <span
          className={`text-[16px] font-medium tracking-[-0.8px] leading-none ${
            locale === "id" ? "text-black" : "text-[#777]"
          }`}
        >
          ID
        </span>
      </button>
    </div>
  );
}
