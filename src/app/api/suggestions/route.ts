import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { context, lang, type } = await req.json();
        console.log("API Suggestions called with context:", context, "lang:", lang, "type:", type);

        // Default suggestions based on language
        if (!context) {
            return NextResponse.json({
                suggestions: lang === "en"
                    ? ["Hello, how are you?", "I want to ask something.", "Please help me.", "Thank you."]
                    : ["Halo, apa kabar?", "Saya ingin bertanya.", "Bisa tolong bantu saya?", "Terima kasih."]
            });
        }

        const apiKey = process.env.AZURE_OPENAI_API_KEY;
        const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-5-nano";
        const apiVersion = "2025-01-01-preview";

        if (!apiKey || !endpoint) {
            console.error("Missing Azure OpenAI Config");
            return NextResponse.json({ error: "Azure OpenAI Config Missing" }, { status: 500 });
        }

        let prompt = "";

        if (type === 'stt') {
            // STT Recommendation Logic: Suggest RESPONSES to what was heard
            prompt = lang === "en"
                ? `You are an AAC (Augmentative and Alternative Communication) assistant.
The user is listening to someone who just said: "${context}".
Generate 4 natural, first-person SHORT responses that the AAC user might want to say back.
- Responses should be relevant to the input question or statement.
- Keep them short, conversational, and polite.
- Mix of "Yes/No" with context, clarifying questions, or direct answers.

Output ONLY a JSON array: ["Response 1", "Response 2", "Response 3", "Response 4"]
NO explanation. JUST the JSON.`
                : `Kamu adalah asisten komunikasi AAC (Augmentative and Alternative Communication).
Pengguna sedang mendengarkan seseorang yang baru saja berkata: "${context}".
Buatkan 4 respon BALASAN pendek yang wajar menggunakan sudut pandang orang pertama ("Saya").
- Respon harus relevan dengan pertanyaan atau pernyataan yang didengar.
- Gunakan bahasa percakapan yang sopan dan natural.
- Campuran antara jawaban langsung, pertanyaan balik, atau pernyataan kondisi.

Output HANYA JSON array: ["Respon 1", "Respon 2", "Respon 3", "Respon 4"]
TANPA penjelasan. HANYA JSON.`;

        } else {
            // Typing Suggestion Logic: Suggest COMPLETIONS for what is being typed
            prompt = lang === "en"
                ? `You are an AAC sentence completion assistant.
The user is typing: "${context}".
Predict 4 likely ways to COMPLETE or CONTINUE this sentence.
- Suggestions should clearly follow the input text.
- Short, useful everyday phrases.

Output ONLY a JSON array: ["completion 1", "completion 2", "completion 3", "completion 4"]
NO explanation. JUST the JSON.`
                : `Kamu adalah asisten pelengkap kalimat AAC.
Pengguna sedang mengetik: "${context}".
Prediksi 4 cara logis untuk MELENGKAPI atau MELANJUTKAN kalimat ini.
- Saran harus nyambung dengan teks yang sedang diketik.
- Frasa sehari-hari yang singkat dan berguna.

Output HANYA JSON array: ["lengkapan 1", "lengkapan 2", "lengkapan 3", "lengkapan 4"]
TANPA penjelasan. HANYA JSON.`;
        }

        const url = `${endpoint}openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`;
        console.log("Calling Azure OpenAI:", url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_completion_tokens: 150,
                // Disable reasoning for faster response
                reasoning_effort: "none",
            })
        });

        const data = await response.json();
        console.log("Azure Response:", JSON.stringify(data, null, 2));

        if (data.error) {
            console.error("Azure Error:", data.error);
            return NextResponse.json({ error: data.error.message }, { status: 500 });
        }

        const content = data.choices?.[0]?.message?.content?.trim();
        console.log("Response Content:", content);

        let suggestions: string[] = [];

        if (content) {
            try {
                // Try to extract JSON from the response
                const jsonMatch = content.match(/\[[\s\S]*\]/);
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
            suggestions = lang === "en"
                ? ["Yes", "No", "Thank you", "Please repeat?"]
                : ["Ya", "Tidak", "Terima kasih", "Bisa ulangi?"];
        }

        suggestions = suggestions.slice(0, 4);
        console.log("Final suggestions returning:", suggestions);
        return NextResponse.json({ suggestions });

    } catch (error: any) {
        console.error("Suggestion API Error:", error);
        return NextResponse.json({ error: "Failed to fetch suggestions" }, { status: 500 });
    }
}
