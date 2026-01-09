"use client";
import { useGazeHover } from "@/hooks/useGazeHover";
import { useRef, useEffect, useState } from "react";
import { useGaze } from "@/context/GazeContext";
import { Mic, Square } from "lucide-react";

interface MessageInputProps {
  message: string;
  placeholder: string;
  isActive?: boolean;
  onSpeakClick?: () => void;
  onTelegramClick?: () => void;
  onMicClick?: () => void;
  isListening?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function MessageInput({
  message,
  placeholder,
  onSpeakClick,
  onTelegramClick,
  onMicClick,
  isListening = false,
  isLoading = false,
  disabled = false,
}: MessageInputProps) {
  const hasMessage = message.length > 0;
  const { gazeX, gazeY } = useGaze();

  // Refs for gaze hover detection
  const speakRef = useRef<HTMLButtonElement>(null);
  const telegramRef = useRef<HTMLButtonElement>(null);
  const micRef = useRef<HTMLButtonElement>(null);

  const [isSpeakGazeHover, setIsSpeakGazeHover] = useState(false);
  const [isTelegramGazeHover, setIsTelegramGazeHover] = useState(false);
  const [isMicGazeHover, setIsMicGazeHover] = useState(false);

  const speakHoverStart = useRef<number | null>(null);
  const telegramHoverStart = useRef<number | null>(null);
  const micHoverStart = useRef<number | null>(null);

  const speakDwellTriggered = useRef(false);
  const telegramDwellTriggered = useRef(false);
  const micDwellTriggered = useRef(false);

  // Check gaze hover for speak button
  useEffect(() => {
    if (!speakRef.current || disabled) {
      setIsSpeakGazeHover(false);
      speakHoverStart.current = null;
      speakDwellTriggered.current = false;
      return;
    }

    const padding = 20;
    const rect = speakRef.current.getBoundingClientRect();
    const isOver =
      gazeX >= rect.left - padding &&
      gazeX <= rect.right + padding &&
      gazeY >= rect.top - padding &&
      gazeY <= rect.bottom + padding;

    if (isOver) {
      setIsSpeakGazeHover(true);
      if (speakHoverStart.current === null) {
        speakHoverStart.current = Date.now();
        speakDwellTriggered.current = false;
      } else {
        const elapsed = Date.now() - speakHoverStart.current;
        if (elapsed >= 1000 && !speakDwellTriggered.current && onSpeakClick) {
          speakDwellTriggered.current = true;
          onSpeakClick();
        }
      }
    } else {
      setIsSpeakGazeHover(false);
      speakHoverStart.current = null;
      speakDwellTriggered.current = false;
    }
  }, [gazeX, gazeY, onSpeakClick, disabled]);

  // Check gaze hover for telegram button
  useEffect(() => {
    if (!telegramRef.current || disabled) {
      setIsTelegramGazeHover(false);
      telegramHoverStart.current = null;
      telegramDwellTriggered.current = false;
      return;
    }

    const padding = 20;
    const rect = telegramRef.current.getBoundingClientRect();
    const isOver =
      gazeX >= rect.left - padding &&
      gazeX <= rect.right + padding &&
      gazeY >= rect.top - padding &&
      gazeY <= rect.bottom + padding;

    if (isOver) {
      setIsTelegramGazeHover(true);
      if (telegramHoverStart.current === null) {
        telegramHoverStart.current = Date.now();
        telegramDwellTriggered.current = false;
      } else {
        const elapsed = Date.now() - telegramHoverStart.current;
        if (elapsed >= 1000 && !telegramDwellTriggered.current && onTelegramClick) {
          telegramDwellTriggered.current = true;
          onTelegramClick();
        }
      }
    } else {
      setIsTelegramGazeHover(false);
      telegramHoverStart.current = null;
      telegramDwellTriggered.current = false;
    }
  }, [gazeX, gazeY, onTelegramClick, disabled]);

  // Check gaze hover for mic button
  useEffect(() => {
    if (!micRef.current || isLoading || disabled) {
      setIsMicGazeHover(false);
      micHoverStart.current = null;
      micDwellTriggered.current = false;
      return;
    }

    const padding = 20;
    const rect = micRef.current.getBoundingClientRect();
    const isOver =
      gazeX >= rect.left - padding &&
      gazeX <= rect.right + padding &&
      gazeY >= rect.top - padding &&
      gazeY <= rect.bottom + padding;

    if (isOver) {
      setIsMicGazeHover(true);
      if (micHoverStart.current === null) {
        micHoverStart.current = Date.now();
        micDwellTriggered.current = false;
      } else {
        const elapsed = Date.now() - micHoverStart.current;
        if (elapsed >= 1000 && !micDwellTriggered.current && onMicClick) {
          micDwellTriggered.current = true;
          onMicClick();
        }
      }
    } else {
      setIsMicGazeHover(false);
      micHoverStart.current = null;
      micDwellTriggered.current = false;
    }
  }, [gazeX, gazeY, onMicClick, isLoading, disabled]);

  return (
    <div className="w-full bg-white rounded-[20px] p-5 border border-[#e5e7eb] shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-h-[24px]">
          {hasMessage ? (
            <p className="text-[16px] text-[#111827] tracking-[-0.4px]">{message}</p>
          ) : (
            <p className="text-[16px] text-[#9ca3af] tracking-[-0.4px]">{placeholder}</p>
          )}
        </div>

        <div className="flex items-center gap-7">
          <button
            ref={micRef}
            onClick={isLoading ? undefined : onMicClick}
            disabled={isLoading}
            className={`w-[40px] h-[40px] flex items-center justify-center rounded-[10px] btn-hover-icon ${isMicGazeHover && !isLoading ? "scale-110 shadow-[0_4px_20px_rgba(11,31,183,0.5)]" : ""
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            style={{
              background: "linear-gradient(180deg, #354BF3 0%, #0B1FB7 100%)"
            }}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            {isListening ? (
              <Square color="white" size={20} fill="white" />
            ) : (
              <Mic color="white" size={20} />
            )}
          </button>

          <button
            ref={speakRef}
            onClick={onSpeakClick}
            className={`w-[40px] h-[40px] flex items-center justify-center rounded-[10px] btn-hover-icon ${isSpeakGazeHover ? "scale-110 shadow-[0_4px_20px_rgba(11,31,183,0.5)]" : ""
              }`}
            style={{
              background: "linear-gradient(180deg, #354BF3 0%, #0B1FB7 100%)"
            }}
            aria-label="Speak message"
          >
            <img
              src="/assets/Record voice over.svg"
              alt="Record voice"
              width={20}
              height={20}
            />
          </button>

          <button
            ref={telegramRef}
            onClick={onTelegramClick}
            className={`w-[40px] h-[40px] flex items-center justify-center rounded-[10px] btn-hover-icon ${isTelegramGazeHover ? "scale-110 shadow-[0_4px_20px_rgba(11,31,183,0.5)]" : ""
              }`}
            style={{
              background: "linear-gradient(180deg, #354BF3 0%, #0B1FB7 100%)"
            }}
            aria-label="Send via Telegram"
          >
            <img
              src="/assets/Vector.svg"
              alt="Send"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
}