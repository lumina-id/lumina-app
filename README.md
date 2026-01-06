# Lumina - Smart AAC & Gaze-Controlled Assistant

Lumina is a web-based **Augmentative and Alternative Communication (AAC)** application designed to empower individuals with speech and motor limitations. By combining **Gaze Tracking**, **AI-Powered Predictions**, and **Speech Services**, Lumina enables seamless and faster communication.

## ✨ Key Features

- **👁️ Gaze & Blink Control**: Interface fully navigable using head movements and eye blinks (powered by MediaPipe Face Mesh).
- **🗣️ Advanced Speech-to-Text (STT)**: Listens to the environment and displays what the caregiver or friend is saying.
- **🤖 Context-Aware AI Suggestions**:
  - **Response Generation**: Automatically suggests relevant replies based on what the *caregiver* said (using Azure OpenAI).
  - **Sentence Completion**: Smartly predicts and completes sentences while the user types.
- **🔊 Text-to-Speech (TTS)**: Converts typed messages into natural-sounding speech (Bahasa Indonesia & English support).
- **📱 Telegram Integration**: Send quick messages directly to family members or caregivers via Telegram.
- **💾 Smart Audio Caching**: Caches TTS audio for instant playback and reduced latency.

## 🛠️ Tech Stack

- **Framework**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS
- **AI & NLP**: Azure OpenAI (GPT-4o/5-nano)
- **Speech Services**: Azure Cognitive Services (Speech-to-Text & Text-to-Speech)
- **Computer Vision**: MediaPipe Tasks Vision (Face Landmarker)
- **Database**: MySQL (for audio caching)

## 📁 Project Structure

```
lumina-app/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication Routes
│   │   ├── api/
│   │   │   ├── speech-token/    # Azure Speech Token Generation
│   │   │   ├── suggestions/     # AI Suggestions (Azure OpenAI)
│   │   │   ├── telegram/        # Telegram Integration
│   │   │   └── tts/             # Text-to-Speech (Azure)
│   │   ├── main/                # Main Application Page
│   │   ├── onboarding/          # Calibration & Onboarding
│   │   ├── layout.tsx
│   │   └── page.tsx             # Landing Page
│   ├── components/
│   │   ├── auth/                # Auth Components
│   │   ├── gaze/                # Gaze Tracking Components
│   │   ├── landing/             # Landing Page Components
│   │   ├── main/                # Core App Components (HeardCard, Input, etc.)
│   │   ├── onboarding/          # Onboarding Steps Components
│   │   └── ui/                  # Shared UI Components
│   ├── context/                 # Global State (Language, etc.)
│   ├── hooks/
│   │   ├── main/                # Main App Hooks
│   │   ├── onboarding/          # Onboarding Hooks
│   │   ├── useAzureSTT.ts       # Speech-to-Text Hook
│   │   └── useFaceMesh.ts       # Face Tracking Hook
│   ├── lib/                     # Utilities & Database Helpers
│   ├── locales/                 # i18n Dictionaries (EN/ID)
│   └── utils/                   # Helper Functions
└── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MySQL Database
- **Azure OpenAI** Endpoint & Key
- **Azure Speech Service** Key & Region

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/lumina-fe.git
    cd lumina-fe
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Create a `.env` file based on `.env.example`:
    ```bash
    cp .env.example .env
    ```
    
    Update the keys in `.env`:
    ```env
    # Azure OpenAI
    AZURE_OPENAI_API_KEY="<your-azure-openai-key>"
    AZURE_OPENAI_ENDPOINT="<your-endpoint>"
    AZURE_OPENAI_DEPLOYMENT_NAME="gpt-4o"

    # Azure Speech
    NEXT_PUBLIC_AZURE_SPEECH_KEY="<your-speech-key>"
    NEXT_PUBLIC_AZURE_SPEECH_REGION="southeastasia"

    # Database
    DB_HOST="localhost"
    DB_USER="root"
    DB_PASSWORD=""
    DB_NAME="lumina_db"
    ```

4.  **Setup Database Schema**
    ```bash
    mysql -u root -p lumina_db < database/schema.sql
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```

6.  **Access the App**
    Open [http://localhost:3000](http://localhost:3000)

## 📝 API Usage

### POST `/api/suggestions`
Generates context-aware suggestions.

**Request:**
```json
{
  "context": "What do you want to eat?",
  "lang": "en",
  "type": "stt" // or "typing"
}
```

**Response:**
```json
{
  "suggestions": [
    "I want fried rice",
    "I am not hungry",
    "Maybe some soup?",
    "Anything is fine"
  ]
}
```

## 📄 License

MIT License
