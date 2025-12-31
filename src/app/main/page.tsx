"use client";
import GazeCursor from "@/components/gaze/GazeCursor";
import HeardCard from "@/components/main/HeardCard";
import MessageInput from "@/components/main/MessageInput";
import SuggestedResponses from "@/components/main/SuggestedResponses";
import TelegramModal from "@/components/main/TelegramModal";
import VirtualKeyboard from "@/components/main/VirtualKeyboard";
import Header from "@/components/ui/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useMessageComposer } from "@/hooks/main/useMessageComposer";
import { useFaceMesh } from "@/hooks/useFaceMesh";
import { useEffect, useRef, useState } from "react";

export default function MainPage() {
  const { t, locale } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize Face Mesh
  useFaceMesh(videoRef);

  // Start Webcam
  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsCooldown, setTtsCooldown] = useState(false);
  const lastFetchedContext = useRef<string>("");

  // Debounce fetching suggestions - 5 seconds after user stops typing
  useEffect(() => {
    // Don't fetch if context hasn't changed
    if (message === lastFetchedContext.current) return;

    const timer = setTimeout(() => {
      if (message && message !== lastFetchedContext.current) {
        fetchSuggestions(message);
        lastFetchedContext.current = message;
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timer);
  }, [message]);

  const fetchSuggestions = async (context: string) => {
    console.log("Frontend fetching suggestions for:", context);
    setIsLoadingSuggestions(true);
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, lang: locale }),
      });
      const data = await res.json();
      if (data.suggestions && Array.isArray(data.suggestions)) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error("Failed to fetch suggestions", error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Browser-side audio cache
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

  const handleSpeak = async () => {
    if (!message || ttsCooldown) return;

    try {
      setIsSpeaking(true);
      setTtsCooldown(true);
      setTimeout(() => setTtsCooldown(false), 1000);

      // Check browser cache first
      const cacheKey = `${message}_${locale}`;
      if (audioCache.current.has(cacheKey)) {
        console.log("Playing from browser cache");
        const cachedAudio = audioCache.current.get(cacheKey)!;
        cachedAudio.currentTime = 0;
        cachedAudio.play();
        cachedAudio.onended = () => setIsSpeaking(false);
        return;
      }

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message, lang: locale }),
      });
      const data = await res.json();

      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl);

        // Store in browser cache
        audioCache.current.set(cacheKey, audio);

        audio.play();
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => setIsSpeaking(false);
      } else {
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error("TTS Error", error);
      setIsSpeaking(false);
    }
  };

  const handleSend = () => {
    handleSpeak();
  };

  const handleTelegramClick = () => {
    if (message) {
      setIsTelegramOpen(true);
    }
  };

  const handleTelegramSend = () => {
    clearMessage();
  };

  const handleLogout = () => {
    // Cleanup if needed
    clearMessage();
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    // Redirect to login (root)
    window.location.href = "/";
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

      <Header onLogout={handleLogout} />

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
            responses={
              suggestions.length > 0
                ? suggestions
                : [
                    t.main.suggestions.option1,
                    t.main.suggestions.option2,
                    t.main.suggestions.option3,
                    t.main.suggestions.option4,
                  ]
            }
            selectedIndex={selectedSuggestionIndex}
            onSelect={selectSuggestion}
            isLoading={isLoadingSuggestions}
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
