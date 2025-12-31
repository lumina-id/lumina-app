"use client";
import { useGaze } from "@/context/GazeContext";
import { RefObject, useEffect, useRef, useState } from "react";

interface GazeHoverOptions {
  padding?: number;
  dwellTime?: number;
  onDwell?: () => void;
}

export function useGazeHover<T extends HTMLElement>(
  options: GazeHoverOptions = {}
): {
  ref: RefObject<T | null>;
  isGazeHovering: boolean;
  dwellProgress: number;
} {
  const { padding = 20, dwellTime = 1000, onDwell } = options;
  const ref = useRef<T | null>(null);
  const { gazeX, gazeY } = useGaze();
  const [isGazeHovering, setIsGazeHovering] = useState(false);
  const [dwellProgress, setDwellProgress] = useState(0);
  const hoverStartTime = useRef<number | null>(null);
  const dwellTriggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const isOver =
      gazeX >= rect.left - padding &&
      gazeX <= rect.right + padding &&
      gazeY >= rect.top - padding &&
      gazeY <= rect.bottom + padding;

    if (isOver) {
      setIsGazeHovering(true);
      if (hoverStartTime.current === null) {
        hoverStartTime.current = Date.now();
        dwellTriggered.current = false;
      } else {
        const elapsed = Date.now() - hoverStartTime.current;
        const progress = Math.min(elapsed / dwellTime, 1);
        setDwellProgress(progress);

        if (progress >= 1 && !dwellTriggered.current && onDwell) {
          dwellTriggered.current = true;
          onDwell();
        }
      }
    } else {
      setIsGazeHovering(false);
      setDwellProgress(0);
      hoverStartTime.current = null;
      dwellTriggered.current = false;
    }
  }, [gazeX, gazeY, padding, dwellTime, onDwell]);

  return { ref, isGazeHovering, dwellProgress };
}

// Hook for tracking multiple elements (like keyboard keys)
export function useGazeHoverMultiple(
  count: number,
  options: { padding?: number } = {}
): {
  refs: RefObject<HTMLElement | null>[];
  hoveringIndex: number | null;
} {
  const { padding = 15 } = options;
  const refs = useRef<RefObject<HTMLElement | null>[]>(
    Array.from({ length: count }, () => ({ current: null }))
  );
  const { gazeX, gazeY } = useGaze();
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);

  useEffect(() => {
    let foundIndex: number | null = null;

    for (let i = 0; i < refs.current.length; i++) {
      const el = refs.current[i].current;
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

    setHoveringIndex(foundIndex);
  }, [gazeX, gazeY, padding]);

  return { refs: refs.current, hoveringIndex };
}
