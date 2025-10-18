import React, { useEffect, useState } from "react";
import "../style/typing.css";

export default function TypingText({ text = "", speed = 50, className = "", cursor = true }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    // respect user prefers-reduced-motion
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.matches) {
      setDisplay(text);
      return;
    }

    let i = 0;
    setDisplay("");
    const id = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span className={`typing-text ${className}`} aria-live="polite">
      {display}
      {cursor ? <span className="typing-cursor" aria-hidden="true">&nbsp;</span> : null}
    </span>
  );
}
