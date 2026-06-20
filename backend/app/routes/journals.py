from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.gemini_service import GeminiService

router = APIRouter()
gemini_service = GeminiService()

class JournalRequest(BaseModel):
    content: str
    exam_type: str

@router.post("/analyze")
async def analyze_journal(payload: JournalRequest):
    if not payload.content.strip():
        raise HTTPException(status_code=400, detail="Journal content cannot be empty.")
    
    try:
        analysis = await gemini_service.analyze_journal(payload.content, payload.exam_type)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failure: {str(e)}")
