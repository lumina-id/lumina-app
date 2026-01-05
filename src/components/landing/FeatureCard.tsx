"use client";

import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  index: number;
}

export default function FeatureCard({
  title,
  description,
  imageSrc,
}: FeatureCardProps) {
  return (
    <motion.div
      className="group relative w-full h-full rounded-[24px] overflow-hidden"
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

      {/* Pulsing glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Card content with SVG image */}
      <div
        className="relative z-20 w-full h-full flex flex-col"
        style={{
          backgroundColor: "#06091A",
        }}
      >
        {/* SVG Image at the top */}
        <div className="relative w-full overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Text content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col">
          {/* Title */}
          <h3
            className="relative z-10 mb-2"
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(24px, 4vw, 32px)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #B2B5FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="relative z-10"
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 2vw, 16px)",
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
              color: "#92949A",
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Border ring */}
      <div className="absolute inset-0 rounded-[24px] ring-1 ring-white/10 group-hover:ring-indigo-500/30 transition-all duration-500 z-40 pointer-events-none" />

      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-[1px] rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(59, 130, 246, 0.4) 100%)",
          filter: "blur(8px)",
        }}
      />
    </motion.div>
  );
}
