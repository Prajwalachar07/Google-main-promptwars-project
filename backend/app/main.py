import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import journals

app = FastAPI(title="MindMitra AI API", version="1.0.0")

# Setup CORS to allow cross-origin calls from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow local development cross-origin requests
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register endpoints
app.include_router(journals.router, prefix="/api/journals", tags=["Journals"])

@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "MindMitra AI Backend"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
