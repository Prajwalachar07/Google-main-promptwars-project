# MindMitra AI — Deployment Specifications

## 🚀 Frontend Deployment (Vercel)
- Preset: `Vite`
- Root directory: `frontend`
- Install: `npm install --legacy-peer-deps`
- Build: `npm run build`
- Output: `dist`

## 🚀 Backend Deployment (Railway)
- Root directory: `backend`
- Start script command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Injected settings variables: `GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_KEY`
