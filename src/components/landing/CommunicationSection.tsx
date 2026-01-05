"use client";

import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import GlowingRipple from "./GlowingRipple";

const ParticleWave = dynamic(() => import("./ParticleWave"), { ssr: false });

const titleVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      delay: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const bubbleVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.6 + i * 0.15,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  }),
};

const glowVariants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      delay: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function CommunicationSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 md:py-24 bg-white" ref={sectionRef}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="max-w-[600px] mb-12">
          <motion.h2
            className="text-[28px] md:text-[40px] lg:text-[48px] font-semibold text-black leading-[1.1] tracking-[-1px] mb-4"
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            When Communication Becomes Physically Hard
          </motion.h2>
          <motion.p
            className="text-[18px] md:text-[20px] lg:text-[24px]"
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 50,
              letterSpacing: "-0.04em",
              color: "#999999",
            }}
            variants={descriptionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Millions of people live with limited physical ability while their
            thoughts remain fully intact, communicating simple needs can become
            slow, exhausting, or even impossible without support
          </motion.p>
        </div>

        <motion.div
          className="relative w-full rounded-[24px] overflow-hidden bg-[#030830]"
          style={{
            minHeight: "500px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <ParticleWave />

          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            variants={glowVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <GlowingRipple />
          </motion.div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              className="absolute top-[25%] left-[10%] md:left-[15%] pointer-events-auto animate-float-delayed-1"
              variants={bubbleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
            >
              <div
                className="transition-all hover:scale-110 duration-500"
                style={{ transform: "rotateY(25deg) rotateZ(-2deg)" }}
              >
                <div className="px-6 py-3 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-full border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),_inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:border-white/50 hover:shadow-[0_8px_40px_0_rgba(99,102,241,0.4)] transition-all">
                  <span className="text-[15px] md:text-[16px] text-white font-medium tracking-wide drop-shadow-md">
                    &quot;I need help&quot;
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-[30%] left-[5%] md:left-[10%] pointer-events-auto animate-float-delayed-2"
              variants={bubbleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={1}
            >
              <div
                className="transition-all hover:scale-110 duration-500"
                style={{ transform: "rotateY(25deg) rotateZ(2deg)" }}
              >
                <div className="px-6 py-3 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-full border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),_inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:border-white/50 hover:shadow-[0_8px_40px_0_rgba(99,102,241,0.4)] transition-all">
                  <span className="text-[15px] md:text-[16px] text-white font-medium tracking-wide drop-shadow-md">
                    &quot;Can you hear me?&quot;
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-[25%] right-[10%] md:right-[15%] pointer-events-auto animate-float-delayed-3"
              variants={bubbleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={2}
            >
              <div
                className="transition-all hover:scale-110 duration-500"
                style={{ transform: "rotateY(-25deg) rotateZ(2deg)" }}
              >
                <div className="px-6 py-3 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-full border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),_inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:border-white/50 hover:shadow-[0_8px_40px_0_rgba(99,102,241,0.4)] transition-all">
                  <span className="text-[15px] md:text-[16px] text-white font-medium tracking-wide drop-shadow-md">
                    &quot;I&apos;m in pain&quot;
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-[35%] right-[8%] md:right-[12%] pointer-events-auto animate-float-delayed-4"
              variants={bubbleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={3}
            >
              <div
                className="transition-all hover:scale-110 duration-500"
                style={{ transform: "rotateY(-25deg) rotateZ(-2deg)" }}
              >
                <div className="px-6 py-3 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-full border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),_inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:border-white/50 hover:shadow-[0_8px_40px_0_rgba(99,102,241,0.4)] transition-all">
                  <span className="text-[15px] md:text-[16px] text-white font-medium tracking-wide drop-shadow-md">
                    &quot;I&apos;m okay&quot;
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-15px);
              }
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
        </motion.div>
      </div>
    </section>
  );
}
