import { useEffect, useState } from "react";
import api from "../api";
import Card from "../components/Card";
import { useParams, useNavigate } from "react-router-dom";
import { images } from "../utils/gameConfig";

const config = {
  easy: { pairs: 2, cols: 2 },
  medium: { pairs: 4, cols: 4 },
  hard: { pairs: 6, cols: 4 },
};

export default function Game() {
  const { level } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [won, setWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!gameStarted || won) return;
    const interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [gameStarted, won]);

  useEffect(() => {
    const selectedImages = images.slice(0, config[level].pairs);
    const deck = [...selectedImages, ...selectedImages]
      .sort(() => Math.random() - 0.5)
      .map((img, i) => ({ id: i, image: img }));
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
    setTime(0);
    setWon(false);
    setGameStarted(false);
  }, [level]);

  const flip = (i) => {
    if (won || flipped.length === 2 || flipped.includes(i) || matched.includes(i)) return;
    if (!gameStarted) setGameStarted(true);
    setFlipped([...flipped, i]);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      setAttempts(a => a + 1);
      const [a, b] = flipped;
      if (cards[a] && cards[b] && cards[a].image === cards[b].image) {
        setMatched(m => [...m, a, b]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.length > 0 && matched.length === config[level].pairs * 2 && user) {
      setWon(true);
      const score = Math.max(1000 - time * 10 - attempts * 5, 0);
      api.post("/save_game.php", {
        user_id: user.id,
        level,
        time,
        attempts,
        score,
      }).catch(err => console.error("Failed to save game:", err));
    }
  }, [matched, level, time, attempts, user]);

  return (
    <div className="center-page">
      <h2>{level.toUpperCase()} MODE</h2>
      <p>⏱ {time}s | Attempts: {attempts}</p>

      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[level].cols}, 100px)` }}
      >
        {cards.map((c, i) => (
          <Card
            key={c.id}
            image={c.image}
            flipped={flipped.includes(i) || matched.includes(i)}
            onClick={() => flip(i)}
          />
        ))}
      </div>

      {won && (
        <div className="win-message">
          <h3>🎉 You Win!</h3>
          <p>Time: {time}s | Attempts: {attempts}</p>
        </div>
      )}

      <button onClick={() => navigate("/difficulty")}>Back</button>
    </div>
  );
}





