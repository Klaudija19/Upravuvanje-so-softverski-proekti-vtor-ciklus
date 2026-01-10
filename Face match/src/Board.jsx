import React, { useEffect, useState } from "react";

export default function Board({ difficulty, onRestart }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // 📌 сите карти
  const allImages = [
    "/src/assets/cards/face1.png",
    "/src/assets/cards/face2.png",
    "/src/assets/cards/face3.png",
    "/src/assets/cards/face4.png",
    "/src/assets/cards/face5.png",
    "/src/assets/cards/face6.png",
    "/src/assets/cards/face7.png",
    "/src/assets/cards/face8.png",
  ];

  // 📌 број карти според тежина
  const getCardCount = () => {
    if (difficulty === "easy") return 4;
    if (difficulty === "medium") return 8;
    if (difficulty === "hard") return 12;
    return 4;
  };

  // 📌 иницијализација на карти
  useEffect(() => {
    const totalCards = getCardCount();
    const selected = allImages.slice(0, totalCards / 2);

    const doubled = [...selected, ...selected]
      .map((img, index) => ({ id: index, img }))
      .sort(() => Math.random() - 0.5);

    setCards(doubled);
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
    setTime(0);
    setGameOver(false);
  }, [difficulty]);

  // ⏱ тајмер
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver]);

  // 🎯 проверка на пар
  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].img === cards[second].img) {
        setMatched((prev) => [...prev, cards[first].img]);
      }
      setAttempts((a) => a + 1);
      setTimeout(() => setFlipped([]), 800);
    }
  }, [flipped]);

  // 🏁 крај на игра
  useEffect(() => {
    if (matched.length === cards.length / 2 && cards.length > 0) {
      setGameOver(true);
    }
  }, [matched]);

  // 💾 снимање во backend
  useEffect(() => {
    if (!gameOver) return;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    fetch("http://localhost/face-match-backend/saveGame.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        level: difficulty,
        time: time,
        attempts: attempts,
        score: Math.max(0, 1000 - time * 5 - attempts * 10),
      }),
    });
  }, [gameOver]);

  // 👉 клик на карта
  const handleFlip = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(cards[index].img)
    ) {
      return;
    }
    setFlipped([...flipped, index]);
  };

  // 🏆 WIN SCREEN
  if (gameOver) {
    return (
      <div style={container}>
        <h2>🎉 YOU WIN!</h2>
        <p>⏱ Time: {time}s</p>
        <p>🎯 Attempts: {attempts}</p>
        <button onClick={onRestart}>⬅ Back</button>
      </div>
    );
  }

  // 🎮 GAME SCREEN
  return (
    <div style={container}>
      <h2>{difficulty.toUpperCase()} MODE</h2>
      <p>⏱ {time}s | 🎯 Attempts: {attempts}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            difficulty === "easy"
              ? "repeat(2, 110px)"
              : "repeat(4, 110px)",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {cards.map((card, index) => {
          const isVisible =
            flipped.includes(index) || matched.includes(card.img);

          return (
            <div
              key={index}
              onClick={() => handleFlip(index)}
              style={{
                width: "110px",
                height: "110px",
                background: "#dee2e6",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {isVisible ? (
                <img
                  src={card.img}
                  alt="card"
                  style={{ width: "90px", height: "90px" }}
                />
              ) : (
                <span style={{ fontSize: "32px" }}>❓</span>
              )}
            </div>
          );
        })}
      </div>

      {/* ⬅ BACK */}
      <button style={{ marginTop: "30px" }} onClick={onRestart}>
        ⬅ Back
      </button>
    </div>
  );
}

// 🎨 центриран layout
const container = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#f8f9fa",
  textAlign: "center",
};





