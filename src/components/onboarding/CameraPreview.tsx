"use client";
import { RefObject } from "react";

interface CameraPreviewProps {
  videoRef: RefObject<HTMLVideoElement>;
  faceDetected: boolean;
  permissionDenied: boolean;
  isLoading: boolean;
  texts: {
    faceDetected: string;
    cameraPreview: string;
    adjustPosition: string;
    rightPosition: string;
    permissionDenied: string;
    requestingPermission: string;
  };
}

export default function CameraPreview({
  videoRef,
  faceDetected,
  permissionDenied,
  isLoading,
  texts,
}: CameraPreviewProps) {
  return (
    <div className="w-full flex flex-col gap-[16px] items-center">
      <div className="relative w-full max-w-[650px] aspect-[650/400] rounded-[24px] overflow-hidden border border-[#cbd5e1] shadow-lg bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <p className="text-white text-[16px] tracking-[-0.72px]">
              {texts.requestingPermission}
            </p>
          </div>
        )}

        {permissionDenied && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10 p-8">
            <div className="bg-red-500/20 border border-red-500 rounded-[16px] p-6 max-w-[400px]">
              <p className="text-red-400 text-[16px] tracking-[-0.72px] text-center">
                {texts.permissionDenied}
              </p>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transform scale-x-[-1]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

        {faceDetected && !permissionDenied && (
          <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 border-[3px] border-[#22c55e] rounded-[24px] shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300">
            <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 bg-[#22c55e] px-[12px] py-[4px] rounded-full shadow-md">
              <span className="text-white text-[12px] font-medium whitespace-nowrap">
                {texts.faceDetected}
              </span>
            </div>
          </div>
        )}

        <p className="absolute bottom-[20px] left-1/2 -translate-x-1/2 text-white text-[14px] font-medium tracking-[-0.64px]">
          {texts.cameraPreview}
        </p>
      </div>

      {faceDetected && !permissionDenied ? (
        <div className="flex items-center gap-2">
          <span className="text-[#22c55e] text-[18px]">✓</span>
          <p className="text-[#22c55e] text-[16px] tracking-[-0.72px] text-center font-medium">
            {texts.rightPosition}
          </p>
        </div>
      ) : !permissionDenied && !isLoading ? (
        <p className="text-[#999] text-[16px] tracking-[-0.72px] text-center">
          {texts.adjustPosition}
        </p>
      ) : null}
    </div>
  );
}
