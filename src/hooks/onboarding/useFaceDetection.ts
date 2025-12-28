"use client";
import { useCallback, useEffect, useState } from "react";

interface UseFaceDetectionReturn {
  faceDetected: boolean;
  resetDetection: () => void;
}

export const useFaceDetection = (hasPermission: boolean): UseFaceDetectionReturn => {
  const [faceDetected, setFaceDetected] = useState(false);

  const resetDetection = useCallback(() => {
    setFaceDetected(false);
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      setFaceDetected(false);
      return;
    }

    const timer = setTimeout(() => {
      setFaceDetected(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [hasPermission]);

  return {
    faceDetected,
    resetDetection,
  };
};
