"use client";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseBlinkDetectionReturn {
  blinkDetected: boolean;
  isHovering: boolean;
  startHover: () => void;
  endHover: () => void;
  resetDetection: () => void;
}

export const useBlinkDetection = (): UseBlinkDetectionReturn => {
  const [blinkDetected, setBlinkDetected] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetDetection = useCallback(() => {
    setBlinkDetected(false);
    setIsHovering(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startHover = useCallback(() => {
    setIsHovering(true);
  }, []);

  const endHover = useCallback(() => {
    setIsHovering(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isHovering && !blinkDetected) {
      timerRef.current = setTimeout(() => {
        setBlinkDetected(true);
      }, 1500);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isHovering, blinkDetected]);

  return {
    blinkDetected,
    isHovering,
    startHover,
    endHover,
    resetDetection,
  };
};
