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
    <div className="w-full bg-white rounded-[20px] p-5 border border-[#e5e7eb] shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[13px] text-[#6b7280] tracking-[-0.3px]">
          {texts.label}
        </span>
        {isListening && (
          <span className="text-[13px] text-[#0B1FB7] tracking-[-0.3px] flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-[#0B1FB7] rounded-full animate-pulse" />
            {texts.listening}
          </span>
        )}
      </div>
      <p className="text-[18px] text-[#111827] tracking-[-0.4px] leading-relaxed font-medium">
        {displayText}
      </p>
    </div>
  );
}
