# MindMitra AI — Your AI Study & Wellness Companion

MindMitra AI is a production-ready Generative AI-powered wellness intelligence dashboard built for students preparing for competitive exams like JEE, NEET, UPSC, CAT, GATE, and CUET. It analyzes daily journals to discover hidden stress triggers, track focus, predict burnout risk, and offer hyper-personalized cognitive recovery advice.

## 🚀 Core Features

- **AI Wellness Dashboard**: Displays wellness score, focus indexing, sleep quality tracking, and routine consistency rating.
- **AI Journal Editor**: Multi-mood free-writing log console with real-time Gemini sentiment feedback.
- **Hidden Trigger Detection**: Highlights recurrent cognitive patterns (e.g. "Mock tests reduce confidence") with AI confidence rates.
- **Stress Trigger Map**: Radar bar meters visualizing primary stress sources.
- **Burnout Assessment**: Radially gauges burnout probability (Low, Moderate, High, Critical) with preventive tips.
- **AI Study Mentor**: Personalizes curriculum advice, time-blocking strategies, and recovery techniques.
- **Emergency safe support**: Non-diagnostic distress detection flagging sensitive keywords.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Recharts, Lucide Icons, Framer Motion
- **Backend**: FastAPI, Python 3.10+, Pydantic v2, Google Generative AI (Gemini 2.5 Flash SDK)
- **Database**: Supabase PostgreSQL
- **Deployment**: Vercel (Frontend), Railway (Backend)

---

## 📂 Project Directory Structure

```
mindmitra-ai/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # UI components (dashboard, layout, charts)
│   │   ├── context/         # AppState and offline/mock context provider
│   │   ├── pages/           # State views (Dashboard, Journal, Patterns)
│   │   ├── services/        # API client connection interface
│   │   ├── types/           # Type definitions
│   │   ├── App.tsx          # Router and tab switcher layout
│   │   └── main.tsx         # Mounting root
│   ├── tailwind.config.js
│   └── tsconfig.json
├── backend/
│   ├── app/
│   │   ├── routes/          # API endpoint routes
│   │   ├── services/        # Gemini client service wrapper
│   │   ├── config.py        # Environmental setting handles
│   │   └── main.py          # FastAPI application boot
│   └── requirements.txt     # Python dependencies
├── supabase_schema.sql      # Database structure initialization script
└── README.md
```

---

## 💻 Local Development Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Set up virtual environment and install requirements:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Set your environment variables (or create a `.env` file):
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Boot the server:
   ```bash
   python app/main.py
   ```
   The backend API will run at `http://localhost:8000`.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Boot development server:
   ```bash
   npm run dev
   ```
   The application will mount at `http://localhost:5173`.

---

## 🧪 Testing

We utilize structural Pydantic validation schemas to guarantee response integrity from the Gemini API.

To manually run tests or verify builds:
- **Frontend build test**: `npm run build`
- **Backend health test**: `curl http://localhost:8000/api/health`

---

## 🔒 Security & Privacy

- Centralized environment configurations prevent committing private API credentials.
- Strict input validation prevents prompt injection attempts.
- Supportive, non-diagnostic response routing ensures emergency resources are provided when severe distress keywords are matched.

---

## 🚀 Deployment Instructions

### Frontend (Vercel)
Connect the repository and deploy using default Vite configuration settings.

### Backend (Railway)
Ensure `PORT` and `GEMINI_API_KEY` are provided in the environment variables. Railway will automatically pick up the start script from the project structure.
