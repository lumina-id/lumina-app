interface HeardCardProps {
  texts: {
    label: string;
    listening: string;
    defaultText: string;
  };
  heardText?: string;
  isListening?: boolean;
  sourceLabel?: string; // e.g. "From Mom" or "Mendengarkan..."
}

export default function HeardCard({ texts, heardText, isListening = false, sourceLabel }: HeardCardProps) {
  let displayText = texts.defaultText;

  if (isListening && !heardText) {
    displayText = texts.defaultText;
  } else if (heardText) {
    displayText = heardText;
  }

  return (
    <div className="w-full bg-white rounded-[20px] p-5 border border-[#e5e7eb] shadow-sm transition-all duration-300">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[13px] text-[#6b7280] tracking-[-0.3px]">
          {/* If listening, show "Mendengarkan", otherwise show label or incoming source */}
          {isListening ? (
            <span className="text-[#0B1FB7] flex items-center gap-1 font-medium">
              <span className="inline-block w-2 h-2 bg-[#0B1FB7] rounded-full animate-pulse" />
              {texts.listening || "Mendengarkan..."}
            </span>
          ) : sourceLabel ? (
            <span className="text-[#10b981] flex items-center gap-1 font-medium">
              {sourceLabel}
            </span>
          ) : (
            texts.label
          )}
        </span>
      </div>
      <p className="text-[18px] text-[#111827] tracking-[-0.4px] leading-relaxed font-medium">
        {displayText}
      </p>
    </div>
  );
}
