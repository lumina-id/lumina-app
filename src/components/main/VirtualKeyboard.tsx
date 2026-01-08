"use client";
import { useGaze } from "@/context/GazeContext";
import { useEffect, useRef, useState } from "react";

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

// Flatten all keys for indexing
const ALL_KEYS = [...DESKTOP_ROWS.flat(), "SPACE_DESKTOP"];

export default function VirtualKeyboard({
  onKeyPress,
  onSpace,
  onBackspace,
  onClear,
  texts,
}: VirtualKeyboardProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const { gazeX, gazeY, isGazeEnabled, setGazeEnabled } = useGaze();
  const keyRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());
  const [gazeHoverKey, setGazeHoverKey] = useState<string | null>(null);

  // Check gaze hover
  useEffect(() => {
    const padding = 10;
    let foundKey: string | null = null;

    keyRefs.current.forEach((el, key) => {
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const isOver =
        gazeX >= rect.left - padding &&
        gazeX <= rect.right + padding &&
        gazeY >= rect.top - padding &&
        gazeY <= rect.bottom + padding;

      if (isOver) {
        foundKey = key;
      }
    });

    setGazeHoverKey(foundKey);
  }, [gazeX, gazeY]);

  const handleKeyClick = (key: string) => {
    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 200);

    if (key === "TOGGLE") {
      setGazeEnabled(!isGazeEnabled);
      return;
    }

    if (!isGazeEnabled) return; // Prevent other keys if disabled

    if (key === "BACKSPACE") {
      onBackspace();
    } else if (key === "SPACE" || key === "SPACE_DESKTOP") {
      onSpace();
    } else {
      onKeyPress(key);
    }
  };

  const setKeyRef =
    (key: string, isMobile: boolean = false) =>
      (el: HTMLButtonElement | null) => {
        const refKey = isMobile ? `M_${key}` : `D_${key}`;
        keyRefs.current.set(refKey, el);
      };

  const renderKey = (key: string, isMobile: boolean = false) => {
    const isBackspace = key === "BACKSPACE";
    const isSpace = key === "SPACE";
    const isActive = activeKey === key;
    const refKey = isMobile ? `M_${key}` : `D_${key}`;
    const isGazeHover = gazeHoverKey === refKey;

    // Dim keys if gaze is disabled
    const disabledStyle = !isGazeEnabled ? "opacity-50 grayscale" : "";

    const activeStyle = isActive
      ? "border-[3px] border-[#33FF7E] shadow-[0_0_15px_rgba(51,255,126,0.5)] bg-white transform scale-105 z-10"
      : isGazeHover
        ? "border-[2px] border-[#354BF3] shadow-[0_0_12px_rgba(53,75,243,0.4)] bg-[#eef2ff] transform scale-105 z-10"
        : "bg-[#f1f5f9] border border-transparent btn-hover-key";

    if (isBackspace) {
      return (
        <button
          key={key}
          ref={setKeyRef(key, isMobile)}
          onClick={() => handleKeyClick(key)}
          className={`flex items-center justify-center rounded-[12px] transition-all shadow-sm outline-none focus:outline-none ${activeStyle} ${disabledStyle} ${isMobile ? "w-[40px] h-[44px]" : "w-[60px] h-[56px]"
            }`}
        >
          <svg
            width={isMobile ? "18" : "24"}
            height={isMobile ? "18" : "24"}
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
          ref={setKeyRef(key, isMobile)}
          onClick={() => handleKeyClick(key)}
          className={`w-[88px] h-[44px] flex items-center justify-center rounded-[12px] transition-all shadow-sm text-[16px] font-medium text-[#202020] outline-none focus:outline-none ${activeStyle} ${disabledStyle}`}
        >
          {texts.space}
        </button>
      );
    }

    return (
      <button
        key={key}
        ref={setKeyRef(key, isMobile)}
        onClick={() => handleKeyClick(key)}
        className={`flex items-center justify-center rounded-[12px] transition-all shadow-sm font-medium text-[#202020] outline-none focus:outline-none ${activeStyle} ${disabledStyle} ${isMobile ? "w-[40px] h-[44px] text-[16px]" : "w-[60px] h-[56px] text-[18px]"
          }`}
      >
        {key}
      </button>
    );
  };

  const isSpaceGazeHover = gazeHoverKey === "D_SPACE_DESKTOP";
  const isSpaceActive = activeKey === "SPACE" || activeKey === "SPACE_DESKTOP";
  const isToggleActive = activeKey === "TOGGLE";
  const isToggleGazeHover = gazeHoverKey === "D_TOGGLE";
  const disabledSpaceStyle = !isGazeEnabled ? "opacity-50 grayscale" : "";

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col items-center gap-2">
        {DESKTOP_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 justify-center">
            {row.map((key) => renderKey(key, false))}
          </div>
        ))}

        <div className="flex items-center gap-4 mt-2">
          <button
            ref={setKeyRef("SPACE_DESKTOP", false)}
            onClick={() => handleKeyClick("SPACE_DESKTOP")}
            className={`w-[280px] h-[52px] flex items-center justify-center rounded-full shadow-sm text-[18px] font-medium text-[#202020] transition-all outline-none focus:outline-none ${isSpaceActive
              ? "border-[3px] border-[#33FF7E] shadow-[0_0_15px_rgba(51,255,126,0.5)] bg-white transform scale-105 z-10"
              : isSpaceGazeHover
                ? "border-[2px] border-[#354BF3] shadow-[0_0_12px_rgba(53,75,243,0.4)] bg-[#eef2ff] transform scale-105 z-10"
                : "bg-[#f1f5f9] border border-transparent btn-hover-key"
              } ${disabledSpaceStyle}`}
          >
            {texts.space}
          </button>

          <button
            id="gaze-toggle-btn"
            ref={setKeyRef("TOGGLE", false)}
            onClick={() => handleKeyClick("TOGGLE")}
            className={`w-[56px] h-[56px] flex items-center justify-center rounded-full shadow-sm transition-all outline-none focus:outline-none ${isToggleActive
              ? "border-[3px] border-[#33FF7E] bg-white transform scale-105 z-10"
              : !isGazeEnabled
                ? "bg-[#fee2e2] border-[2px] border-[#ef4444] shadow-[0_0_15px_rgba(239,68,68,0.5)] z-20" // Red alert state
                : isToggleGazeHover
                  ? "border-[2px] border-[#354BF3] bg-[#eef2ff] transform scale-105 z-10"
                  : "bg-[#f1f5f9] border border-transparent btn-hover-key"
              }`}
          >
            {isGazeEnabled ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col items-center gap-1">
        {MOBILE_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {row.map((key) => renderKey(key, true))}
          </div>
        ))}
      </div>

      <button
        ref={setKeyRef("CLEAR", false)}
        onClick={onClear}
        className={`flex items-center justify-center gap-2 px-[20px] py-[12px] rounded-[12px] text-[14px] font-medium shadow-sm mt-3 transition-all duration-200 cursor-pointer outline-none focus:outline-none ${gazeHoverKey === "D_CLEAR"
          ? "bg-[#fee2e2] border-[2px] border-[#f87171] shadow-[0_0_12px_rgba(248,113,113,0.4)] transform scale-105 text-[#991b1b]"
          : "bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] hover:bg-[#fee2e2] hover:scale-102 hover:shadow-md"
          } ${disabledSpaceStyle}`}
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
