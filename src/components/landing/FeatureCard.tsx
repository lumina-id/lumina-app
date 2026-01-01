import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

export default function FeatureCard({ title, description, imageSrc }: FeatureCardProps) {
  return (
    <div
      className="relative rounded-[24px] overflow-hidden group hover:scale-[1.01] transition-all duration-300"
      style={{
        background: "#030830", // Deep navy background to match reference
        border: "1px solid rgba(255,255,255,0.05)",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Icon/Visualization area - Top half */}
      <div className="relative h-[220px] w-full bg-[#050b3b] overflow-hidden flex items-center justify-center p-8">
        {/* Glow effect slightly behind the image */}
        <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent opacity-50" />

        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={title}
            width={300} // Adjust based on SVG natural size, ensuring it fits well
            height={200}
            className="object-contain max-h-full max-w-full drop-shadow-xl"
          />
        </div>
      </div>

      {/* Content - Bottom half */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-[22px] md:text-[24px] font-semibold text-white mb-3 leading-tight tracking-tight">
          {title}
        </h3>
        <p className="text-[15px] md:text-[16px] text-[#9ca3af] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
