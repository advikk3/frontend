
import React from "react";
import "../style/card.css";
export default function ScoreCard({ score, maxScore, onRestart }) {
  const getBadge = () => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { label: "🔥 Master Survivor", color: "#e74c3c" };
    if (percentage >= 70) return { label: "⚡ Skilled Responder", color: "#ff8c00" };
    if (percentage >= 50) return { label: "🛡️ Prepared Civilian", color: "#f39c12" };
    return { label: "🚧 Needs Training", color: "#7f8c8d" };
  };

  const badge = getBadge();

  return (
    <div className="score-card">
      <div className="score-header">Final Score</div>
      <div className="score-value">{score} / {maxScore}</div>
      <div className="badge" style={{ backgroundColor: badge.color }}>
        {badge.label}
      </div>
      <button className="restart-button" onClick={onRestart}>
        Try Again 🔁
      </button>
    </div>
  );
}
  );
}