"use client";
import { useGaze } from "../../context/GazeContext";

export default function GazeCursor() {
  const { gazeX, gazeY } = useGaze();

  return (
    <div
      style={{
        position: "fixed",
        left: gazeX,
        top: gazeY,
        width: "20px",
        height: "20px",
        backgroundColor: "#00ED57",
        borderRadius: "50%",
        pointerEvents: "none", // Important: lets clicks pass through
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        border: "2px solid white",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)"
      }}
    />
  );
}
