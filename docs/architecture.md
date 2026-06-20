# MindMitra AI — Systems Architecture

## System Topography
MindMitra AI employs a decoupled three-tier architecture separating interactive UI client render loops, backend request validation logic, and isolated third-party Gemini model orchestration:

1. **Frontend Presentation Layer**: Built on React 18, Vite 5, TypeScript, Tailwind CSS, Recharts, and Framer Motion. Uses React Context as a state manager, accommodating emulated offline modes if backend servers are down or key variables are missing.
2. **Backend API Gateway Layer**: fastapi server running Pydantic schemas, slower rate-limiters, and structured JSON prompt sanitizers.
3. **AI Reasoning Engine**: Query-optimizing Gemini 2.5 Flash SDK invoking JSON modes, retry policies, and structured validation constraints.
4. **PostgreSQL Database Storage**: Managed Supabase PostgreSQL storing student records and historical metric summaries.

## Core System Boundaries
- **Diagnostic Safety Boundary**: The AI must not diagnose. Speculative language parameters are strictly set at the system prompt configuration.
- **Input Security Boundary**: Regex and semantic injection checks sanitizing free-form journal logs.
