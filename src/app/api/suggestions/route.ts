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
                ? `You are an assistant for a person with speech difficulties (AAC user).
The text below is what a CAREGIVER or FRIEND said TO the user: "${context}".
Generate 4 natural, short first-person responses for the user to reply back.
- Responses should express the User's NEEDS, WANTS, or FEELINGS.
- Do NOT offer help. The user is usually the one RECEIVING help.
- Keep it simple, direct, and polite.

Examples:
Input (Caregiver): "What do you want to eat?"
Output (User): ["I want fried rice", "Anything is fine", "I am not hungry", "Maybe some soup?"]

Input (Caregiver): "Can I help you with something?"
Output (User): ["I am thirsty", "I need to go to the bathroom", "No, I am fine", "I want to sleep"]

Task:
Input (Caregiver): "${context}"
Output ONLY a JSON array.
NO explanation. JUST the JSON.`
                : `Anda adalah asisten untuk pengguna dengan keterbatasan bicara (pengguna AAC).
Teks di bawah adalah apa yang dikatakan PERAWAT atau TEMAN kepada pengguna: "${context}".
Buatkan 4 jawaban singkat sudut pandang orang pertama ("Saya") untuk pengguna menjawab balik.
- Jawaban harus mengungkapkan KEBUTUHAN, KEINGINAN, atau PERASAAN pengguna.
- JANGAN menawarkan bantuan. Pengguna biasanya adalah yang MENERIMA bantuan.
- Gunakan bahasa percakapan sehari-hari yang wajar.

Contoh:
Input (Perawat): "Kamu mau makan apa?"
Output (Pengguna): ["Mau nasi goreng", "Apa saja boleh", "Saya tidak lapar", "Mungkin bakso?"]

Input (Perawat): "Ada yang bisa saya bantu?"
Output (Pengguna): ["Saya haus, minta minum", "Saya mau ke toilet", "Tidak ada, terima kasih", "Saya ingin istirahat"]

Tugas:
Input (Perawat): "${context}"
Output HANYA JSON array.
TANPA penjelasan. HANYA JSON.`;

        } else {
            // Typing Suggestion Logic: Suggest COMPLETIONS for what is being typed
            prompt = lang === "en"
                ? `You are an AAC sentence completion assistant.
The user is typing: "${context}".
Predict 4 likely ways to COMPLETE, CONTINUE, or EXPAND this sentence.
If the input is a keyword/short phrase, expand it into a full polite sentence.

Examples:
Input: "I want to"
Output: ["I want to eat", "I want to go home", "I want to sleep", "I want to drink"]

Input: "Can you"
Output: ["Can you help me?", "Can you repeat that?", "Can you open this?", "Can you come here?"]

Input: "Bathroom"
Output: ["I need to go to the bathroom", "Where is the bathroom?", "I need a shower", "I need to wash my hands"]

Input: "Listen Music"
Output: ["I want to listen to music right now", "Play some music please", "I love this song", "Turn up the volume"]

Task:
Input: "${context}"
Output ONLY a JSON array: ["completion 1", "completion 2", "completion 3", "completion 4"]
NO explanation. JUST the JSON.`
                : `Kamu adalah asisten pelengkap kalimat AAC.
Pengguna sedang mengetik: "${context}".
Prediksi 4 cara logis untuk MELENGKAPI, MELANJUTKAN, atau MENGEMBANGKAN kalimat ini.
Jika input berupa kata kunci, kembangkan menjadi kalimat lengkap yang sopan.

Contoh:
Input: "Saya ingin"
Output: ["Saya ingin makan", "Saya ingin pulang", "Saya ingin tidur", "Saya ingin minum"]

Input: "Bisa tolong"
Output: ["Bisa tolong bantu saya?", "Bisa tolong ulangi?", "Bisa tolong ambilkan itu?", "Bisa tolong jelaskan?"]

Input: "Kamar Mandi"
Output: ["Saya perlu ke kamar mandi", "Dimana kamar mandi?", "Saya mau mandi", "Saya mau cuci tangan"]

Input: "Dengar Musik"
Output: ["Saya ingin mendengarkan musik sekarang", "Tolong putar musik", "Saya suka lagu ini", "Keraskan suaranya"]

Tugas:
Input: "${context}"
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
