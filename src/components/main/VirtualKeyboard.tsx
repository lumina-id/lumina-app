"use client";
import { useState, useRef, useEffect } from "react";
import { useGaze } from "@/context/GazeContext";

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
  const { gazeX, gazeY } = useGaze();
  const keyRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());
  const [gazeHoverKey, setGazeHoverKey] = useState<string | null>(null);
  const hoverStartTime = useRef<number | null>(null);
  const dwellTriggered = useRef(false);
  const lastTriggeredKey = useRef<string | null>(null);

  // Check gaze hover for all keys
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

    // If we're hovering over a different key, reset dwell tracking
    if (foundKey !== gazeHoverKey) {
      hoverStartTime.current = foundKey ? Date.now() : null;
      dwellTriggered.current = false;
      lastTriggeredKey.current = null;
    }

    setGazeHoverKey(foundKey);

    // Track dwell time for click
    if (foundKey && hoverStartTime.current) {
      const elapsed = Date.now() - hoverStartTime.current;
      if (elapsed >= 800 && !dwellTriggered.current && lastTriggeredKey.current !== foundKey) {
        dwellTriggered.current = true;
        lastTriggeredKey.current = foundKey;
        handleKeyClick(foundKey);
        // Reset for next dwell
        setTimeout(() => {
          dwellTriggered.current = false;
          hoverStartTime.current = Date.now();
        }, 300);
      }
    }
  }, [gazeX, gazeY, gazeHoverKey]);

  const handleKeyClick = (key: string) => {
    // Visual Feedback
    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 200);

    if (key === "BACKSPACE") {
      onBackspace();
    } else if (key === "SPACE" || key === "SPACE_DESKTOP") {
      onSpace();
    } else {
      onKeyPress(key);
    }
  };

  const setKeyRef = (key: string) => (el: HTMLButtonElement | null) => {
    keyRefs.current.set(key, el);
  };

  const renderKey = (key: string, isMobile: boolean = false) => {
    const isBackspace = key === "BACKSPACE";
    const isSpace = key === "SPACE";
    const isActive = activeKey === key;
    const isGazeHover = gazeHoverKey === key;

    // Active Style: Green Outline #33FF7E
    // Gaze Hover Style: Blue glow
    const activeStyle = isActive 
      ? "border-[3px] border-[#33FF7E] shadow-[0_0_15px_rgba(51,255,126,0.5)] bg-white transform scale-105 z-10" 
      : isGazeHover
      ? "border-[2px] border-[#354BF3] shadow-[0_0_12px_rgba(53,75,243,0.4)] bg-[#eef2ff] transform scale-105 z-10"
      : "bg-[#f1f5f9] border border-transparent btn-hover-key";

    if (isBackspace) {
      return (
        <button
          key={key}
          ref={setKeyRef(key)}
          onClick={() => handleKeyClick(key)}
          className={`flex items-center justify-center rounded-[12px] transition-all shadow-sm ${activeStyle} ${
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
          ref={setKeyRef(key)}
          onClick={() => handleKeyClick(key)}
          className={`w-[100px] h-[48px] flex items-center justify-center rounded-[12px] transition-all shadow-sm text-[16px] font-medium text-[#202020] ${activeStyle}`}
        >
          {texts.space}
        </button>
      );
    }

    return (
      <button
        key={key}
        ref={setKeyRef(key)}
        onClick={() => handleKeyClick(key)}
        className={`flex items-center justify-center rounded-[12px] transition-all shadow-sm text-[18px] font-medium text-[#202020] ${activeStyle} ${
          isMobile ? "w-[48px] h-[48px]" : "w-[60px] h-[56px]"
        }`}
      >
        {key}
      </button>
    );
  };

  const isSpaceGazeHover = gazeHoverKey === "SPACE_DESKTOP";
  const isSpaceActive = activeKey === "SPACE" || activeKey === "SPACE_DESKTOP";

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
          ref={setKeyRef("SPACE_DESKTOP")}
          onClick={() => handleKeyClick("SPACE_DESKTOP")}
          className={`w-[280px] h-[52px] flex items-center justify-center rounded-full shadow-sm text-[18px] font-medium text-[#202020] mt-2 transition-all ${
            isSpaceActive
              ? "border-[3px] border-[#33FF7E] shadow-[0_0_15px_rgba(51,255,126,0.5)] bg-white transform scale-105 z-10"
              : isSpaceGazeHover
              ? "border-[2px] border-[#354BF3] shadow-[0_0_12px_rgba(53,75,243,0.4)] bg-[#eef2ff] transform scale-105 z-10"
              : "bg-[#f1f5f9] border border-transparent btn-hover-key"
          }`}
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
