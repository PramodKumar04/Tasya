import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatBot.css";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setHistory([...history, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        message,
        history: history.slice(-5) // Send last 5 messages for context
      });

      setHistory((prev) => [...prev, { role: "assistant", content: res.data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setHistory((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <button className={`chatbot-toggle ${isOpen ? 'open' : ''}`} onClick={toggleChat}>
        <span className="material-icons">{isOpen ? "close" : "smart_toy"}</span>
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h5>Tasya AI</h5>
            <p>Always here to help</p>
          </div>
          <div className="chatbot-messages" ref={scrollRef}>
            {history.length === 0 && (
              <div className="message assistant">
                Hello! I'm Tasya AI. How can I help you today?
              </div>
            )}
            {history.map((msg, i) => (
              <div key={i} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && <div className="message assistant typing">Typing...</div>}
          </div>
          <form className="chatbot-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              <span className="material-icons">send</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
