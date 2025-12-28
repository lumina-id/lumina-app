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

const DESKTOP_ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Z"],
  ["X", "C", "V", "B", "N", "M", ",", ".", "?", "BACKSPACE"],
];

const MOBILE_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U"],
  ["I", "O", "P", "A", "S", "D", "F"],
  ["G", "H", "J", "K", "L", "Z", "X"],
  ["C", "V", "B", "N", "M", "1", "2"],
  ["3", "4", "5", "6", "7", "8", "9"],
  ["0", ".", "SPACE", ",", "?", "BACKSPACE"],
];

export default function VirtualKeyboard({
  onKeyPress,
  onSpace,
  onBackspace,
  onClear,
  texts,
}: VirtualKeyboardProps) {
  const handleKeyClick = (key: string) => {
    if (key === "BACKSPACE") {
      onBackspace();
    } else if (key === "SPACE") {
      onSpace();
    } else {
      onKeyPress(key);
    }
  };

  const renderKey = (key: string, isMobile: boolean = false) => {
    const isBackspace = key === "BACKSPACE";
    const isSpace = key === "SPACE";

    if (isBackspace) {
      return (
        <button
          key={key}
          onClick={() => handleKeyClick(key)}
          className={`flex items-center justify-center rounded-[12px] bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-all shadow-sm ${
            isMobile ? "w-[48px] h-[48px]" : "w-[60px] h-[56px]"
          }`}
        >
          <svg
            width={isMobile ? "20" : "24"}
            height={isMobile ? "20" : "24"}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z"
              stroke="#374151"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 9l-6 6M12 9l6 6"
              stroke="#374151"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      );
    }

    if (isSpace && isMobile) {
      return (
        <button
          key={key}
          onClick={() => handleKeyClick(key)}
          className="w-[100px] h-[48px] flex items-center justify-center rounded-[12px] bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-all shadow-sm text-[16px] font-medium text-[#202020]"
        >
          {texts.space}
        </button>
      );
    }

    return (
      <button
        key={key}
        onClick={() => handleKeyClick(key)}
        className={`flex items-center justify-center rounded-[12px] bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-all shadow-sm text-[18px] font-medium text-[#202020] ${
          isMobile ? "w-[48px] h-[48px]" : "w-[60px] h-[56px]"
        }`}
      >
        {key}
      </button>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col items-center gap-2">
        {DESKTOP_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 justify-center">
            {row.map((key) => renderKey(key, false))}
          </div>
        ))}

        <button
          onClick={onSpace}
          className="w-[280px] h-[52px] flex items-center justify-center rounded-full bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-all shadow-sm text-[18px] font-medium text-[#202020] mt-2"
        >
          {texts.space}
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col items-center gap-2">
        {MOBILE_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 justify-center">
            {row.map((key) => renderKey(key, true))}
          </div>
        ))}
      </div>

      <button
        onClick={onClear}
        className="flex items-center gap-2 text-[14px] text-[#ef4444] hover:text-[#dc2626] transition-colors mt-3"
      >
        <svg
          width="18"
          height="18"
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
