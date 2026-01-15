import { useEffect, useState } from "react";

import f1 from "./assets/cards/face1.png";
import f2 from "./assets/cards/face2.png";
import f3 from "./assets/cards/face3.png";
import f4 from "./assets/cards/face4.png";
import f5 from "./assets/cards/face5.png";
import f6 from "./assets/cards/face6.png";
import f7 from "./assets/cards/face7.png";
import f8 from "./assets/cards/face8.png";

const allCards = [f1, f2, f3, f4, f5, f6, f7, f8];

export default function Board({ level, onBack }) {
  const pairs = level === "easy" ? 2 : level === "medium" ? 4 : 6;
  const [cards, setCards] = useState([]);
  const [opened, setOpened] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const selected = allCards.slice(0, pairs);
    const shuffled = [...selected, ...selected].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setOpened([]);
    setMatched([]);
  }, [level]);

  function clickCard(i) {
    if (opened.length === 2 || opened.includes(i) || matched.includes(i)) return;
    const newOpened = [...opened, i];
    setOpened(newOpened);

    if (newOpened.length === 2) {
      const [a, b] = newOpened;
      if (cards[a] === cards[b]) {
        setMatched([...matched, a, b]);
      }
      setTimeout(() => setOpened([]), 700);
    }
  }

  const cols = level === "easy" ? 2 : 4;

  return (
    <div className="center">
      <h2>{level.toUpperCase()} MODE</h2>

      <div className="board" style={{ gridTemplateColumns: `repeat(${cols}, 100px)` }}>
        {cards.map((c, i) => (
          <div className="card" key={i} onClick={() => clickCard(i)}>
            {(opened.includes(i) || matched.includes(i)) && (
              <img src={c} alt="" />
            )}
          </div>
        ))}
      </div>

      <button className="btn outline" onClick={onBack}>⬅ Back</button>
    </div>
  );
}






