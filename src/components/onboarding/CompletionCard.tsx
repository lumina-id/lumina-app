interface CompletionCardProps {
  texts: {
    title: string;
    subtitle: string;
    startButton: string;
  };
  onComplete: () => void;
}

export default function CompletionCard({ texts, onComplete }: CompletionCardProps) {
  return (
    <div className="flex flex-col items-center gap-[24px] w-full max-w-[400px]">
      <div className="flex flex-col items-center gap-[12px] text-center">
        <h2 className="text-[#202020] text-[24px] font-medium tracking-[-1.28px] leading-tight">
          {texts.title}
        </h2>
        <p className="text-[#999] text-[16px] tracking-[-0.72px] leading-none">
          {texts.subtitle}
        </p>
      </div>

      <button
        onClick={onComplete}
        className="px-[32px] py-[14px] rounded-[12px] bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white text-[16px] font-medium tracking-[-0.64px] hover:shadow-lg hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300"
      >
        {texts.startButton}
      </button>
    </div>
  );
}
