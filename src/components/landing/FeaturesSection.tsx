"use client";

import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Intelligent Speech Understanding & Response",
    description:
      "Lumina understands spoken conversations and helps users respond—locally or remotely.",
    icon: "speech" as const,
  },
  {
    title: "Context-Aware Conversation Understanding",
    description:
      "From recognizing questions to offering natural, situation-appropriate replies.",
    icon: "context" as const,
  },
  {
    title: "Accessible, Assistive-First Interaction",
    description:
      "Choose how to respond—blink, click, or type. No mode switching required.",
    icon: "accessible" as const,
  },
  {
    title: "AI-Assisted Messaging Agent",
    description:
      "Lumina can send selected messages on the user's behalf through external platforms without manual commands or app switching.",
    icon: "messaging" as const,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-[28px] md:text-[40px] lg:text-[48px] font-semibold text-black leading-[1.1] tracking-[-1px] mb-3">
            Powering Every Conversation
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#6b7280]">
            Advanced features designed for accessibility first
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
