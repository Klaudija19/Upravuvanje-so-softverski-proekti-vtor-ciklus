import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Board from "./Board";

export default function App() {
  const [difficulty, setDifficulty] = useState(null);
  const navigate = useNavigate();

  if (difficulty) {
    return (
      <Board
        difficulty={difficulty}
        onRestart={() => setDifficulty(null)}
      />
    );
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <h2 className="mb-4">Select difficulty</h2>

      <div className="d-flex gap-3 mb-4">
        <button
          className="btn btn-success btn-lg"
          onClick={() => setDifficulty("easy")}
        >
          Easy
        </button>

        <button
          className="btn btn-warning btn-lg"
          onClick={() => setDifficulty("medium")}
        >
          Medium
        </button>

        <button
          className="btn btn-danger btn-lg"
          onClick={() => setDifficulty("hard")}
        >
          Hard
        </button>
      </div>

      {/* ✅ BACK КОПЧЕ */}
      <button
        className="btn btn-outline-secondary"
        onClick={() => navigate("/")}
      >
        ⬅ Back
      </button>
    </div>
  );
}









