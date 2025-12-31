export default function CommunicationSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Text Content */}
        <div className="max-w-[600px] mb-12">
          <h2 className="text-[28px] md:text-[40px] lg:text-[48px] font-semibold text-black leading-[1.1] tracking-[-1px] mb-4">
            When Communication Becomes Physically Hard
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#6b7280] leading-relaxed">
            Millions of people live with limited physical ability while their
            thoughts remain fully intact, communicating simple needs can become
            slow, exhausting, or even impossible without support
          </p>
        </div>

        {/* Visualization */}
        <div
          className="relative w-full rounded-[24px] overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0a0e27 0%, #151a3d 50%, #1e2550 100%)",
            minHeight: "400px",
          }}
        >
          {/* Center ripple effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Ripples */}
            <div className="relative">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                  style={{
                    width: `${80 + i * 60}px`,
                    height: `${80 + i * 60}px`,
                  }}
                />
              ))}

              {/* Center icon */}
              <div className="relative z-10 w-[60px] h-[60px] rounded-full bg-[#2a3050] flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Speech bubbles */}
          <div className="absolute top-[15%] left-[10%] md:left-[15%] px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-[13px] md:text-[14px] text-white/90">
              &quot;I need help&quot;
            </span>
          </div>
          <div className="absolute top-[40%] left-[5%] md:left-[8%] px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-[13px] md:text-[14px] text-white/90">
              &quot;Can you hear me?&quot;
            </span>
          </div>
          <div className="absolute top-[20%] right-[10%] md:right-[15%] px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-[13px] md:text-[14px] text-white/90">
              &quot;I&apos;m in pain&quot;
            </span>
          </div>
          <div className="absolute top-[50%] right-[8%] md:right-[12%] px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-[13px] md:text-[14px] text-white/90">
              &quot;I&apos;m okay&quot;
            </span>
          </div>

          {/* Decorative code/text on right side */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-mono hidden lg:block">
            <div>communicating()</div>
            <div>responding()</div>
            <div>understanding()</div>
          </div>
        </div>
      </div>
    </section>
  );
}
