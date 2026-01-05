"use client";

import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Intelligent Speech Understanding & Response",
    description:
      "Lumina understands spoken conversations and helps users respond—locally or remotely.",
    imageSrc: "/assets/cards/intelligent.svg",
  },
  {
    title: "Context-Aware Conversation Understanding",
    description:
      "From recognizing questions to offering natural, situation-appropriate replies.",
    imageSrc: "/assets/cards/context.svg",
  },
  {
    title: "Accessible, Assistive-First Interaction",
    description:
      "Choose how to respond—blink, click, or type. No mode switching required.",
    imageSrc: "/assets/cards/accessible.svg",
  },
  {
    title: "AI-Assisted Messaging Agent",
    description:
      "Lumina can send selected messages on the user's behalf through external platforms without manual commands or app switching.",
    imageSrc: "/assets/cards/AI_Assisted.svg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white overflow-hidden">
      <motion.div
        className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div className="mb-12" variants={headerVariants}>
          <h2 className="text-[28px] md:text-[40px] lg:text-[48px] font-semibold text-black leading-[1.1] tracking-[-1px] mb-3">
            Powering Every Conversation
          </h2>
          <p
            className="text-[18px] md:text-[20px] lg:text-[24px]"
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 50,
              letterSpacing: "-0.04em",
              color: "#999999",
            }}
          >
            Advanced features designed for accessibility first
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                imageSrc={feature.imageSrc}
                index={index}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
