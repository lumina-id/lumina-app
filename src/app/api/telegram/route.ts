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

// Helper to find contact name by Chat ID
function getContactNameByChatId(chatId: string | number): string {
    const cid = String(chatId);
    return Object.keys(CONTACT_CHAT_IDS).find(key => CONTACT_CHAT_IDS[key] === cid) || "Unknown";
}

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

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const offset = searchParams.get('offset');

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        if (!botToken) {
            return NextResponse.json({ error: "Telegram Bot Token Missing" }, { status: 500 });
        }

        const telegramUrl = `https://api.telegram.org/bot${botToken}/getUpdates?timeout=0${offset ? `&offset=${offset}` : ''}`;

        const response = await fetch(telegramUrl);
        const data = await response.json();

        if (!data.ok) {
            return NextResponse.json({ error: data.description }, { status: 400 });
        }

        // Process updates to find messages from known contacts
        const updates = data.result
            .filter((u: any) => u.message && u.message.text) // Only text messages
            .map((u: any) => {
                const contactName = getContactNameByChatId(u.message.chat.id);
                return {
                    update_id: u.update_id,
                    message: {
                        text: u.message.text,
                        sender: contactName,
                        original_sender_id: u.message.chat.id,
                        date: u.message.date
                    }
                };
            })
        // Filter out messages from unknown contacts if you want strict privacy, 
        // OR keep them as "Unknown". For now, let's keep all to debug easily.
        // .filter((u: any) => u.message.sender !== "Unknown");

        return NextResponse.json({ success: true, updates });

    } catch (error: any) {
        console.error("Telegram polling error:", error);
        return NextResponse.json({ error: "Failed to fetch updates" }, { status: 500 });
    }
}
