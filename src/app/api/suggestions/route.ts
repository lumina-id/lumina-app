import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { context } = await req.json();
        console.log("API Suggestions called with context:", context);

        if (!context) {
            return NextResponse.json({
                suggestions: ["Halo, apa kabar?", "Saya ingin bertanya.", "Bisa tolong bantu saya?", "Terima kasih."]
            });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;
        const model = process.env.OPENROUTER_MODEL || "google/gemini-flash-1.5";

        if (!apiKey) {
            console.error("Missing OpenRouter API Key");
            return NextResponse.json({ error: "OpenRouter API Key Missing" }, { status: 500 });
        }

        console.log("Calling OpenRouter with model:", model);
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
                "X-Title": "Lumina TTS App"
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: "user",
                        content: `Buat 4 kalimat pendek dalam Bahasa Indonesia menggunakan kata "${context}". Output HANYA JSON array seperti ini: ["kalimat 1", "kalimat 2", "kalimat 3", "kalimat 4"]. Jangan tulis apapun selain JSON.`
                    }
                ],
                max_tokens: 200,
                temperature: 0.7,
            })
        });

        const data = await response.json();
        console.log("OpenRouter Response:", JSON.stringify(data, null, 2));

        const content = data.choices?.[0]?.message?.content?.trim();
        console.log("Response Content:", content);

        let suggestions: string[] = [];

        if (content) {
            try {
                // Try to extract JSON from the response
                const jsonMatch = content.match(/\[.*\]/s);
                if (jsonMatch) {
                    const parsed = JSON.parse(jsonMatch[0]);
                    if (Array.isArray(parsed)) {
                        suggestions = parsed.slice(0, 4);
                    }
                }
            } catch {
                // If not valid JSON, try splitting by newlines
                suggestions = content.split('\n').filter((s: string) => s.trim().length > 0).map((s: string) => s.replace(/^\d+\.\s*/, '').trim());
            }
        }

        if (suggestions.length === 0) {
            console.log("No valid suggestions parsed, using defaults.");
            suggestions = ["Ya", "Tidak", "Terima kasih", "Bisa ulangi?"];
        }

        suggestions = suggestions.slice(0, 4);
        console.log("Final suggestions returning:", suggestions);
        return NextResponse.json({ suggestions });

    } catch (error: any) {
        console.error("Suggestion API Error:", error);
        return NextResponse.json({ error: "Failed to fetch suggestions" }, { status: 500 });
    }
}
