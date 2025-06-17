# Cognitive Performance System – System Architecture Diagram (Textual)

## 1. User Layer
[User]
   |
   v

## 2. Frontend (Client)
[React App (Vite, Tailwind CSS)]
   - Handles UI, user input, and displays AI-generated plans
   - Communicates with backend via REST API
   |
   v

## 3. Backend (Server)
[Node.js + Express API]
   - Handles authentication, session management, and API endpoints
   - Integrates with AI Service and Database
   |
   |---> [AI Service Layer]
   |         - aiService.js: Generates prompts, calls Gemini API, parses responses
   |         - prompts.js: Prompt templates for Gemini
   |
   |---> [Database Layer]
             - Stores users, sessions, and interaction data (SQL)
   |
   v

## 4. AI Integration
[Google Gemini API]
   - Receives prompts from backend
   - Returns structured JSON plans and recommendations

---

## Data Flow
User → React App → Express API → AI Service → Gemini API → AI Service → Express API → React App → User

---

## Legend
- [Brackets]: System/component/module
- Arrows (→): Direction of data flow

---

This diagram provides a high-level overview of the system architecture, showing how the frontend, backend, AI service, and database interact.

---

## Graphical System Architecture (Mermaid)

```mermaid
graph TD
    A[User]
    B[Frontend (React, Vite, Tailwind CSS)]
    C[Backend (Node.js, Express)]
    D[AI Service (aiService.js, prompts.js)]
    E[Google Gemini API]
    F[Database (SQL)]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> D
    D --> C
    C --> F
    C --> B
    B --> A
```

---
