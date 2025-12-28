interface HeardCardProps {
  texts: {
    label: string;
    listening: string;
    defaultText: string;
  };
  heardText?: string;
  isListening?: boolean;
}

export default function HeardCard({ texts, heardText, isListening = false }: HeardCardProps) {
  const displayText = heardText || texts.defaultText;

  return (
    <div className="w-full bg-[#f8fafc] rounded-[16px] p-4 border border-[#e2e8f0]">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[12px] text-[#64748b] tracking-[-0.48px]">
          {texts.label}
        </span>
        {isListening && (
          <span className="text-[12px] text-[#3b82f6] tracking-[-0.48px] flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-[#3b82f6] rounded-full animate-pulse" />
            {texts.listening}
          </span>
        )}
      </div>
      <p className="text-[16px] text-[#202020] tracking-[-0.64px] leading-relaxed">
        {displayText}
      </p>
    </div>
  );
}
