import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-white pt-1 pb-0 px-4 md:px-6">
      {/* Hero Card Container with rounded corners */}
      <div className="relative min-h-[calc(100vh-16px)] rounded-[24px] md:rounded-[32px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/bg-hero.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-32">
          <div className="max-w-[700px]">
            {/* Badge */}
            <div
              className="inline-block px-4 py-2 rounded-full mb-6"
              style={{
                backgroundColor: "rgba(99, 102, 241, 0.2)",
              }}
            >
              <span className="text-[13px] md:text-[14px] text-[#ff7b5f] font-medium">
                AI-powered assistive communication
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[32px] md:text-[48px] lg:text-[56px] font-semibold text-white leading-[1.1] tracking-[-1px] mb-6">
              When Words are Hard to Say,
              <br />
              <span className="inline-flex items-center gap-3">
                Lumina
                <span className="relative w-[40px] h-[40px] md:w-[56px] md:h-[56px] inline-block">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] md:text-[15px] font-medium text-white transition-all hover:scale-105"
              style={{
                backgroundColor: "#1e2a5e",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              Get Started
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
