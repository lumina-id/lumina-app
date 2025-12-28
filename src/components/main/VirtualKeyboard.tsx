interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  onSpace: () => void;
  onBackspace: () => void;
  onClear: () => void;
  texts: {
    space: string;
    clearMessage: string;
  };
}

const KEYBOARD_ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Z"],
  ["X", "C", "V", "B", "N", "M", ",", ".", "?", "⌫"],
];

export default function VirtualKeyboard({
  onKeyPress,
  onSpace,
  onBackspace,
  onClear,
  texts,
}: VirtualKeyboardProps) {
  const handleKeyClick = (key: string) => {
    if (key === "⌫") {
      onBackspace();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              className={`w-[36px] h-[44px] md:w-[40px] md:h-[48px] flex items-center justify-center rounded-[8px] text-[14px] md:text-[16px] font-medium transition-all border border-[#e2e8f0] ${
                key === "⌫"
                  ? "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]"
                  : "bg-white text-[#202020] hover:bg-[#f8fafc]"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      ))}

      <button
        onClick={onSpace}
        className="w-[200px] h-[44px] md:h-[48px] flex items-center justify-center rounded-[8px] text-[14px] md:text-[16px] font-medium bg-[#202020] text-white hover:bg-[#374151] transition-all mt-1"
      >
        {texts.space}
      </button>

      <button
        onClick={onClear}
        className="flex items-center gap-1 text-[14px] text-[#ef4444] hover:text-[#dc2626] transition-colors mt-2"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {texts.clearMessage}
      </button>
    </div>
  );
}
