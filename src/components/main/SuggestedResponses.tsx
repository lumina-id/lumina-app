"use client";
import { useGazeHover } from "@/hooks/useGazeHover";
import { useCallback, useRef, useEffect, useState } from "react";
import { useGaze } from "@/context/GazeContext";

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
  const { gazeX, gazeY } = useGaze();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [gazeHoverIndex, setGazeHoverIndex] = useState<number | null>(null);
  const hoverStartTimes = useRef<(number | null)[]>([]);
  const dwellTriggered = useRef<boolean[]>([]);

  // Initialize refs array
  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, responses.length);
    hoverStartTimes.current = responses.map(() => null);
    dwellTriggered.current = responses.map(() => false);
  }, [responses.length]);

  // Check gaze hover for all buttons
  useEffect(() => {
    const padding = 15;
    let foundIndex: number | null = null;

    for (let i = 0; i < buttonRefs.current.length; i++) {
      const el = buttonRefs.current[i];
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const isOver =
        gazeX >= rect.left - padding &&
        gazeX <= rect.right + padding &&
        gazeY >= rect.top - padding &&
        gazeY <= rect.bottom + padding;

      if (isOver) {
        foundIndex = i;

        // Track dwell time
        if (hoverStartTimes.current[i] === null) {
          hoverStartTimes.current[i] = Date.now();
          dwellTriggered.current[i] = false;
        } else {
          const elapsed = Date.now() - (hoverStartTimes.current[i] || 0);
          if (elapsed >= 1000 && !dwellTriggered.current[i]) {
            dwellTriggered.current[i] = true;
            onSelect(responses[i], i);
          }
        }
      } else {
        // Reset dwell tracking for this button
        hoverStartTimes.current[i] = null;
        dwellTriggered.current[i] = false;
      }
    }

    setGazeHoverIndex(foundIndex);
  }, [gazeX, gazeY, responses, onSelect]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
      {responses.map((response, index) => (
        <button
          key={index}
          ref={(el) => { buttonRefs.current[index] = el; }}
          onClick={() => onSelect(response, index)}
          className={`relative p-4 rounded-[12px] text-left text-[15px] tracking-[-0.3px] bg-[#f9fafb] border btn-hover-suggestion transition-all duration-200 ${
            selectedIndex === index
              ? "text-[#111827] border-[#0B1FB7] bg-[#eef2ff]"
              : gazeHoverIndex === index
              ? "text-[#111827] border-[#c7d2fe] bg-[#eef2ff] -translate-y-1 shadow-[0_4px_12px_rgba(11,31,183,0.15)]"
              : "text-[#374151] border-transparent"
          }`}
        >
          {selectedIndex === index && (
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0B1FB7] rounded-l-[12px]" />
          )}
          {gazeHoverIndex === index && selectedIndex !== index && (
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#c7d2fe] rounded-l-[12px]" />
          )}
          <span className={selectedIndex === index || gazeHoverIndex === index ? "ml-1" : ""}>{response}</span>
        </button>
      ))}
    </div>
  );
}
