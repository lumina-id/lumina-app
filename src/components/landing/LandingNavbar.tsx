"use client";
import Image from "next/image";
import Link from "next/link";

export default function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 py-4">
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
          <span className="text-[20px] md:text-[24px] font-medium text-white tracking-[-0.5px]">
            Lumina
          </span>
        </Link>

        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-[16px] text-white/90 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="#about"
            className="text-[16px] text-white/90 hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="#features"
            className="text-[16px] text-white/90 hover:text-white transition-colors"
          >
            Features
          </Link>
        </div>

        {/* Sign in Button */}
        <Link
          href="/login"
          style={{ backgroundColor: "#081787" }}
          className="px-5 py-2.5 rounded-[10px] text-[14px] md:text-[16px] font-medium text-white hover:opacity-90 transition-opacity"
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
}
