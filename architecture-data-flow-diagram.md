# Cognitive Performance System – Data Flow Diagram (Textual)

## 1. User Interaction (Frontend)
[User]
   |
   v
[React UI Components]
   |
   v

## 2. API Request (Frontend to Backend)
[React UI] --(POST /api/generate-ui or /api/update-ui)--> [Express Backend]
   |
   v

## 3. Backend Processing
[Express Route Handler]
   |
   v
[AI Service (aiService.js)]
   |
   v
[Prompt Generation (prompts.js)]
   |
   v

## 4. AI Integration
[AI Service] --(Prompt)--> [Google Gemini API]
   |
   v
[Google Gemini API] --(JSON Plan)--> [AI Service]
   |
   v

## 5. Backend Response
[AI Service] --(Session Plan JSON)--> [Express Route Handler]
   |
   v
[Express Route Handler] --(JSON Response)--> [React UI]
   |
   v

## 6. UI Update
[React UI] --(Render Plan/Layout/Tasks)--> [User]

## 7. (Optional) Data Persistence
[Express Backend] --(Session Data)--> [Database]

---

## Legend
- Arrows (-->): Direction of data flow
- [Brackets]: System/component/module
- (Parentheses): Type of data/request

---

This diagram shows the step-by-step flow of data and AI interaction in your application, from user input to AI-powered plan generation and UI update.
