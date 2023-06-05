import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ColorSwitch from "../ColorSwitch/ColorSwitch";
import "./Home.css";
import { AiOutlineLogout } from "react-icons/ai";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [image, setImage] = useState(localStorage.getItem("image") || "");

  if (!localStorage.getItem("selectedTheme")) {
    localStorage.setItem(
      "selectedTheme",
      JSON.stringify({
        name: "Default",
        color: "#FFF",
        background:
          "linear-gradient(239.26deg, #ddeeed 63.17%, #fdf1e0 94.92%)",
      })
    );
  }
  const parsedTheme = JSON.parse(localStorage.getItem("selectedTheme"));

  const delay = parseInt(queryParams.get("delay")) || 1000;

  const messagesArray = [
    { type: "predefined", text: "Hi there! 👋", delay },
    {
      type: "predefined",
      text: "I'm Wysa - an AI chatbot built by therapists.",
      delay,
    },
    {
      type: "predefined",
      text: "I'm here to understand your concerns and connect you with the best resources available to support you.",
      delay,
    },

    { type: "predefined", text: "Can I help?", delay },
  ];

  const [messageColor, setMessageColor] = useState(parsedTheme.color || "#FFF");
  const [containerBackground, setContainerBackground] = useState(
    parsedTheme.background ||
      "linear-gradient(239.26deg, #ddeeed 63.17%, #fdf1e0 94.92%)"
  );
  const [showColorSwitch, setShowColorSwitch] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [messages, setMessages] = useState(messagesArray);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentMessageIndex < messages.length - 1) {
        setCurrentMessageIndex(currentMessageIndex + 1);
      }
    }, messages[currentMessageIndex].delay);

    return () => clearTimeout(timer);
  }, [currentMessageIndex, messages]);

  const handleColorChange = (color, background) => {
    setMessageColor(color);
    setContainerBackground(background);
  };

  const handleButtonClick = () => {
    setShowColorSwitch(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputText) {
      const newMessage = { text: inputText, type: "user" };
      setInputText("");
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };
  const handleLogout = () => {
    // Clear the local storage and reset the state
    localStorage.removeItem("username");
    localStorage.removeItem("image");
    localStorage.removeItem("password");
    localStorage.removeItem("userImage");
    setUsername("");
    setImage(null);
    navigate("/");
  };

  return (
    <div className="home-container" style={{ background: containerBackground }}>
      <div className="profile-container">
        <div className="profile-info">
          <div className="profile-text">
           
            {image && <img src={image} alt="Profile" />}
          </div>
          <div className="logout-icon" onClick={handleLogout}>
            <AiOutlineLogout />
          </div>
        </div>
      </div>
      <div className="messages">
        {messages.slice(0, currentMessageIndex + 1).map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === "user" ? "right" : ""}`}
            style={{ backgroundColor: messageColor }}
          >
            {message.text}
            {message.image && (
              <img src={message.image} alt="chat" className="message-image" />
            )}
          </div>
        ))}
      </div>
      <form className="input-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
      {!showColorSwitch && (
        <button className="color-switch-button" onClick={handleButtonClick}>
          Change Theme
        </button>
      )}
      {showColorSwitch && <ColorSwitch onColorChange={handleColorChange} />}
    </div>
  );
};

export default Home;
