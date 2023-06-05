import React, { useState, useEffect,useMemo } from "react";
import "./ColorSwitch.css";

const ColorSwitch = ({ onColorChange }) => {
  const predefinedThemes = useMemo(() => [
    {
      name: "Default",
      color: "#FFF",
      background: "linear-gradient(239.26deg, #ddeeed 63.17%, #fdf1e0 94.92%)",
    },
    {
      name: "Dark",
      color: "#ddd",
      background: "linear-gradient(239.26deg, #343434 63.17%, #000000 94.92%)",
    },
    {
      name: "Pink",
      color: "#21d190",
      background: " linear-gradient(315deg, #21d190 0%, #d65bca 74%)",
    },
    {
      name: "Purple",
      color: "#f6f6f6",
      background: "linear-gradient(239.26deg, #af89fb 63.17%, #9a70f4 94.92%)",
    },
  ], []);
  

  const [selectedTheme, setSelectedTheme] = useState(null);
  const [customTheme, setCustomTheme] = useState({ color: "", background: "" });

  useEffect(() => {
    const storedTheme = localStorage.getItem("selectedTheme");
    if (storedTheme) {
      setSelectedTheme(JSON.parse(storedTheme));
    } else {
      setSelectedTheme(predefinedThemes[0]);
    }
  }, [predefinedThemes]);

  useEffect(() => {
    if (selectedTheme) {
      localStorage.setItem("selectedTheme", JSON.stringify(selectedTheme));
      onColorChange(selectedTheme.color, selectedTheme.background);
    }
  }, [selectedTheme, onColorChange]);

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    onColorChange(theme.color, theme.background);
  };

  const handleCustomThemeChange = (event) => {
    const { name, value } = event.target;
    setCustomTheme((prevTheme) => ({
      ...prevTheme,
      [name]: value,
    }));
  };

  const applyCustomTheme = () => {
    if (customTheme.color && customTheme.background) {
      setSelectedTheme({ name: "Custom", ...customTheme });
      onColorChange(customTheme.color, customTheme.background);
    }
  };

  return (
    <div className="color-switch">
      <h3>Color Themes:</h3>
      <div className="theme-buttons">
        {predefinedThemes.map((theme, index) => (
          <button
            key={index}
            className={theme.name === selectedTheme?.name ? "selected" : ""}
            onClick={() => handleThemeChange(theme)}
          >
            {theme.name}
          </button>
        ))}
        <button
          className={selectedTheme?.name === "Custom" ? "selected" : ""}
          onClick={applyCustomTheme}
        >
          Custom
        </button>
      </div>
      <div className="custom-theme-inputs">
        <label>
          Text Color:
          <input
            type="color"
            name="color"
            value={customTheme.color}
            onChange={handleCustomThemeChange}
          />
        </label>
        <label>
          Background Color:
          <input
            type="color"
            name="background"
            value={customTheme.background}
            onChange={handleCustomThemeChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ColorSwitch;