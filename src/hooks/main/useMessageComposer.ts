"use client";
import { useCallback, useState } from "react";

interface UseMessageComposerReturn {
  message: string;
  setMessage: (message: string) => void;
  appendChar: (char: string) => void;
  appendText: (text: string) => void;
  addSpace: () => void;
  backspace: () => void;
  clearMessage: () => void;
  selectSuggestion: (suggestion: string, index: number) => void;
  selectedSuggestionIndex: number | null;
}

export const useMessageComposer = (): UseMessageComposerReturn => {
  const [message, setMessageState] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number | null>(null);

  const setMessage = useCallback((newMessage: string) => {
    setMessageState(newMessage);
    setSelectedSuggestionIndex(null);
  }, []);

  const appendChar = useCallback((char: string) => {
    setMessageState((prev) => {
      // If empty or previous char is space/punctuation, this is start of word - capitalize
      const isStartOfWord = prev.length === 0 || /[\s.,!?]$/.test(prev);
      const processedChar = isStartOfWord ? char.toUpperCase() : char.toLowerCase();
      return prev + processedChar;
    });
    setSelectedSuggestionIndex(null);
  }, []);

  const addSpace = useCallback(() => {
    setMessageState((prev) => prev + " ");
    setSelectedSuggestionIndex(null);
  }, []);

  const appendText = useCallback((text: string) => {
    setMessageState((prev) => {
      // Auto-add space if needed
      const needsSpace = prev.length > 0 && !/[\s]$/.test(prev);
      return prev + (needsSpace ? " " : "") + text;
    });
    setSelectedSuggestionIndex(null);
  }, []);

  const backspace = useCallback(() => {
    setMessageState((prev) => prev.slice(0, -1));
    setSelectedSuggestionIndex(null);
  }, []);

  const clearMessage = useCallback(() => {
    setMessageState("");
    setSelectedSuggestionIndex(null);
  }, []);

  const selectSuggestion = useCallback((suggestion: string, index: number) => {
    setMessageState(suggestion);
    setSelectedSuggestionIndex(index);
  }, []);

  return {
    message,
    setMessage,
    appendChar,
    appendText,
    addSpace,
    backspace,
    clearMessage,
    selectSuggestion,
    selectedSuggestionIndex,
  };
};
