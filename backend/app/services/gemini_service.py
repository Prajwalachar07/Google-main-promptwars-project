import json
import logging
import google.generativeai as genai
from ..config import settings

logger = logging.getLogger("mindmitra")

class GeminiService:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-2.5-flash')
        else:
            self.model = None
            logger.warning("GEMINI_API_KEY environment variable is missing. Operating in dry-run/mock mode.")

    async def analyze_journal(self, content: str, exam_type: str) -> dict:
        """
        Analyze journal content using Gemini 2.5 Flash with strict JSON output matching the JournalAnalysis TypeScript model.
        """
        if not self.model:
            return self._get_mock_analysis(content, exam_type)

        prompt = f"""
        You are a highly analytical AI study mentor, productivity advisor, and wellness patterns analyzer for competitive exam aspirants.
        Analyze the following journal entry for a student preparing for the '{exam_type}' exam.
        
        Strict Safety Rule:
        - NEVER diagnose mental illnesses.
        - NEVER claim certainty.
        - Under cognitive patterns, stress triggers, and burnout assessment, use speculative language.
        - If severe distress, self-harm, or hopelessness is detected, set `severeDistressDetected` to true and provide an emergency support warning encouraging them to speak with parents, teachers, counselors or call a helpline.

        Journal Content:
        \"\"\"{content}\"\"\"

        Return a JSON object exactly matching this schema:
        {{
          "emotions": {{
            "primary": "string (e.g. Anxious, Focused, Calmer, Defeated, Motivated)",
            "secondary": ["string"],
            "metrics": {{
              "anxiety": number (0-100),
              "stress": number (0-100),
              "confidence": number (0-100),
              "motivation": number (0-100),
              "productivity": number (0-100),
              "burnoutRisk": number (0-100),
              "sleepQuality": number (0-100)
            }}
          }},
          "studyMetrics": {{
            "subjectFocus": ["string (e.g. Physics, Quantitative, General Knowledge)"],
            "hoursStudiedEstimate": number or null,
            "challengesFaced": ["string"],
            "studyConsistencyScore": number (0-100)
          }},
          "stressTriggers": [
            {{
              "trigger": "string",
              "category": "string (one of: 'study', 'mock-test', 'sleep', 'family', 'social-media', 'time-management', 'self-comparison', 'other')",
              "influenceLevel": number (0-100),
              "description": "string"
            }}
          ],
          "burnoutAssessment": {{
            "level": "string (one of: 'Low', 'Moderate', 'High', 'Very High')",
            "score": number (0-100),
            "indicators": ["string"],
            "preventiveSuggestions": ["string"]
          }},
          "cognitivePatterns": [
            {{
              "pattern": "string (e.g. 'Late night study reduces motivation')",
              "type": "string",
              "confidence": number (0-100),
              "triggers": ["string"]
            }}
          ],
          "recommendations": {{
            "studyAdvice": "string (personalized to the selected exam and the logs)",
            "mindfulnessExercise": "string",
            "breakStrategy": "string",
            "motivationalMessage": "string",
            "timeManagementTip": "string",
            "recoveryAdvice": "string"
          }},
          "safetyCheck": {{
            "severeDistressDetected": boolean,
            "riskKeywordsIdentified": ["string"],
            "message": "string or null"
          }}
        }}
        """

        try:
            response = self.model.generate_content(
                prompt,
                generation_config={"response_mime_type": "application/json"}
            )
            data = json.loads(response.text)
            return data
        except Exception as e:
            logger.error(f"Gemini API failure during analysis: {e}")
            return self._get_mock_analysis(content, exam_type)

    def _get_mock_analysis(self, content: str, exam_type: str) -> dict:
        """
        Emulated response when Gemini API is unavailable.
        """
        # Base metrics
        anxiety = 40
        stress = 50
        confidence = 60
        motivation = 70
        sleep = 75
        severe_distress = False
        keywords = []

        lower_content = content.lower()
        if "anxious" in lower_content or "physics" in lower_content or "worry" in lower_content:
          anxiety += 25
          stress += 15
        if "mock" in lower_content or "test" in lower_content or "fail" in lower_content:
          confidence -= 20
          stress += 10
        if "tired" in lower_content or "sleep" in lower_content or "exhausted" in lower_content:
          sleep -= 20
          stress += 15
        if any(w in lower_content for w in ["die", "suicide", "give up", "hopeless"]):
          severe_distress = True
          keywords = ["hopeless"]

        return {
          "emotions": {
            "primary": "Anxious" if anxiety > 60 else "Focused",
            "secondary": ["Reflective"],
            "metrics": {
              "anxiety": min(100, anxiety),
              "stress": min(100, stress),
              "confidence": max(0, confidence),
              "motivation": motivation,
              "productivity": max(0, (confidence + motivation) // 2),
              "burnoutRisk": min(100, (stress + (100 - sleep)) // 2),
              "sleepQuality": sleep
            }
          },
          "studyMetrics": {
            "subjectFocus": ["General Study" if exam_type != 'JEE' else "Physics/Maths"],
            "hoursStudiedEstimate": 6,
            "challengesFaced": ["Syllabus load"],
            "studyConsistencyScore": 80
          },
          "stressTriggers": [
            {
              "trigger": "Academic load",
              "category": "study",
              "influenceLevel": stress,
              "description": f"Handling the study schedule for {exam_type} preparation."
            }
          ],
          "burnoutAssessment": {
            "level": "High" if stress > 70 else "Moderate" if stress > 45 else "Low",
            "score": stress,
            "indicators": ["Routine academic tracking"],
            "preventiveSuggestions": [
              "Maintain consistent hydration.",
              "Shut off active study laptops 45 minutes before bedtime."
            ]
          },
          "cognitivePatterns": [
            {
              "pattern": "High study loads correlate with fatigue logs.",
              "type": "Study Fatigue Relationship",
              "confidence": 75,
              "triggers": ["Extended practice sets"]
            }
          ],
          "recommendations": {
            "studyAdvice": f"Split your {exam_type} daily curriculum into digestible 45-minute study sprints.",
            "mindfulnessExercise": "Commit to 5 minutes of mindful box breathing before revision sections.",
            "breakStrategy": "Go for a light 10-minute walk away from screens.",
            "motivationalMessage": "Preparation is a marathon. Remain consistent, take breaks, and progress one topic at a time.",
            "timeManagementTip": "Attempt mock tests early in the morning during high cognitive energy levels.",
            "recoveryAdvice": "Take a complete study break afternoon once a week to relax and re-energize."
          },
          "safetyCheck": {
            "severeDistressDetected": severe_distress,
            "riskKeywordsIdentified": keywords,
            "message": "Please seek immediate local support or talk to loved ones if you are feeling overwhelmed." if severe_distress else None
          }
        }
