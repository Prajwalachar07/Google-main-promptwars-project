import json
import logging
import google.generativeai as genai
from ..config import settings
from .prompt_builder import PromptBuilder, PromptInjectionError

logger = logging.getLogger("mindmitra")

class GeminiService:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel(
                'gemini-2.5-flash',
                system_instruction=PromptBuilder.get_system_prompt()
            )
        else:
            self.model = None
            logger.warning("GEMINI_API_KEY environment variable is missing. Operating in dry-run/mock mode.")

    async def analyze_journal(self, content: str, exam_type: str) -> dict:
        """
        Analyze journal content using Gemini 2.5 Flash and return structured JSON layout.
        Retries on failures, falls back to structural mock template if unavailable.
        """
        try:
            # Sanitize inputs for prompt injection
            sanitized_content = PromptBuilder.sanitize_input(content)
        except PromptInjectionError as e:
            logger.warning(f"Sanitization blocked input: {e}")
            return self._get_mock_analysis("Security Block triggered.", exam_type, flagged=True)

        if not self.model:
            return self._get_mock_analysis(sanitized_content, exam_type)

        prompt = PromptBuilder.build_analysis_prompt(sanitized_content, exam_type)

        # Retry loop for model queries
        for attempt in range(2):
            try:
                response = self.model.generate_content(
                    prompt,
                    generation_config={"response_mime_type": "application/json"}
                )
                data = json.loads(response.text)
                return data
            except Exception as ex:
                logger.error(f"Gemini API attempt {attempt + 1} failed: {ex}")
                if attempt == 1:
                    # Fallback to local emulation
                    return self._get_mock_analysis(sanitized_content, exam_type)
        
        return self._get_mock_analysis(sanitized_content, exam_type)

    def _get_mock_analysis(self, content: str, exam_type: str, flagged: bool = False) -> dict:
        """
        Emulated local response parser if model is unavailable.
        """
        if flagged:
            return {
                "summary": "System security block active.",
                "wellness_score": 0,
                "stress_triggers": [],
                "burnout": {
                    "level": "Low",
                    "score": 0,
                    "indicators": ["Input override attempt"],
                    "preventive_advice": ["Log normal study entries."]
                },
                "patterns": [],
                "motivation": {"confidence_level": 0, "hope_level": 0, "persistence": 0, "discipline": 0, "optimism": 0, "self_belief": 0, "trend": "Stable"},
                "confidence": {"score": 0, "factors": [], "trend": "Stable"},
                "recommendations": {
                    "study_advice": "Please write normal study feedback logs.",
                    "break_suggestions": "Disconnect for a moment.",
                    "sleep_advice": "Maintain normal sleep cycles.",
                    "exercise_suggestions": "Take a deep breath.",
                    "mindfulness_tips": "Do light deep breathing.",
                    "time_management_advice": "Avoid injection directives."
                },
                "daily_reflection": "System overrides are not allowed.",
                "weekly_reflection": "Log valid review contents.",
                "achievements": [],
                "study_consistency": {"score": 0, "rhythm": "Suspended", "gaps_identified": ["Security check"]},
                "insights": ["Input was flagged for system directive overrides."],
                "risk_flags": {
                    "severe_distress_detected": False,
                    "risk_keywords": [],
                    "emergency_message": "Input flagged. Please write normal logs."
                }
            }

        anxiety = 45
        stress = 55
        confidence = 60
        motivation = 70
        sleep = 70
        severe_distress = False
        keywords = []

        lower_content = content.lower()
        if "anxious" in lower_content or "physics" in lower_content or "hard" in lower_content:
            anxiety += 20
            stress += 10
        if "mock" in lower_content or "test" in lower_content or "fail" in lower_content:
            confidence -= 20
            stress += 15
        if "tired" in lower_content or "sleep" in lower_content or "exhausted" in lower_content:
            sleep -= 20
            stress += 15
        if any(w in lower_content for w in ["die", "suicide", "give up", "hopeless"]):
            severe_distress = True
            keywords = ["hopeless"]

        # Calculate synthesized wellness
        wellness = (confidence + motivation + (100 - stress) + (100 - anxiety) + sleep) // 5

        return {
            "summary": "Slight mock test fatigue observed. Confidence levels show potential fluctuations.",
            "wellness_score": max(0, min(100, wellness)),
            "stress_triggers": [
                {
                    "trigger": "Exam syllabus load",
                    "category": "study",
                    "influence_level": stress,
                    "reason": "Handling cumulative mock revision blocks",
                    "evidence": "Mentioned study schedules and preparation fatigue",
                    "trend": "Stable"
                }
            ],
            "burnout": {
                "level": "High" if stress > 70 else "Moderate" if stress > 45 else "Low",
                "score": stress,
                "indicators": ["Routine academic tracking"],
                "preventive_advice": [
                    "Maintain structured 15-minute breaks after 90 minutes of studying.",
                    "Shut off study devices 45 minutes prior to sleeping."
                ]
            },
            "patterns": [
                {
                    "pattern": "High study loads correlate with fatigue logs.",
                    "type": "Study Fatigue Link",
                    "confidence": 75,
                    "triggers": ["Extended practice sets"]
                }
            ],
            "motivation": {
                "confidence_level": max(0, confidence),
                "hope_level": 70,
                "persistence": 80,
                "discipline": 85,
                "optimism": 65,
                "self_belief": 50,
                "trend": "Stable"
            },
            "confidence": {
                "score": max(0, confidence),
                "factors": ["syllabus load"],
                "trend": "Decreasing"
            },
            "recommendations": {
                "study_advice": f"Split your {exam_type} daily prep into short 45-minute cycles.",
                "break_suggestions": "Go for a light walk away from devices.",
                "sleep_advice": "Keep your screen time low before sleeping.",
                "exercise_suggestions": "Try simple light stretching.",
                "mindfulness_tips": "Inhale deeply for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds.",
                "time_management_advice": "Attempt mock tests early in the morning during high cognitive energy levels."
            },
            "daily_reflection": "Your progress today represents determination. Keep moving step by step.",
            "weekly_reflection": "This week highlights a pattern of intense revision coupled with mild rest deficits.",
            "achievements": ["Completed sheet review"],
            "study_consistency": {
                "score": 85,
                "rhythm": "Regular but fatigued",
                "gaps_identified": ["late night sleep deprecation"]
            },
            "insights": ["Late-night revision routines are causing drops in daytime focus."],
            "risk_flags": {
                "severe_distress_detected": severe_distress,
                "risk_keywords": keywords,
                "emergency_message": "We notice you might be experiencing significant distress. Please consider reaching out to trusted family members, a counselor, or calling a support hotline like Vandrevala Foundation (9999 666 555) or AASRA (91-9820466726)." if severe_distress else None
            }
        }
