import { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "clinician", text: "Hello! How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { sender: "patient", text: input },
    ]);

    setInput("");
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-header">
          Chat with Your Clinician
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type your message..."
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="chat-send-btn"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
