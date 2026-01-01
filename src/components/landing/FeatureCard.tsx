import Image from "next/image";

interface FeatureCardProps {
  title: string;
  imageSrc: string;
}

export default function FeatureCard({ title, imageSrc }: FeatureCardProps) {
  return (
    <div className="relative w-full h-auto rounded-[24px] overflow-hidden hover:scale-[1.01] transition-transform duration-300">
      <Image
        src={imageSrc}
        alt={title}
        width={600}
        height={400}
        className="w-full h-auto object-cover"
        quality={100}
      />
    </div>
  );
}
