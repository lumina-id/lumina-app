"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section className="bg-white pt-1 pb-0 px-2 md:px-4">
      {/* Hero Card Container with rounded corners */}
      <div className="relative min-h-[calc(100vh-16px)] rounded-[24px] md:rounded-[32px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/bg-hero.png"
            alt=""
            fill
            priority
            className="object-cover lg:object-contain"
          />
        </div>

        {/* Comet Effects */}
        <div className="absolute top-0 right-0 w-[50%] h-full pointer-events-none z-0">
          <Image
            src="/assets/large-comet.png"
            alt=""
            fill
            className="object-contain object-right"
            priority
          />
        </div>
        <div className="absolute top-0 left-0 w-[50%] h-full pointer-events-none z-0">
          <Image
            src="/assets/small-comet.png"
            alt=""
            fill
            className="object-contain object-left"
            priority
          />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-[900px]">
            {/* Badge */}
            <motion.div
              className="inline-block px-6 py-3 rounded-full mb-6"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(167,176,230,0.4)",
                backdropFilter: "blur(10px)",
              }}
              variants={itemVariants}
            >
              <span
                className="text-[16px] md:text-[20px] tracking-[-0.04em] font-light"
                style={{
                  background:
                    "linear-gradient(90deg, #CFD4FC 50%, #6F7EF6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AI-powered assistive communication
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-[32px] md:text-[48px] lg:text-[56px] font-semibold leading-[1.15] tracking-[-1px] mb-6"
              style={{
                background: "linear-gradient(90deg, #F4E7FF 0%, #5C5A68 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              variants={itemVariants}
            >
              When Words are Hard to Say,{" "}
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                Lumina
                <span className="relative w-[36px] h-[36px] md:w-[48px] md:h-[48px] inline-block align-middle">
                  <Image
                    src="/assets/Icon.png"
                    alt="Lumina"
                    fill
                    className="object-contain"
                  />
                </span>
              </span>{" "}
              Helps You Respond
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-[18px] md:text-[24px] leading-[120%] tracking-[-0.04em] mb-8 max-w-[850px]"
              style={{ color: "#EAEAEA" }}
              variants={itemVariants}
            >
              Platform that helps people with limited motor or speech abilities
              communicate, locally or remotely, using eye-based interaction and
              intelligent responses
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <Link
                href="/login"
                className="group relative inline-flex items-center gap-2 md:gap-3 pl-4 md:pl-6 pr-2 md:pr-4 py-2 md:py-3 rounded-full md:rounded-[16px] text-white font-medium transition-all duration-300 hover:shadow-[0_8px_30px_rgba(67,87,188,0.4)] hover:translate-y-[-2px]"
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontSize: "clamp(14px, 3vw, 20px)",
                  letterSpacing: "-0.04em",
                  background:
                    "linear-gradient(90deg, #4357BC 0%, #6B87C7 100%)",
                }}
              >
                <span>Get Started</span>
                <div className="relative w-5 h-5 md:w-7 md:h-7 flex items-center justify-center bg-white rounded-full transition-transform duration-300 group-hover:scale-110">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:w-4 md:h-4"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="#4357BC"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
