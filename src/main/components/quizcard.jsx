import React, { useState, useEffect } from "react";
import "../style/quiz.css";

import scenesData from "./scenes.json";

export default function Quiz() {
  const time = 15
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(time);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timerActive, setTimerActive] = useState(true);

  const [scenarioList, setScenarioList] = useState([]);
  const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};
  useEffect(() => {
  const rawList = Array.isArray(scenesData)
    ? scenesData
    : scenesData.scenarios
    ? scenesData.scenarios
    : scenesData.data
    ? scenesData.data
    : [];

  const shuffled = shuffleArray(rawList);
  setScenarioList(shuffled);
}, []);


    
  useEffect(() => {
    console.log('Scenarios loaded:', scenarioList);
    console.log('Current scenario:', scenarioList[currentIndex]);
    
    if (!timerActive || isAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return Math.max(prev - 0.1, 0);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [timerActive, isAnswered, currentIndex]);

  const handleTimeUp = () => {
    setTimerActive(false);
    setIsAnswered(true);
    if (!selectedOption && scenarioList[currentIndex]?.options?.[0]) {
      //setSelectedOption(scenarioList[currentIndex].options[0]);
      handleNext();
    }
  };

  const current = scenarioList[currentIndex];


  const handleOptionClick = (option) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    setTimerActive(false);
    
    if (option.correct) {
      const points = option.score ? option.score * 100 : 100;
      setScore(prev => prev + points);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(time);
    setTimerActive(true);
    
    if (currentIndex < scenarioList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert(`Game over! Your final score is ${score}`);
      setCurrentIndex(0);
      setScore(0);
    }
  };

  const handleTimeChange = (e) => {
    if (!isAnswered) {
      setTimeLeft(parseFloat(e.target.value));
    }
  };

  if (!scenarioList || scenarioList.length === 0) {
    return (
      <div className="no-scenarios">
        <h2>No scenarios loaded</h2>
        <p>Please check your JSON file structure.</p>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="no-scenarios">
        <h2>Invalid scenario data</h2>
        <p>Current index: {currentIndex}</p>
        <p>Total scenarios: {scenarioList.length}</p>
        <button onClick={() => setCurrentIndex(0)}>Reset to first scenario</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        {/* Header */}
        <div className="quiz-header">
          <div className="situation-number">
            SITUATION #{current.id ? current.id.toString().padStart(1, "0") : "1"}
          </div>
          <h1 className="disaster-title">{current.disaster || "Unknown Disaster"}</h1>
        </div>

        {/* Question */}
        <div className="question-section">
          <p className="question-text">{current.question || "No question available"}</p>
        </div>

        {/* Options - Horizontal Layout */}
        <div className="options-horizontal">
          {current.options && current.options.map((option, index) => (
            <div 
              key={index}
              className={`option-card ${selectedOption === option ? 'selected' : ''} ${isAnswered ? 'answered' : ''} ${selectedOption === option ? (option.correct ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              <div className="option-header">
                <div className="option-letter">{String.fromCharCode(65 + index)}</div>
                <div className="option-indicator">
                  {selectedOption === option && (
                    option.correct ? "✓" : "✗"
                  )}
                </div>
              </div>
              <div className="option-text">{option.text}</div>
              
            </div>
          ))}
        </div>

        {/* Explanation */}
        {selectedOption && (
          <div className={`explanation ${selectedOption.correct ? 'correct' : 'incorrect'}`}>
            <div className="explanation-header">
              {selectedOption.correct ? "✓ Correct Choice!" : "✗ Incorrect Choice"}
            </div>
            <div className="explanation-text">{selectedOption.explanation}</div>
          </div>
        )}

        {/* Footer */}
        <div className="quiz-footer">
          <div className="time-section">
            <div className="time-header">
              <span>Time</span>
              <span>{timeLeft.toFixed(1)}s</span>
            </div>
            <div className="time-bar-container">
              <input
                type="range"
                min="0"
                max= "10"
                step="1"
                value={timeLeft}
                onChange={handleTimeChange}
                className="time-slider"
                disabled={isAnswered}
              />
              <div 
                className="time-bar-fill" 
                style={{ width: `${(timeLeft / time) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="score-section">
            <span className="score-label">SCORE:</span>
            <span className="score-value">{score}</span>
          </div>

          <button 
            className="next-button"
            onClick={handleNext}
            disabled={!isAnswered}
          >
            NEXT &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}