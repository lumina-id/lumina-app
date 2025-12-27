"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface GazeContextType {
  gazeX: number;
  gazeY: number;
  setGaze: (x: number, y: number) => void;
  isCalibrated: boolean;
  setIsCalibrated: (status: boolean) => void;
  isFaceDetected: boolean;
  setIsFaceDetected: (status: boolean) => void;
  faceCenter: { x: number; y: number };
  setFaceCenter: (center: { x: number; y: number }) => void;
}

const GazeContext = createContext<GazeContextType | undefined>(undefined);

export const GazeProvider = ({ children }: { children: ReactNode }) => {
  const [gazeX, setGazeX] = useState(0);
  const [gazeY, setGazeY] = useState(0);
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [faceCenter, setFaceCenter] = useState({ x: 0.5, y: 0.5 });

  const setGaze = (x: number, y: number) => {
    setGazeX(x);
    setGazeY(y);
  };

  return (
    <GazeContext.Provider value={{ 
      gazeX, gazeY, setGaze, 
      isCalibrated, setIsCalibrated, 
      isFaceDetected, setIsFaceDetected,
      faceCenter, setFaceCenter
    }}>
      {children}
    </GazeContext.Provider>
  );
};

export const useGaze = () => {
  const context = useContext(GazeContext);
  if (!context) {
    throw new Error("useGaze must be used within a GazeProvider");
  }
  return context;
};
