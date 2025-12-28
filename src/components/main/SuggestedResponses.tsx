interface SuggestedResponsesProps {
  responses: string[];
  selectedIndex: number | null;
  onSelect: (response: string, index: number) => void;
}

export default function SuggestedResponses({
  responses,
  selectedIndex,
  onSelect,
}: SuggestedResponsesProps) {
  return (
    <div className="w-full grid grid-cols-2 gap-3">
      {responses.map((response, index) => (
        <button
          key={index}
          onClick={() => onSelect(response, index)}
          className={`p-4 rounded-[12px] text-left text-[14px] tracking-[-0.56px] transition-all border-2 ${
            selectedIndex === index
              ? "border-[#3b82f6] bg-white text-[#202020]"
              : "border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] hover:border-[#cbd5e1]"
          }`}
        >
          {response}
        </button>
      ))}
    </div>
  );
}
