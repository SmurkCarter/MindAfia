import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const Chat = () => {

  const { appointmentId } = useParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  const socketRef = useRef(null);

  // 🚨 HARD BLOCK if appointmentId is invalid
  if (!appointmentId || appointmentId === "undefined") {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>No chat available</h2>
        <p>Please open chat from your appointment.</p>
      </div>
    );
  }

  // Load logged in user
  useEffect(() => {

    const loadUser = async () => {

      try {
        const res = await api.get("auth/me/");
        setUsername(res.data.username);
      } catch (err) {
        console.error("User fetch error", err);
      }

    };

    loadUser();

  }, []);


  // Load chat history
  useEffect(() => {

    const loadHistory = async () => {

      try {

        const res = await api.get(`chat/history/${appointmentId}/`);

        const history = res.data.map((msg) => ({
          sender: msg.sender_username,
          text: msg.message,
        }));

        setMessages(history);

      } catch (err) {

        console.error("Failed to load chat history", err);

      }

    };

    loadHistory();

  }, [appointmentId]);


  // WebSocket connection
  useEffect(() => {

    const token =
      localStorage.getItem("access") ||
      sessionStorage.getItem("access");

    const ws = new WebSocket(
      `ws://127.0.0.1:8080/ws/chat/${appointmentId}/?token=${token}`
    );

    socketRef.current = ws;

    ws.onopen = () => {
      console.log("Chat connected");
    };

    ws.onmessage = (event) => {

      const data = JSON.parse(event.data);

      setMessages((prev) => [
        ...prev,
        {
          sender: data.sender,
          text: data.message,
        },
      ]);

    };

    ws.onclose = () => {
      console.log("Chat disconnected");
    };

    return () => ws.close();

  }, [appointmentId]);


  const sendMessage = () => {

    if (!input.trim()) return;

    socketRef.current.send(
      JSON.stringify({
        message: input,
      })
    );

    setInput("");

  };


  return (

    <div className="chat-wrapper">

      <div className="chat-container">

        <div className="chat-header">
          Secure Appointment Chat
        </div>

        <div className="chat-messages">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`message ${
                msg.sender === username ? "patient" : "clinician"
              }`}
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