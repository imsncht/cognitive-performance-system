# Cognitive Performance System – Architecture & Data Flow

This document provides a comprehensive overview of the system architecture and data flow for the Cognitive Performance System, including both textual explanations and graphical (Mermaid) diagrams supported by GitHub markdown.

---

## 1. System Architecture (Textual)

### User Layer
[User]
   |
   v

### Frontend (Client)
[React App (Vite, Tailwind CSS)]
   - Handles UI, user input, and displays AI-generated plans
   - Communicates with backend via REST API
   |
   v

### Backend (Server)
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

### AI Integration
[Google Gemini API]
   - Receives prompts from backend
   - Returns structured JSON plans and recommendations

---

## 2. System Architecture (Graphical)

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

## 3. Data Flow (Textual)

### 1. User Interaction (Frontend)
[User]
   |
   v
[React UI Components]
   |
   v

### 2. API Request (Frontend to Backend)
[React UI] --(POST /api/generate-ui or /api/update-ui)--> [Express Backend]
   |
   v

### 3. Backend Processing
[Express Route Handler]
   |
   v
[AI Service (aiService.js)]
   |
   v
[Prompt Generation (prompts.js)]
   |
   v

### 4. AI Integration
[AI Service] --(Prompt)--> [Google Gemini API]
   |
   v
[Google Gemini API] --(JSON Plan)--> [AI Service]
   |
   v

### 5. Backend Response
[AI Service] --(Session Plan JSON)--> [Express Route Handler]
   |
   v
[Express Route Handler] --(JSON Response)--> [React UI]
   |
   v

### 6. UI Update
[React UI] --(Render Plan/Layout/Tasks)--> [User]

### 7. (Optional) Data Persistence
[Express Backend] --(Session Data)--> [Database]

---

## 4. Data Flow (Graphical)

```mermaid
graph LR
    User[User]
    UI[React UI Components]
    API[Express API]
    AIS[AI Service (aiService.js)]
    PROMPTS[Prompt Generation (prompts.js)]
    GEM[Google Gemini API]
    DB[Database]

    User --> UI
    UI -->|POST /api/generate-ui| API
    API --> AIS
    AIS --> PROMPTS
    AIS -->|Prompt| GEM
    GEM -->|JSON Plan| AIS
    AIS --> API
    API -->|JSON Response| UI
    UI -->|Render| User
    API --> DB
```

---

## Legend
- [Brackets]: System/component/module
- Arrows (→): Direction of data flow
- (Parentheses): Type of data/request

---

This document gives you both a high-level and detailed view of how the Cognitive Performance System works, with both textual and visual (Mermaid) diagrams for clarity.
