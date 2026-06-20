# MindMitra AI — Testing Guide

We maintain testing setups to validate frontend static rendering and backend endpoint integrations.

## 🧪 Running Backend Unit Tests
We use `pytest` inside the Python virtual environment.

```bash
# Activate virtual environment
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Execute pytest suite
python -m pytest backend/tests/test_main.py
```

## 🧪 Testing Coverage
Backend tests target:
- API endpoint health validation.
- Sanitizer pattern-matching against prompt injections.
- Structured response formats.
