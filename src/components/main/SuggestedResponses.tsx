"use client";
import { useGaze } from "@/context/GazeContext";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SuggestedResponsesProps {
  responses: string[];
  selectedIndex: number | null;
  onSelect: (response: string, index: number) => void;
  isLoading?: boolean;
}

export default function SuggestedResponses({
  responses,
  selectedIndex,
  onSelect,
  isLoading = false,
}: SuggestedResponsesProps) {
  const { gazeX, gazeY } = useGaze();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [gazeHoverIndex, setGazeHoverIndex] = useState<number | null>(null);

  // Initialize refs array
  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, responses.length);
  }, [responses.length]);

  // Check gaze hover for all buttons - visual feedback only
  // Actual click is handled by blink detection in useFaceMesh
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
        break;
      }
    }

    setGazeHoverIndex(foundIndex);
  }, [gazeX, gazeY]);

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-[56px] w-full rounded-[12px] overflow-hidden"
          >
            <Skeleton height={56} borderRadius={12} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
      {responses.map((response, index) => (
        <button
          key={index}
          ref={(el) => {
            buttonRefs.current[index] = el;
          }}
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
          <span
            className={
              selectedIndex === index || gazeHoverIndex === index ? "ml-1" : ""
            }
          >
            {response}
          </span>
        </button>
      ))}
    </div>
  );
}
