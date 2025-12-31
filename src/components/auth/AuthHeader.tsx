"use client";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function AuthHeader() {
  const { locale, setLocale } = useLanguage();

  return (
    <header className="w-full px-4 md:px-[60px] lg:px-[100px] py-[19px] flex justify-center absolute top-0 left-0 right-0 z-10">
      <div className="w-full max-w-[1240px] flex items-center justify-between">
        <div className="flex gap-[8px] items-center">
          <div className="relative w-[32px] h-[32px] md:w-[40px] md:h-[40px]">
            <Image
              src="/assets/lumina-icon.svg"
              alt="Lumina Icon"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[20px] md:text-[24px] font-medium text-black tracking-[-0.8px] leading-none">
            Lumina
          </span>
        </div>

        <LanguageSwitcher locale={locale} onLocaleChange={setLocale} />
      </div>
    </header>
  );
}
