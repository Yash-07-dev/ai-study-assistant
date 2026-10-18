
import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function handleSend(event) {
    event.preventDefault();

    const text = message.trim();
    if (!text) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", text },
    ]);

    setMessage("");
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
          <section className="messages">
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
