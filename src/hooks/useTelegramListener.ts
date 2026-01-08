"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface TelegramMessage {
    text: string;
    sender: string;
    original_sender_id: string;
    date: number;
}

interface UseTelegramListenerProps {
    onMessage?: (message: TelegramMessage) => void;
    pollInterval?: number; // ms
}

export function useTelegramListener({ onMessage, pollInterval = 3000 }: UseTelegramListenerProps = {}) {
    const [latestMessage, setLatestMessage] = useState<TelegramMessage | null>(null);
    const lastUpdateIdRef = useRef<number>(0);
    const isPollingRef = useRef(false);

    const checkForUpdates = useCallback(async () => {
        if (isPollingRef.current) return;
        isPollingRef.current = true;

        try {
            // We ask for updates starting from lastUpdateId + 1 to avoid dupes
            // Telegram API handles offset: update_id >= offset are returned.
            // So if we processed update N, we ask for N+1.
            const offset = lastUpdateIdRef.current > 0 ? lastUpdateIdRef.current + 1 : 0;

            const res = await fetch(`/api/telegram?offset=${offset}`);
            const data = await res.json();

            if (data.success && data.updates && data.updates.length > 0) {
                // Determine the max update_id from this batch
                const updates = data.updates;
                let maxId = lastUpdateIdRef.current;

                // Process each update
                updates.forEach((u: any) => {
                    if (u.update_id > maxId) {
                        maxId = u.update_id;
                    }

                    // We only want to trigger onMessage for *new* messages if this is a live session
                    // OR if we want to show missed messages, we can do that.
                    // For now, let's trigger for the newest one in the batch or all of them.
                    // Simpler: trigger for the LAST one in the batch to display, 
                    // or queue them. For this specific "HeardCard" use case, showing the latest is usually fine.

                    // Let's pass the latest one to the state
                    const msg = u.message as TelegramMessage;
                    setLatestMessage(msg);

                    if (onMessage) {
                        onMessage(msg);
                    }
                });

                lastUpdateIdRef.current = maxId;
            }
        } catch (error) {
            console.error("Polling error:", error);
        } finally {
            isPollingRef.current = false;
        }
    }, [onMessage]);

    useEffect(() => {
        const timer = setInterval(() => {
            checkForUpdates();
        }, pollInterval);

        // check immediately on mount
        checkForUpdates();

        return () => clearInterval(timer);
    }, [pollInterval, checkForUpdates]);

    return {
        latestMessage
    };
}
