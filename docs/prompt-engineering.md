# MindMitra AI — Prompt Engineering Manual

## Prompt Structure
MindMitra AI splits AI tasks into isolated developer and system boundaries:

1. **System Prompt**: Declares the persona constraints (productivity advisor, non-diagnostic coach) and safety boundaries.
2. **User Context Template**: Injecting student log details and exam category settings.
3. **Structured JSON mode**: Gemini is instructed to respond matching strict properties using native SDK configurations.

## Structured Output Parameters
The Gemini model returns a schema defining:
- `wellness_score` (0-100)
- `stress_triggers` (subject classifications)
- `burnout` (Low, Moderate, High, Critical flags)
- `recommendations` (custom study and sleep advices)
