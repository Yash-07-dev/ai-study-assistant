# AI Study Assistant

An AI-powered study chatbot that helps students understand programming and academic concepts through natural-language questions and AI-generated explanations.

## Features

- Chat interface with user and AI messages
- AI responses powered by Google Gemini
- Loading indicators and error handling
- Enter-to-send support
- Clear chat functionality
- Suggested study questions
- Responsive interface for desktop and mobile
- Secure server-side Gemini API key configuration

## Tech Stack

**Frontend:** React.js, Vite, CSS  
**Backend:** Node.js, Express.js  
**AI:** Google Gemini API, `@google/genai`  
**Communication:** REST API, `fetch()`

## Project Structure

```text
ai-study-assistant/
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ai-study-assistant
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
GEMINI_API_KEY=your_api_key_here
```

Replace the placeholder with your own key. Never commit this file.

Start the backend:

```bash
node server.js
```

The backend runs at `http://localhost:5000`.

### 3. Install and start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## API Reference

### POST `/api/chat`

Request:

```json
{
  "message": "Explain recursion simply"
}
```

Successful response:

```json
{
  "reply": "An AI-generated explanation..."
}
```

### GET `/api/test`

Checks whether the backend is running.

## Security

- The Gemini API key is stored in `backend/.env`.
- The key is accessed only by the backend.
- Environment files and dependency directories should be excluded from Git.
- Never publish API keys in source code or documentation.

## Learning Outcomes

- Building REST APIs with Express
- Integrating a generative AI API
- Managing React state and asynchronous requests
- Handling loading states and API errors
- Using environment variables to protect credentials
- Connecting a React frontend to a Node.js backend

## Future Improvements

- Render AI responses with Markdown formatting
- Preserve chat history
- Add streaming responses
- Deploy the frontend and backend
