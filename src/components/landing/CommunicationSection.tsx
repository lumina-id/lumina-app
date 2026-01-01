"use client";

import dynamic from "next/dynamic";
import GlowingRipple from "./GlowingRipple";

// Dynamically import ParticleWave to avoid SSR issues with Canvas if any
const ParticleWave = dynamic(() => import("./ParticleWave"), { ssr: false });

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
          className="relative w-full rounded-[24px] overflow-hidden bg-[#030830]"
          style={{
            minHeight: "500px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
        >
          {/* Background Wave Effect */}
          <ParticleWave />

          {/* Center ripple effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <GlowingRipple />
          </div>

          {/* Speech bubbles - positioned relative to center/container */}
          {/* Enhanced Glassmorphism & 3D Tilt - "Apple Glass" Style */}
          {/* Heavier blur, stronger white border opacity, subtle gradient fill */}

          <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1200px' }}>

            {/* Top Left - "I need help" */}
            <div className="absolute top-[25%] left-[10%] md:left-[15%] pointer-events-auto animate-float-delayed-1">
              <div
                className="transition-all hover:scale-110 duration-500"
                style={{ transform: 'rotateY(25deg) rotateZ(-2deg)' }}
              >
                <div className="px-6 py-3 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-full border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),_inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:border-white/50 hover:shadow-[0_8px_40px_0_rgba(99,102,241,0.4)] transition-all">
                  <span className="text-[15px] md:text-[16px] text-white font-medium tracking-wide drop-shadow-md">
                    &quot;I need help&quot;
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Left - "Can you hear me?" */}
            <div className="absolute bottom-[30%] left-[5%] md:left-[10%] pointer-events-auto animate-float-delayed-2">
              <div
                className="transition-all hover:scale-110 duration-500"
                style={{ transform: 'rotateY(25deg) rotateZ(2deg)' }}
              >
                <div className="px-6 py-3 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-full border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),_inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:border-white/50 hover:shadow-[0_8px_40px_0_rgba(99,102,241,0.4)] transition-all">
                  <span className="text-[15px] md:text-[16px] text-white font-medium tracking-wide drop-shadow-md">
                    &quot;Can you hear me?&quot;
                  </span>
                </div>
              </div>
            </div>

            {/* Top Right - "I'm in pain" */}
            <div className="absolute top-[25%] right-[10%] md:right-[15%] pointer-events-auto animate-float-delayed-3">
              <div
                className="transition-all hover:scale-110 duration-500"
                style={{ transform: 'rotateY(-25deg) rotateZ(2deg)' }}
              >
                <div className="px-6 py-3 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-full border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),_inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:border-white/50 hover:shadow-[0_8px_40px_0_rgba(99,102,241,0.4)] transition-all">
                  <span className="text-[15px] md:text-[16px] text-white font-medium tracking-wide drop-shadow-md">
                    &quot;I&apos;m in pain&quot;
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Right - "I'm okay" */}
            <div className="absolute bottom-[35%] right-[8%] md:right-[12%] pointer-events-auto animate-float-delayed-4">
              <div
                className="transition-all hover:scale-110 duration-500"
                style={{ transform: 'rotateY(-25deg) rotateZ(-2deg)' }}
              >
                <div className="px-6 py-3 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-full border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),_inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:border-white/50 hover:shadow-[0_8px_40px_0_rgba(99,102,241,0.4)] transition-all">
                  <span className="text-[15px] md:text-[16px] text-white font-medium tracking-wide drop-shadow-md">
                    &quot;I&apos;m okay&quot;
                  </span>
                </div>
              </div>
            </div>

          </div>

          <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-15px); }
            }
            .animate-float-delayed-1 {
              animation: float 5s ease-in-out infinite;
            }
            .animate-float-delayed-2 {
              animation: float 6s ease-in-out infinite 1s;
            }
            .animate-float-delayed-3 {
              animation: float 5.5s ease-in-out infinite 0.5s;
            }
            .animate-float-delayed-4 {
              animation: float 6.5s ease-in-out infinite 1.5s;
            }
          `}</style>

        </div>
      </div>
    </section>
  );
}
