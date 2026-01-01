"use client";

import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Intelligent Speech Understanding & Response",
    imageSrc: "/assets/cards/intelligent-speech.png",
  },
  {
    title: "Context-Aware Conversation Understanding",
    imageSrc: "/assets/cards/context-aware.png",
  },
  {
    title: "Accessible, Assistive-First Interaction",
    imageSrc: "/assets/cards/accessible.png",
  },
  {
    title: "AI-Assisted Messaging Agent",
    imageSrc: "/assets/cards/ai-assisted.png",
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
          <p className="text-[16px] md:text-[18px] text-gray-600">
            Advanced features designed for accessibility first
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              imageSrc={feature.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
