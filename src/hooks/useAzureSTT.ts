"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

interface UseAzureSTTProps {
    language?: string;
    onFinalResult?: (text: string) => void;
}

export function useAzureSTT({ language = "id-ID", onFinalResult }: UseAzureSTTProps = {}) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState(""); // Final text accumulated
    const [interimTranscript, setInterimTranscript] = useState(""); // Real-time text
    const [error, setError] = useState<string | null>(null);

    const recognizerRef = useRef<SpeechSDK.SpeechRecognizer | null>(null);

    const stopListening = useCallback(() => {
        if (recognizerRef.current) {
            recognizerRef.current.stopContinuousRecognitionAsync(
                () => {
                    setIsListening(false);
                    recognizerRef.current?.close();
                    recognizerRef.current = null;
                },
                (err) => {
                    console.error("Error stopping recognition:", err);
                    setIsListening(false);
                }
            );
        } else {
            setIsListening(false);
        }
    }, []);

    const startListening = useCallback(async () => {
        setError(null);
        setInterimTranscript("");

        try {
            // 1. Get Token (with cache-busting)
            const response = await fetch(`/api/speech-token?t=${Date.now()}`, {
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache' }
            });
            const data = await response.json();
            console.log("[STT] Token response:", { region: data.region, hasToken: !!data.token });

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch speech token");
            }

            const { token, region, host, endpoint } = data;

            // 2. Config Speech SDK
            let speechConfig: SpeechSDK.SpeechConfig;

            // Prioritize Region if available (more stable for WebSockets)
            // Even if using a Foundry key, the resource region's standard endpoint handles STT traffic best.
            if (region) {
                speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(token, region);
            } else if (endpoint) {
                // Fallback to custom endpoint if no region provided
                speechConfig = SpeechSDK.SpeechConfig.fromHost(new URL(endpoint));
                speechConfig.authorizationToken = token;
            } else {
                throw new Error("No region or endpoint configured");
            }

            speechConfig.speechRecognitionLanguage = language;

            const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

            // 3. Create Recognizer
            const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
            recognizerRef.current = recognizer;

            // 4. Event Handlers
            recognizer.recognizing = (s, e) => {
                console.log("[STT] Recognizing:", e.result.text);
                setInterimTranscript(e.result.text);
            };

            recognizer.recognized = (s, e) => {
                console.log("[STT] Recognized event, reason:", e.result.reason);
                if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
                    const finalText = e.result.text;
                    console.log("[STT] Final text:", finalText);
                    setTranscript((prev) => prev + (prev ? " " : "") + finalText);

                    if (onFinalResult) {
                        onFinalResult(finalText);
                    }
                }
            };

            recognizer.canceled = (s, e) => {
                console.error("Canceled:", e.errorDetails);
                if (e.reason === SpeechSDK.CancellationReason.Error) {
                    setError(e.errorDetails);
                }
                stopListening();
            };

            recognizer.sessionStopped = (s, e) => {
                stopListening();
            };

            // 5. Start
            console.log("[STT] Starting continuous recognition...");
            recognizer.startContinuousRecognitionAsync(
                () => {
                    console.log("[STT] Recognition started successfully");
                    setIsListening(true);
                },
                (err) => {
                    console.error("Error starting recognition:", err);
                    setError(err);
                }
            );
        } catch (err: any) {
            console.error("STT Error:", err);
            setError(err.message);
            setIsListening(false);
        }
    }, [language, onFinalResult, stopListening]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (recognizerRef.current) {
                recognizerRef.current.stopContinuousRecognitionAsync(() => {
                    recognizerRef.current?.close();
                });
            }
        };
    }, []);

    return {
        isListening,
        startListening,
        stopListening,
        transcript,
        interimTranscript,
        error,
        resetTranscript: () => setTranscript(""),
    };
}
