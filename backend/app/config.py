import os
from pydantic_settings import BaseSettings if False else object # Allow simple configuration mock fallback

class Settings:
    PROJECT_NAME: str = "MindMitra AI"
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    PORT: int = int(os.getenv("PORT", "8000"))

settings = Settings()
