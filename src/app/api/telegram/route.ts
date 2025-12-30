import { NextRequest, NextResponse } from "next/server";

// ============================================
// TELEGRAM CHAT IDs - EDIT THESE VALUES
// ============================================
// To get a chat ID:
// 1. Send a message to your bot on Telegram
// 2. Visit: https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
// 3. Find the chat.id in the response
// ============================================
const CONTACT_CHAT_IDS: Record<string, string> = {
    "anita": process.env.TELEGRAM_CHAT_ID_ANITA || "",      // First contact (default)
    "mom": process.env.TELEGRAM_CHAT_ID_MOM || "",          // Second contact
    "nurseSarah": process.env.TELEGRAM_CHAT_ID_NURSE || "", // Third contact
};

export async function POST(req: NextRequest) {
    try {
        const { message, contactId } = await req.json();
        console.log("Telegram API called with:", { message, contactId });

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        if (!botToken) {
            console.error("Missing TELEGRAM_BOT_TOKEN");
            return NextResponse.json({ error: "Telegram Bot Token Missing" }, { status: 500 });
        }

        // Get chat ID for the selected contact, default to first contact (anita)
        const chatId = CONTACT_CHAT_IDS[contactId || "anita"];
        if (!chatId) {
            console.error("No chat ID configured for contact:", contactId);
            return NextResponse.json({ error: "Chat ID not configured for this contact" }, { status: 400 });
        }

        console.log("Sending to Telegram chat:", chatId);

        // Send message using Telegram Bot API
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
            }),
        });

        const data = await response.json();
        console.log("Telegram Response:", data);

        if (!data.ok) {
            console.error("Telegram API Error:", data.description);
            return NextResponse.json({ error: data.description }, { status: 400 });
        }

        return NextResponse.json({ success: true, messageId: data.result.message_id });

    } catch (error: any) {
        console.error("Telegram API Error:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
