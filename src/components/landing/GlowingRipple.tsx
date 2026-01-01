"use client";

import { User } from "lucide-react";

export default function GlowingRipple() {
  return (
    <div className="relative flex items-center justify-center w-[800px] h-[800px]">
      {/* Central strong glow area */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,1) 0%, rgba(99,102,241,0) 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Animated Ripples - Softer and more diffuse */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-indigo-400/20 opacity-0 animate-ripple-glow"
          style={{
            width: "100%",
            height: "100%",
            animationDelay: `${i * 2}s`,
            animationDuration: "6s",
            background: 'radial-gradient(circle, transparent 40%, rgba(99,102,241,0.05) 50%, transparent 70%)',
            boxShadow: "0 0 40px rgba(99,102,241,0.1) inset"
          }}
        />
      ))}

      {/* Another layer of ripples for complexity */}
      {[0, 1].map((i) => (
        <div
          key={`inner-${i}`}
          className="absolute rounded-full border border-indigo-300/10 opacity-0 animate-ripple-glow"
          style={{
            width: "60%",
            height: "60%",
            animationDelay: `${1 + i * 2}s`,
            animationDuration: "5s",
          }}
        />
      ))}

      {/* Central Icon Container */}
      <div className="relative z-10 w-20 h-20 rounded-full bg-[#1e293b]/80 backdrop-blur-sm border border-indigo-400/50 flex items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.6)]">
        <User className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />

        {/* Inner glow pulse */}
        <div className="absolute inset-0 rounded-full animate-pulse-slow bg-indigo-500/30 blur-md" />
        <div className="absolute -inset-1 rounded-full border border-indigo-200/20" />
      </div>

      <style jsx>{`
        @keyframes ripple-glow {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0;
          }
          100% {
            transform: scale(1.1);
            opacity: 0;
          }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-ripple-glow {
          animation: ripple-glow 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
