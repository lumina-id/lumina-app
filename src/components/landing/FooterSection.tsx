"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FooterSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <footer className="relative w-full overflow-hidden">
      <Image
        src="/assets/bg-footer.png"
        alt="Footer background"
        fill
        className="object-cover object-center"
        priority
      />

      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-12 lg:px-20 py-8 md:py-12 lg:py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex flex-col items-start md:items-start lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6 lg:gap-16 mb-8 md:mb-12">
          <motion.h2
            className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[48px] font-medium leading-[1.15]"
            style={{
              fontFamily: "Satoshi, sans-serif",
              letterSpacing: "-0.04em",
              background: "linear-gradient(90deg, #5C5A68 0%, #F4E7FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            variants={itemVariants}
          >
            Communication Should Not
            <br />
            Depend on Physical Ability
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="flex-shrink-0 mt-2 md:mt-0"
          >
            <Link
              href="/login"
              className="group relative inline-flex items-center gap-2 md:gap-3 pl-4 md:pl-6 pr-2 md:pr-4 py-2 md:py-3 rounded-full md:rounded-[16px] text-white font-medium transition-all duration-300 hover:shadow-[0_8px_30px_rgba(67,87,188,0.4)] hover:translate-y-[-2px]"
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "clamp(14px, 3vw, 20px)",
                letterSpacing: "-0.04em",
                background: "linear-gradient(90deg, #4357BC 0%, #6B87C7 100%)",
              }}
            >
              <span>Try Lumina Now</span>
              <div className="relative w-5 h-5 md:w-7 md:h-7 flex items-center justify-center bg-white rounded-full transition-transform duration-300 group-hover:scale-110">
                <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-[#4357BC]" />
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-row items-center justify-between gap-4"
          variants={itemVariants}
        >
          <p
            className="text-white text-[12px] md:text-[16px] font-normal"
            style={{
              letterSpacing: "-0.02em",
              fontFamily: "Satoshi, sans-serif",
            }}
          >
            (© 2025 Lumina)
          </p>

          <nav
            className="flex flex-row items-center gap-3 md:gap-8"
            aria-label="Footer navigation"
          >
            {["Home", "About", "Feature"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                className="text-white text-[12px] md:text-[16px] font-normal hover:opacity-80 transition-opacity duration-200"
                style={{
                  letterSpacing: "-0.04em",
                  fontFamily: "Satoshi, sans-serif",
                }}
              >
                {item}
              </Link>
            ))}
          </nav>
        </motion.div>
      </motion.div>
    </footer>
  );
}
