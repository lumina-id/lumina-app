import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #080c1f 0%, #0f1535 40%, #1a2045 70%, #252d5a 100%)",
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
          }}
        />
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 pt-24 pb-16">
        <div className="max-w-[700px]">
          {/* Badge */}
          <div
            className="inline-block px-4 py-2 rounded-full mb-6"
            style={{
              backgroundColor: "rgba(99, 102, 241, 0.2)",
            }}
          >
            <span className="text-[13px] md:text-[14px] text-[#a5b4fc] font-medium">
              AI-powered assistive communication
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[32px] md:text-[48px] lg:text-[56px] font-semibold text-white leading-[1.1] tracking-[-1px] mb-6">
            When Words are Hard to Say,{" "}
            <span className="inline-flex items-center gap-2">
              Lumina
              <span className="relative w-[32px] h-[32px] md:w-[48px] md:h-[48px] inline-block align-middle">
                <Image
                  src="/assets/lumina-icon.svg"
                  alt="Lumina"
                  fill
                  className="object-contain"
                />
              </span>
            </span>{" "}
            Helps You Respond
          </h1>

          {/* Description */}
          <p className="text-[16px] md:text-[18px] text-white/70 leading-relaxed mb-8 max-w-[600px]">
            Platform that helps people with limited motor or speech abilities
            communicate, locally or remotely, using eye-based interaction and
            intelligent responses
          </p>

          {/* CTA Button */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] md:text-[16px] font-medium text-white transition-all hover:scale-105"
            style={{
              backgroundColor: "#1a1f3a",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Get Started
            <span className="relative w-[20px] h-[20px]">
              <Image
                src="/assets/lumina-icon.svg"
                alt=""
                fill
                className="object-contain"
              />
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom curve for transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-white"
        style={{ borderRadius: "100% 100% 0 0" }}
      />
    </section>
  );
}
