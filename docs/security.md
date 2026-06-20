# MindMitra AI — Security Framework

## Core Security Features

### 1. API Credentials Management
- Private keys and keys are kept strictly out of committed file versions using `.gitignore` exclusions.
- Default settings read values dynamically from environment managers (`os.getenv`).

### 2. Prompt Injection Mitigation
- Sanitizes user input text strings.
- Employs regex filters checking for override directives (e.g. "ignore previous instructions") prior to hitting Gemini model queues.
- Throws validation exceptions and terminates request parsing when injection cues are matched.

### 3. Cross-Origin Resource Sharing (CORS)
- Restricts incoming API calls specifically to whitelisted production domains (Vercel URL) and local development ports.
