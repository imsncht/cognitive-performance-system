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

## 🖼️ Graphical System Architecture (Mermaid)

> Copy and paste the following into any Markdown file or GitHub README to view the diagram:

```mermaid
graph TD
  User[User]
  Frontend[Frontend (React, Vite, Tailwind CSS)]
  Backend[Backend (Node.js, Express)]
  AIService[AI Service (aiService.js, prompts.js)]
  Database[SQL Database]
  Gemini[Google Gemini API]

  User -->|Uses UI| Frontend
  Frontend -->|REST API Calls| Backend
  Backend -->|Generate/Adapt Plan| AIService
  AIService -->|Send Prompt| Gemini
  Gemini -->|JSON Plan| AIService
  AIService -->|Return Plan| Backend
  Backend -->|Store/Retrieve Data| Database
  Backend -->|Send Plan/Session Data| Frontend
  Frontend -->|Display Plan/Layouts| User
```

---

This diagram is GitHub-compatible and can be viewed directly in Markdown files on GitHub.
