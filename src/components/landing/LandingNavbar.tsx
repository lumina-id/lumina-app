"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 py-4 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#0a0e27]/95 backdrop-blur-md shadow-lg" 
          : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-[36px] h-[36px] md:w-[40px] md:h-[40px]">
            <Image
              src="/assets/lumina-icon.svg"
              alt="Lumina"
              fill
              className="object-contain"
            />
          </div>
          <span className={`text-[20px] md:text-[22px] font-medium tracking-[-0.04em] transition-colors ${
            isScrolled ? "text-white" : "text-white md:text-black"
          }`}>
            Lumina
          </span>
        </Link>

        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-[16px] tracking-[-0.04em] transition-colors ${
              isScrolled ? "text-white/90 hover:text-white" : "text-white/90 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            href="#about"
            className={`text-[16px] tracking-[-0.04em] transition-colors ${
              isScrolled ? "text-white/90 hover:text-white" : "text-white/90 hover:text-white"
            }`}
          >
            About
          </Link>
          <Link
            href="#features"
            className={`text-[16px] tracking-[-0.04em] transition-colors ${
              isScrolled ? "text-white/90 hover:text-white" : "text-white/90 hover:text-white"
            }`}
          >
            Features
          </Link>
        </div>

        {/* Sign in Button */}
        <Link
          href="/login"
          className="px-5 py-2 rounded-[10px] text-[14px] md:text-[16px] font-medium tracking-[-0.04em] text-white hover:opacity-90 transition-opacity"
          style={{
            background: "linear-gradient(90deg, #4357BC 0%, #6B87C7 100%)",
          }}
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
}
