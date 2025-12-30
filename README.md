# LUMINA - Assistive Communication App

Aplikasi komunikasi berbasis web untuk membantu pengguna dengan kesulitan berbicara. Menggunakan **Text-to-Speech (TTS)** dan **AI-powered suggestions** untuk mempercepat komunikasi.

## ✨ Fitur Utama

- **Text-to-Speech (TTS)**: Konversi teks ke suara Bahasa Indonesia menggunakan Azure Speech Service
- **Smart Suggestions**: Saran kalimat otomatis berdasarkan kata kunci menggunakan AI (OpenRouter/Gemini)
- **Audio Caching**: Hasil TTS disimpan di database untuk akses cepat tanpa request ulang
- **Eye Tracking**: Kontrol aplikasi menggunakan gerakan mata (MediaPipe Face Mesh)
- **Virtual Keyboard**: Keyboard virtual untuk input teks
- **Telegram Integration**: Kirim pesan langsung ke kontak Telegram

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, TailwindCSS
- **AI Suggestions**: OpenRouter API (Gemini 1.5 Flash)
- **TTS**: Azure Cognitive Services Speech SDK
- **Database**: MySQL (untuk caching audio)
- **Eye Tracking**: MediaPipe Tasks Vision

## 📁 Struktur Proyek

```
lumina-fe/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── suggestions/     # API untuk saran kalimat (OpenRouter)
│   │   │   │   └── route.ts
│   │   │   └── tts/             # API untuk Text-to-Speech (Azure)
│   │   │       └── route.ts
│   │   ├── main/                # Halaman utama aplikasi
│   │   │   └── page.tsx
│   │   ├── onboarding/          # Halaman onboarding
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── main/                # Komponen halaman utama
│   │   │   ├── HeardCard.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   ├── SuggestedResponses.tsx
│   │   │   ├── TelegramModal.tsx
│   │   │   └── VirtualKeyboard.tsx
│   │   ├── gaze/                # Komponen eye tracking
│   │   │   └── GazeCursor.tsx
│   │   ├── onboarding/          # Komponen onboarding
│   │   └── ui/                  # Komponen UI umum
│   ├── context/                 # React Context (Language)
│   ├── hooks/                   # Custom React Hooks
│   │   ├── main/
│   │   │   └── useMessageComposer.ts
│   │   └── useFaceMesh.ts
│   ├── lib/                     # Utility libraries
│   │   └── db.ts                # Database connection helper
│   ├── locales/                 # Internationalization
│   └── utils/                   # Helper functions
├── database/
│   └── schema.sql               # SQL schema untuk audio cache
├── public/
│   └── audio/                   # Folder penyimpanan audio cache
├── .env.example                 # Template environment variables
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MySQL Database
- OpenRouter API Key (dari [openrouter.ai](https://openrouter.ai))
- Azure Speech Service Key

### Installation

1. **Clone dan install dependencies**
   ```bash
   cd lumina-fe
   npm install
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` dan isi kredensial:
   ```env
   OPENROUTER_API_KEY="<your-openrouter-api-key>"
   OPENROUTER_MODEL="google/gemini-flash-1.5"
   AZURE_SPEECH_KEY="<your-azure-speech-key>"
   AZURE_SPEECH_REGION="southeastasia"
   DB_HOST="localhost"
   DB_USER="root"
   DB_PASSWORD=""
   DB_NAME="lumina_db"
   ```

3. **Setup database**
   ```bash
   mysql -u root -p lumina_db < database/schema.sql
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Buka aplikasi**
   
   Akses [http://localhost:3000/main](http://localhost:3000/main)

## 📝 API Endpoints

### POST `/api/suggestions`
Generate saran kalimat berdasarkan kata kunci.

**Request:**
```json
{ "context": "makan" }
```

**Response:**
```json
{
  "suggestions": [
    "Saya ingin makan",
    "Sudah waktunya makan",
    "Makanan ini enak",
    "Saya belum makan"
  ]
}
```

### POST `/api/tts`
Konversi teks ke audio (dengan caching).

**Request:**
```json
{ "text": "Halo, apa kabar?" }
```

**Response:**
```json
{ "audioUrl": "/audio/abc123.mp3" }
```

## 📄 License

MIT License
