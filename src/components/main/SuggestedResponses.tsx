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
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
      {responses.map((response, index) => (
        <button
          key={index}
          onClick={() => onSelect(response, index)}
          className={`relative p-4 rounded-[12px] text-left text-[15px] tracking-[-0.3px] transition-all bg-[#f9fafb] hover:bg-[#f3f4f6] ${
            selectedIndex === index
              ? "text-[#111827]"
              : "text-[#374151]"
          }`}
        >
          {selectedIndex === index && (
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0B1FB7] rounded-l-[12px]" />
          )}
          <span className={selectedIndex === index ? "ml-1" : ""}>{response}</span>
        </button>
      ))}
    </div>
  );
}
