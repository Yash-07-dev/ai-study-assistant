import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}, [messages, loading]);

  
async function handleSend(event) {
  event.preventDefault();

  const text = message.trim();
  if (!text || loading) return;

  setMessages((previous) => [
    ...previous,
    { role: "user", text },
  ]);

  setMessage("");
  setError("");
  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to get AI response.");
    }

    setMessages((previous) => [
      ...previous,
      { role: "assistant", text: data.reply },
    ]);
  } catch (err) {
    console.error("Chat request failed:", err);

    setError(
      err.message === "Failed to fetch"
        ? "Cannot connect to the backend. Check that it is running."
        : err.message
    );
  } finally {
    setLoading(false);
  }
}

  function clearChat() {
    setMessages([]);
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="brand-icon">S</div>
          <div>
            <h1>StudyMate AI</h1>
            <p>Your personal study assistant</p>
          </div>
        </div>

        <button
          className="clear-button"
          onClick={clearChat}
          disabled={messages.length === 0}
        >
          Clear chat
        </button>
      </header>

      <main className="chat-container">
        {messages.length === 0 ? (
          <section className="welcome">
            <div className="welcome-icon">✦</div>
            <h2>What do you want to learn today?</h2>
            <p>
              Ask a question, understand a concept,
              or get help with your studies.
            </p>

            <div className="suggestions">
              <button onClick={() => setMessage("Explain recursion simply")}>
                Explain recursion simply
              </button>
              <button onClick={() => setMessage("What is a database index?")}>
                What is a database index?
              </button>
              <button onClick={() => setMessage("Explain OOP concepts")}>
                Explain OOP concepts
              </button>
            </div>
          </section>
        ) : (
          
<section className="messages" aria-live="polite">
  {messages.map((item, index) => (
    <div
      className={`message-row ${item.role}`}
      key={index}
    >
      <div className="message-avatar">
        {item.role === "user" ? "Y" : "S"}
      </div>

      <div className="message-bubble">
        {item.text}
      </div>
    </div>
  ))}

  {loading && (
    <div className="loading-message">
      StudyMate AI is thinking...
    </div>
  )}

  <div ref={messagesEndRef} />
</section>
          
)}

        <form className="input-area" onSubmit={handleSend}>
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ask anything about your studies..."
            aria-label="Your question"
          />

          <button
            className="send-button"
            type="submit"
            disabled={!message.trim()}
          >
            Send ↑
          </button>
        </form>

        <p className="disclaimer">
          AI can make mistakes. Verify important information.
        </p>
      </main>
    </div>
  );
}

export default App;
