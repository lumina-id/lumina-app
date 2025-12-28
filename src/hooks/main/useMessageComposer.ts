"use client";
import { useCallback, useState } from "react";

interface UseMessageComposerReturn {
  message: string;
  setMessage: (message: string) => void;
  appendChar: (char: string) => void;
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
    setMessageState((prev) => prev + char);
    setSelectedSuggestionIndex(null);
  }, []);

  const addSpace = useCallback(() => {
    setMessageState((prev) => prev + " ");
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
    addSpace,
    backspace,
    clearMessage,
    selectSuggestion,
    selectedSuggestionIndex,
  };
};
