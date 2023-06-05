import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.webp";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(localStorage.getItem("userImage") || null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the image to local storage
    localStorage.setItem("userImage", image);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    setUsername("");
    setPassword("");

    navigate("/home");
  };

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
  
    reader.onload = (event) => {
      const imageDataUrl = event.target.result;
      setImage(imageDataUrl);
      localStorage.setItem("image", imageDataUrl);
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>
          Login to Wysa{" "}
          <span style={{ verticalAlign: "middle", display: "inline-block" }}>
            <img
              src={Logo}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                verticalAlign: "middle",
              }}
              alt=""
            />
          </span>
        </h2>

        <div className="image-upload-container">
          <label htmlFor="imageInput" className="image-input-label">
            {image ? (
              <div className="circle-image">
                <img src={image} alt="User" className="preview-image" />
              </div>
            ) : (
              <div className="upload-box">
                <span>Add your avatar here</span>
              </div>
            )}
          </label>
          <input
            type="file"
            id="imageInput"
            required
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
