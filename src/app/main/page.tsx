"use client";
import HeardCard from "@/components/main/HeardCard";
import MessageInput from "@/components/main/MessageInput";
import SuggestedResponses from "@/components/main/SuggestedResponses";
import TelegramModal from "@/components/main/TelegramModal";
import VirtualKeyboard from "@/components/main/VirtualKeyboard";
import Header from "@/components/ui/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useMessageComposer } from "@/hooks/main/useMessageComposer";
import { useState, useRef, useEffect } from "react";
import { useFaceMesh } from "@/hooks/useFaceMesh";
import GazeCursor from "@/components/gaze/GazeCursor";

export default function MainPage() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Initialize Face Mesh
  useFaceMesh(videoRef);

  // Start Webcam
  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
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

  const {
    message,
    appendChar,
    addSpace,
    backspace,
    clearMessage,
    selectSuggestion,
    selectedSuggestionIndex,
  } = useMessageComposer();

  const [isTelegramOpen, setIsTelegramOpen] = useState(false);

  const suggestions = [
    t.main.suggestions.option1,
    t.main.suggestions.option2,
    t.main.suggestions.option3,
    t.main.suggestions.option4,
  ];

  const handleSend = () => {
    if (message) {
      clearMessage();
    }
  };

  const handleTelegramClick = () => {
    if (message) {
      setIsTelegramOpen(true);
    }
  };

  const handleTelegramSend = () => {
    clearMessage();
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <GazeCursor />
      {/* Hidden Video for Tracking */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="fixed top-0 left-0 w-1 h-1 opacity-0 pointer-events-none"
      />
      
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 py-8 pb-20">
        <div className="w-full max-w-[700px] flex flex-col gap-6">
          <h1 className="text-[24px] md:text-[28px] font-medium text-[#202020] text-center tracking-[-1.12px] leading-tight whitespace-pre-line">
            {t.main.title}
          </h1>

          <HeardCard
            texts={{
              label: t.main.heardCard.label,
              listening: t.main.heardCard.listening,
              defaultText: t.main.heardCard.defaultText,
            }}
            isListening={false}
          />

          <MessageInput
            message={message}
            placeholder={t.main.messageInput.placeholder}
            onSpeakClick={handleSend}
            onTelegramClick={handleTelegramClick}
          />

          <SuggestedResponses
            responses={suggestions}
            selectedIndex={selectedSuggestionIndex}
            onSelect={selectSuggestion}
          />

          <p className="text-[14px] text-[#94a3b8] text-center tracking-[-0.56px]">
            {t.main.keyboard.instruction}
          </p>

          <VirtualKeyboard
            onKeyPress={appendChar}
            onSpace={addSpace}
            onBackspace={backspace}
            onClear={clearMessage}
            texts={{
              space: t.main.keyboard.space,
              clearMessage: t.main.keyboard.clearMessage,
            }}
          />
        </div>
      </main>

      <TelegramModal
        isOpen={isTelegramOpen}
        message={message}
        onClose={() => setIsTelegramOpen(false)}
        onSend={handleTelegramSend}
        texts={{
          title: t.main.telegram.title,
          subtitle: t.main.telegram.subtitle,
          cancel: t.main.telegram.cancel,
          sent: t.main.telegram.sent,
          toastMessage: t.main.telegram.toastMessage,
          contacts: t.main.telegram.contacts,
        }}
      />
    </div>
  );
}
