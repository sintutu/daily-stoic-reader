import React, { useState, useEffect } from 'react';
import DailyReading from './pages/DailyReading';

const App: React.FC = () => {
  const [theme, setTheme] = useState("light-mode");

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === "light-mode" ? "dark-mode" : "light-mode";
    setTheme(newTheme);
    document.body.className = newTheme; // Update the body class globally
  };

  // Ensure theme is applied on initial render
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <div>
    {/* Add the toggle button */}
    <header>
      <button id="theme-toggle" onClick={toggleTheme}>
        Switch to {theme === "light-mode" ? "Dark Mode" : "Light Mode"}
      </button>
    </header>
    {/* Render your existing component */}
    <DailyReading />
  </div>
  );
};

export default App;
