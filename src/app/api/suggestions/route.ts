import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { context, lang } = await req.json();
        console.log("API Suggestions called with context:", context, "lang:", lang);

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

        // Different prompts based on language
        const prompt = lang === "en"
            ? `You are an AAC sentence suggestion system.
Generate 4 short English sentences using the word "${context}".
- First-person perspective ("I")
- Short, clear, easy to understand
- Express a need, request, or condition

Output ONLY a JSON array: ["sentence 1", "sentence 2", "sentence 3", "sentence 4"]
NO explanation. NO reasoning. JUST the JSON.`
            : `Kamu adalah sistem saran kalimat AAC.
Buat 4 kalimat pendek Bahasa Indonesia menggunakan kata "${context}".
- Sudut pandang orang pertama ("Saya")
- Singkat, jelas, mudah dipahami
- Mengungkapkan kebutuhan, permintaan, atau kondisi

Output HANYA JSON array: ["kalimat 1", "kalimat 2", "kalimat 3", "kalimat 4"]
TANPA penjelasan. TANPA reasoning. HANYA JSON.`;

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
