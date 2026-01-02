import { NextResponse } from "next/server";

export async function GET() {
    const speechKey = process.env.AZURE_SPEECH_KEY;
    const speechRegion = process.env.AZURE_SPEECH_REGION;
    const speechEndpoint = process.env.AZURE_SPEECH_ENDPOINT; // For Foundry

    if (!speechKey) {
        return NextResponse.json(
            { error: "AZURE_SPEECH_KEY not configured in .env" },
            { status: 500 }
        );
    }

    // Determine token endpoint
    // If custom endpoint (Foundry), use that. Otherwise use regional endpoint.
    let tokenUrl: string;
    let hostForSDK: string;

    if (speechEndpoint) {
        // Foundry format: https://lumina-foundry.cognitiveservices.azure.com/
        // Token URL: https://lumina-foundry.cognitiveservices.azure.com/sts/v1.0/issueToken
        const baseUrl = speechEndpoint.replace(/\/$/, ""); // Remove trailing slash
        tokenUrl = `${baseUrl}/sts/v1.0/issueToken`;
        hostForSDK = baseUrl.replace("https://", "").replace("http://", "");
    } else if (speechRegion) {
        // Regional endpoint format
        tokenUrl = `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`;
        hostForSDK = speechRegion;
    } else {
        return NextResponse.json(
            { error: "Either AZURE_SPEECH_ENDPOINT or AZURE_SPEECH_REGION must be set in .env" },
            { status: 500 }
        );
    }

    const headers = {
        "Ocp-Apim-Subscription-Key": speechKey,
        "Content-Type": "application/x-www-form-urlencoded",
    };

    try {
        console.log("Fetching token from:", tokenUrl);

        const tokenResponse = await fetch(tokenUrl, {
            method: "POST",
            headers: headers,
            body: null,
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error("Token fetch failed:", errorText);
            return NextResponse.json(
                { error: "Failed to fetch token from Azure", details: errorText },
                { status: tokenResponse.status }
            );
        }

        const token = await tokenResponse.text();

        return NextResponse.json({
            token,
            region: speechRegion || "custom",
            endpoint: speechEndpoint || null,
            host: hostForSDK
        });
    } catch (error) {
        console.error("Token API error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
