import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { RowDataPacket } from "mysql2";

// Voice configurations for each language
const VOICE_CONFIG = {
    id: {
        name: "id-ID-ArdiNeural",  // Indonesian male - clear and natural
        lang: "id-ID",
        style: "friendly",
    },
    en: {
        name: "en-US-GuyNeural",   // English male - clear and professional
        lang: "en-US",
        style: "friendly",
    }
};

// Simple language detection based on common words
function detectLanguage(text: string): "id" | "en" {
    const indonesianWords = ["saya", "aku", "ini", "itu", "dan", "atau", "yang", "untuk", "dengan", "dari", "ke", "pada", "ada", "tidak", "bisa", "mau", "ingin", "tolong", "terima", "kasih", "selamat", "pagi", "siang", "sore", "malam", "apa", "siapa", "dimana", "kapan", "mengapa", "bagaimana"];
    const textLower = text.toLowerCase();

    let idCount = 0;
    for (const word of indonesianWords) {
        if (textLower.includes(word)) {
            idCount++;
        }
    }

    // If 2 or more Indonesian words found, treat as Indonesian
    return idCount >= 2 ? "id" : "en";
}

export async function POST(req: NextRequest) {
    try {
        const { text, lang } = await req.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        // Auto-detect language if not provided
        const detectedLang = lang || detectLanguage(text);
        const voiceConfig = VOICE_CONFIG[detectedLang as keyof typeof VOICE_CONFIG] || VOICE_CONFIG.id;

        console.log(`TTS Request: "${text.substring(0, 50)}..." | Lang: ${detectedLang} | Voice: ${voiceConfig.name}`);

        // Hash includes language for separate caching
        const hash = crypto.createHash("sha256").update(text + detectedLang).digest("hex");
        const audioFileName = `${hash}.mp3`;
        const audioUrl = `/audio/${audioFileName}`;
        const audioFilePath = path.join(process.cwd(), "public", "audio", audioFileName);

        // Check Cache
        const [rows] = await pool.query<RowDataPacket[]>(
            "SELECT audio_path FROM audio_cache WHERE text_hash = ?",
            [hash]
        );

        if (rows.length > 0) {
            if (fs.existsSync(audioFilePath)) {
                console.log("Serving from cache:", audioUrl);
                return NextResponse.json({
                    audioUrl,
                    cached: true,
                    lang: detectedLang
                });
            } else {
                console.warn("Cache hit but file missing, re-synthesizing...");
                await pool.query("DELETE FROM audio_cache WHERE text_hash = ?", [hash]);
            }
        }

        // Synthesize using Azure with SSML for better quality
        const speechConfig = sdk.SpeechConfig.fromSubscription(
            process.env.AZURE_SPEECH_KEY || "",
            process.env.AZURE_SPEECH_REGION || "southeastasia"
        );

        speechConfig.speechSynthesisVoiceName = voiceConfig.name;
        speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

        const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFilePath);
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        // Use SSML for better prosody control
        const ssml = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${voiceConfig.lang}">
            <voice name="${voiceConfig.name}">
                <mstts:express-as style="${voiceConfig.style}">
                    <prosody rate="0.95" pitch="+0%">
                        ${text}
                    </prosody>
                </mstts:express-as>
            </voice>
        </speak>`;

        return new Promise((resolve) => {
            synthesizer.speakSsmlAsync(
                ssml,
                async (result) => {
                    if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                        console.log("Synthesis finished.");
                        synthesizer.close();

                        // Save to Cache
                        await pool.query(
                            "INSERT INTO audio_cache (text_hash, text_content, audio_path) VALUES (?, ?, ?)",
                            [hash, text, audioUrl]
                        );

                        resolve(NextResponse.json({
                            audioUrl,
                            cached: false,
                            lang: detectedLang
                        }));
                    } else {
                        console.error("Speech synthesis canceled, " + result.errorDetails);
                        synthesizer.close();
                        resolve(
                            NextResponse.json({ error: "TTS Failed: " + result.errorDetails }, { status: 500 })
                        );
                    }
                },
                (err) => {
                    console.error("err - " + err);
                    synthesizer.close();
                    resolve(NextResponse.json({ error: "TTS Error" }, { status: 500 }));
                }
            );
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
