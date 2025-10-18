// src/pages/Home.jsx
import React, { useState } from "react";
import "./Home.css";
import TypingText from "../main/components/TypingText";
import Quiz from "../main/components/quizcard";

export default function Home() {
  // State to show Quiz or Home content
  const [startQuiz, setStartQuiz] = useState(false);

  // Triggered when user clicks "Enter the Arena"
  const handleStart = () => {
    console.log("Starting the arena...");
    setStartQuiz(true); // ✅ this will render <Quiz />
  };

  // If quiz started, render the Quiz component
  if (startQuiz) {
    return <Quiz />;
  }

  // Otherwise render Home page
  return (
    <div className="home-container">
      {/* Background */}
      <div
        className="home-bg"
        style={{
          backgroundImage: `url("/ad5c756e-9c96-4ca5-9a01-2a3ea7f71bd2.png")`,
        }}
      >
        <div className="overlay"></div>
      </div>

    <div className="home-container">
      <div className="home-bg"></div>
      <div className="overlay"></div>

      <div className="home-content">
        {/* header, hero, footer, etc */}
      </div>
    </div>


      {/* Content */}
      <div className="home-content">
        {/* Header */}
        <header className="home-header">
          <div className="home-logo">DO OR DIE</div>
          <nav className="home-nav">
            <a href="#">Home</a>
            <a href="#">Campaign</a>
            <a href="#">About</a>
            <a href="#">Leaderboard</a>
          </nav>
          <button className="login-btn">Login / Sign Up</button>
        </header>

        {/* Hero section */}
        <main className="home-hero">
          <h1 className="hero-title">DO OR DIE</h1>
          <p className="hero-subtitle">Every choice could be your last.</p>
          <button className="hero-btn" onClick={handleStart}>
            Enter the Arena
          </button>
          <p className="hero-desc">
            <TypingText
              text={`Face impossible scenarios. Choose wisely. Survive... or don't.`}
              speed={40}
            />
          </p>
        </main>

        {/* Footer */}
        <footer className="home-footer">
          <div className="footer-links">
            <a href="#">Terms</a>
            <a href="#">Privacy Policy</a>
          </div>
          <p>© 2024 Do or Die. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
