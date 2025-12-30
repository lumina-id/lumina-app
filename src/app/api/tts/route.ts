import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { RowDataPacket } from "mysql2";

export async function POST(req: NextRequest) {
    try {
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        // Hash the text to create a unique identifier
        const hash = crypto.createHash("sha256").update(text).digest("hex");
        const audioFileName = `${hash}.mp3`;
        const audioUrl = `/audio/${audioFileName}`;
        const audioFilePath = path.join(process.cwd(), "public", "audio", audioFileName);

        // Check Cache
        const [rows] = await pool.query<RowDataPacket[]>(
            "SELECT audio_path FROM audio_cache WHERE text_hash = ?",
            [hash]
        );

        if (rows.length > 0) {
            // Check if file actually exists
            if (fs.existsSync(audioFilePath)) {
                console.log("Serving from cache:", audioUrl);
                return NextResponse.json({ audioUrl });
            } else {
                // File missing, remove from specific cache record and re-synthesize
                console.warn("Cache hit but file missing, re-synthesizing...");
                await pool.query("DELETE FROM audio_cache WHERE text_hash = ?", [hash]);
            }
        }

        // Synthesize using Azure
        const speechConfig = sdk.SpeechConfig.fromSubscription(
            process.env.AZURE_SPEECH_KEY || "",
            process.env.AZURE_SPEECH_REGION || "southeastasia"
        );

        // Set voice directly to Indonesian Girl (Gadis) or similar high quality neural voice
        speechConfig.speechSynthesisVoiceName = "id-ID-GadisNeural";

        const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFilePath);
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        return new Promise((resolve) => {
            synthesizer.speakTextAsync(
                text,
                async (result) => {
                    if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                        console.log("Synthesis finished.");
                        synthesizer.close();

                        // Save to Cache
                        await pool.query(
                            "INSERT INTO audio_cache (text_hash, text_content, audio_path) VALUES (?, ?, ?)",
                            [hash, text, audioUrl]
                        );

                        resolve(NextResponse.json({ audioUrl }));
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
