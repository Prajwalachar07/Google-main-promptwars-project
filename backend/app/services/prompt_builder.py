import re
from typing import Dict, Any

class PromptInjectionError(Exception):
    pass

class PromptBuilder:
    @staticmethod
    def sanitize_input(text: str) -> str:
        """
        Sanitize user text input to guard against common prompt injection techniques.
        Strips markdown system blocks and system directives.
        """
        if not text:
            return ""
        
        # Heuristics for prompt injection detection
        injection_patterns = [
            r"(?i)ignore\s+(all\s+)?previous\s+instructions",
            r"(?i)system\s+prompt\s+override",
            r"(?i)you\s+are\s+now\s+a",
            r"(?i)instead\s+of\s+your\s+usual\s+instructions",
            r"\[\s*system\s*\]",
            r"<\s*system\s*>"
        ]
        
        for pattern in injection_patterns:
            if re.search(pattern, text):
                raise PromptInjectionError("Potential prompt injection pattern detected in input.")

        # Strip html/script tags and excessive control tokens
        sanitized = re.sub(r'<[^>]*>', '', text)
        return sanitized.strip()

    @staticmethod
    def get_system_prompt() -> str:
        return """
        You are a highly analytical AI study mentor, behavioral pattern analyst, productivity coach, and wellness companion for competitive exam aspirants.
        Your goal is to evaluate student reflections and logs to discover emotional and behavioral trends.

        Strict Boundaries:
        1. NEVER diagnose any mental illness or claim certainty.
        2. Always use speculative, supportive language.
        3. If severe distress, hopelessness, or self-harm indicators are detected, set `severe_distress_detected` to true and populate `emergency_message` with supportive resource details (encouraging speaking to parents/friends or calling helpline AASRA 91-9820466726).
        """

    @staticmethod
    def build_analysis_prompt(content: str, exam_type: str, memory_context: str = "") -> str:
        sanitized_content = PromptBuilder.sanitize_input(content)
        
        prompt = f"""
        Analyze the following journal entry for a student preparing for the '{exam_type}' exam.
        
        {f"Historical context memory: {memory_context}" if memory_context else ""}

        Student Log:
        \"\"\"{sanitized_content}\"\"\"

        Return a JSON object exactly matching this schema:
        {{
          "summary": "Brief summary of the student state",
          "wellness_score": 80,
          "stress_triggers": [
            {{
              "trigger": "subject mock tests",
              "category": "mock-test",
              "influence_level": 75,
              "reason": "anxiety",
              "evidence": "explicit mention of marks",
              "trend": "Stable"
            }}
          ],
          "burnout": {{
            "level": "Moderate",
            "score": 55,
            "indicators": ["late study"],
            "preventive_advice": ["sleep schedule reset"]
          }},
          "patterns": [
            {{
              "pattern": "Mock tests correlate with confidence drop",
              "type": "Academic confidence link",
              "confidence": 80,
              "triggers": ["solving test sheets"]
            }}
          ],
          "motivation": {{
            "confidence_level": 60,
            "hope_level": 70,
            "persistence": 80,
            "discipline": 85,
            "optimism": 65,
            "self_belief": 50,
            "trend": "Stable"
          }},
          "confidence": {{
            "score": 60,
            "factors": ["syllabus load"],
            "trend": "Decreasing"
          }},
          "recommendations": {{
            "study_advice": "Focus on concepts...",
            "break_suggestions": "Take 15 mins walking breaks...",
            "sleep_advice": "Sleep by 11:30 PM...",
            "exercise_suggestions": "Try simple light stretching...",
            "mindfulness_tips": "Do 5 mins box breathing...",
            "time_management_advice": "Do mock tests in mornings..."
          }},
          "daily_reflection": "Your progress today represents determination...",
          "weekly_reflection": "This week had mock exam fatigue...",
          "achievements": ["Completed sheet review"],
          "study_consistency": {{
            "score": 85,
            "rhythm": "Regular but fatigued",
            "gaps_identified": ["late night sleep deprecation"]
          }},
          "insights": [
            "Late-night revision routines are causing drops in daytime focus"
          ],
          "risk_flags": {{
            "severe_distress_detected": false,
            "risk_keywords": [],
            "emergency_message": null
          }}
        }}
        """
        return prompt.strip()
