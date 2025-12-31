import Link from "next/link";

export default function FooterSection() {
  return (
    <footer
      className="relative py-16 md:py-20"
      style={{
        background:
          "linear-gradient(180deg, #0a0e27 0%, #12162f 50%, #1a1f45 100%)",
      }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 h-full opacity-20"
          style={{
            background:
              "linear-gradient(to top, rgba(99,102,241,0.1), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
        {/* CTA Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
          <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold text-white leading-[1.2] tracking-[-0.5px] mb-6 md:mb-0 max-w-[500px]">
            Communication Should Not Depend on Physical Ability
          </h2>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] text-[15px] md:text-[16px] font-medium text-white transition-all hover:scale-105"
            style={{ backgroundColor: "#3b4ade" }}
          >
            Try Lumina Now
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-8 border-t border-white/10">
          <p className="text-[14px] text-white/60 mb-4 md:mb-0">
            (© 2025 Lumina)
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-[14px] text-white/60 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-[14px] text-white/60 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="#features"
              className="text-[14px] text-white/60 hover:text-white transition-colors"
            >
              Feature
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
