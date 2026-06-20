import os
from dotenv import load_dotenv

# Explicitly load .env file from the backend folder or project root
load_dotenv()

class Settings:
    PROJECT_NAME: str = "MindMitra AI"
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    PORT: int = int(os.getenv("PORT", "8000"))

settings = Settings()
