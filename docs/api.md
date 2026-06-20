# MindMitra AI — API Documentation

The backend service runs FastAPI with automatic Swagger docs generated under `/docs`.

## Endpoints

### 1. `GET /api/health`
- **Description**: Returns backend API engine connectivity status.
- **Response**:
  ```json
  {"status": "ok", "service": "MindMitra AI Backend"}
  ```

### 2. `POST /api/journals/analyze`
- **Description**: Endpoint to submit daily logs for emotional validation.
- **Request Schema**:
  ```json
  {
    "content": "string (10-1000 characters)",
    "exam_type": "JEE | NEET | UPSC | CAT | GATE | CUET"
  }
  ```
- **Response Schema**:
  ```json
  {
    "summary": "string",
    "wellness_score": 85,
    "stress_triggers": [],
    "burnout": {},
    "patterns": [],
    "motivation": {},
    "confidence": {},
    "recommendations": {},
    "daily_reflection": "string",
    "weekly_reflection": "string",
    "achievements": [],
    "study_consistency": {},
    "insights": [],
    "risk_flags": {}
  }
  ```
