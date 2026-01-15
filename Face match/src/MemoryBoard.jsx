import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MemoryBoard({ pairs }) {
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [matched, setMatched] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [gameOver]);

  useEffect(() => {
    if (matched === pairs) {
      setGameOver(true);
    }
  }, [matched, pairs]);

  return (
    <div className="center-container">
      <h2>GAME MODE</h2>

      {!gameOver ? (
        <>
          <p>⏱ Time: {time}s</p>
          <p>🎯 Attempts: {attempts}</p>

          {/* PLACEHOLDER CARDS */}
          <div className="cards">
            {Array.from({ length: pairs * 2 }).map((_, i) => (
              <div
                key={i}
                className="card"
                onClick={() => {
                  setAttempts((a) => a + 1);
                  setMatched((m) => Math.min(m + 1, pairs));
                }}
              >
                ?
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3>🎉 YOU WIN!</h3>
          <p>⏱ Time: {time} seconds</p>
          <p>🎯 Attempts: {attempts}</p>
          <p>⭐ Score: {pairs * 100 - attempts * 5}</p>
        </>
      )}

      <button className="btn outline" onClick={() => navigate("/game")}>
        ⬅ Back
      </button>
    </div>
  );
}
