"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  index: number;
}

export default function FeatureCard({
  title,
  imageSrc,
}: FeatureCardProps) {
  return (
    <motion.div
      className="group relative w-full rounded-[24px] overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

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

      <div className="relative z-20">
        <Image
          src={imageSrc}
          alt={title}
          width={600}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          quality={100}
        />
      </div>

      <div className="absolute inset-0 rounded-[24px] ring-1 ring-white/10 group-hover:ring-indigo-500/30 transition-all duration-500 z-40 pointer-events-none" />

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
