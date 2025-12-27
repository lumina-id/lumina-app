"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useFaceMesh } from "../hooks/useFaceMesh";
import GazeCursor from "./gaze/GazeCursor";
import { useGaze } from "../context/GazeContext";

export default function GetReady() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const { isFaceDetected, faceCenter } = useGaze();
  
  // Initialize Face Mesh Hook
  useFaceMesh(videoRef);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setHasPermission(false);
      }
    };

    startWebcam();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="bg-white relative w-full min-h-screen flex flex-col items-center pb-20">
      <GazeCursor />
      {/* Header */}
      <div className="w-full border-b border-[#ddd] px-4 md:px-[100px] py-[19px] flex justify-center">
        <div className="w-full max-w-[1240px] flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex gap-[8px] items-center">
            <div className="relative w-[48px] h-[48px]">
              <Image
                src="/assets/lumina-icon.png"
                alt="Lumina Icon"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[28px] font-medium text-black tracking-[-1.12px] leading-none">
              Lumina
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex gap-[8px] items-center">
            {/* Language Selector */}
            <div className="bg-[#f8fafc] border border-[#e2e8f0] flex gap-[8px] items-center px-[8px] py-[6px] rounded-[12px]">
              <div className="relative w-[20px] h-[20px]">
                <Image
                  src="/assets/language-icon.png"
                  alt="Language"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="bg-white px-[8px] py-[4px] rounded-[8px] shadow-sm">
                <span className="text-[16px] font-medium text-black tracking-[-0.8px] leading-none">
                  EN
                </span>
              </div>
              <span className="text-[16px] font-medium text-[#777] tracking-[-0.8px] leading-none px-[4px]">
                ID
              </span>
            </div>

            {/* Logout Button */}
            <button className="border border-[#ddd] px-[16px] py-[10px] rounded-[12px] text-[16px] text-black tracking-[-0.8px] leading-none hover:bg-gray-50 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center mt-[20px] w-full max-w-[653px] px-4">
        {/* Progress Bar */}
        <div className="w-[400px] flex gap-[8px] h-[6px] mb-[20px]">
          <div className="bg-[#cbd5e1] flex-1 rounded-full h-full" />
          <div className="bg-[#cbd5e1] flex-1 rounded-full h-full" />
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-col items-center gap-[10px] mb-[20px] text-center">
          <h1 className="text-[#202020] text-[24px] font-medium tracking-[-1.28px] leading-tight">
            Let’s Get Ready to Communicate
          </h1>
          <p className="text-[#999] text-[16px] tracking-[-0.72px] leading-none">
            This will only take a moment
          </p>
        </div>

        {/* Camera Preview Section */}
        <div className="w-full flex flex-col gap-[16px] items-center">
          <div className="relative w-[650px] h-[400px] rounded-[24px] overflow-hidden border border-[#cbd5e1] shadow-lg bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform scale-x-[-1]"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

            {/* Face Detected UI */}
            {isFaceDetected && (
              <>
                {/* Green Bounding Box */}
                <div 
                  className="absolute w-[200px] h-[200px] border-[3px] border-[#22c55e] rounded-[24px] shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-100 ease-out"
                  style={{
                    left: `${faceCenter.x * 100}%`,
                    top: `${faceCenter.y * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Face Detected Badge */}
                  <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 bg-[#22c55e] px-[12px] py-[4px] rounded-full shadow-md">
                    <span className="text-white text-[12px] font-medium whitespace-nowrap">
                      Face detected
                    </span>
                  </div>
                </div>
              </>
            )}

            <p className="absolute bottom-[20px] left-1/2 -translate-x-1/2 text-white text-[14px] font-medium tracking-[-0.64px]">
              Camera preview
            </p>
          </div>

          {isFaceDetected ? (
            <div className="flex items-center gap-2">
              <span className="text-[#22c55e] text-[18px]">✓</span>
              <p className="text-[#22c55e] text-[16px] tracking-[-0.72px] text-center font-medium">
                Your’re in the right position!
              </p>
            </div>
          ) : (
            <p className="text-[#999] text-[16px] tracking-[-0.72px] text-center">
              Adjust your position until your face is detected
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
