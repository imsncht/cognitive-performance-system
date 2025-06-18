# Cognitive Performance System (CPS)

CPS is an AI-powered productivity and cognitive enhancement platform. It generates and adapts personalized work plans in real time, using Google Gemini AI, based on your goals and psychological state.

---

## 🚀 Live Demo

![Live Demo GIF](https://placehold.co/800x450/1e293b/475569?text=Demo%20AI-Driven%20Planning%20%26%20Layout%20Switching)

> **Pro Tip:** Add a GIF showing login, goal input, AI plan generation, and dynamic layout switching for maximum impact.

---

## ✨ Key Features

- **🤖 AI-Powered Planning:** Live integration with Google Gemini for dynamic, personalized session plans
- **🔄 Real-Time Adaptation:** Plans and layouts update instantly as your state or context changes
- **🗂️ Multiple Productivity Layouts:** Kanban, Pomodoro, Writer, Zen Focus, and more—AI recommends the best fit for your needs
- **🔐 Secure User Authentication:** All data is private and protected
- **📈 Session Tracking:** Review your progress and session history
- **⚡ Modern, Responsive UI:** Built with React, Tailwind CSS, and Vite

---

## 🧠 How It Works

1. **Log in** to your dashboard
2. **Start a session** by entering your goal and psychological state
3. **AI generates a plan**: CPS sends your input to Gemini, which returns a JSON plan (tasks, layout, title)
4. **Work through your plan** in the recommended layout
5. **Update your state** at any time—CPS adapts your plan in real time
6. **Track your sessions** and review your progress

---

## 🛠️ Tech Stack

| Frontend         | Backend         | AI Integration         | Database   |
|------------------|----------------|-----------------------|------------|
| React, Vite      | Node.js, Express| Google Gemini API     | SQL (schema.sql) |
| Tailwind CSS     |                | @google/generative-ai |            |

---

## 📊 System Architecture

```mermaid
graph TD
    User[User]
    Frontend[Frontend: React, Vite, Tailwind CSS]
    Backend[Backend: Node.js, Express]
    AIService[AI Service: aiService.js, prompts.js]
    Gemini[Google Gemini API]
    Database[Database: SQL]

    User --> Frontend
    Frontend --> Backend
    Backend --> AIService
    AIService --> Gemini
    Gemini --> AIService
    AIService --> Backend
    Backend --> Database
    Backend --> Frontend
    Frontend --> User
```

---

## 🔁 Data Flow

```mermaid
graph TD
    User[User]
    UI[React UI Components]
    API[Express API]
    AIS[AI Service: aiService.js]
    PROMPTS[Prompt Generation: prompts.js]
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

## 🚀 Getting Started

1. **Clone the repo**
    ```sh
    git clone https://github.com/imsncht/cognitive-performance-system.git
    ```
2. **Install dependencies** in both `frontend/` and `backend/`
    ```sh
    cd cognitive-performance-system/frontend && npm install
    cd ../backend && npm install
    ```
3. **Set up environment variables** (see `.env.example`)
4. **Run backend and frontend dev servers**

---

## 🗺️ Roadmap

- More productivity layouts
- Deeper analytics and insights
- Biometric device integration
- Team/collaborative features

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

---

> For a detailed architecture and data flow, see [`architecture-and-dataflow.md`](architecture-and-dataflow.md).
