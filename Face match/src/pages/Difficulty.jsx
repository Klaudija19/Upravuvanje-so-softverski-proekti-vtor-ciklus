import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Difficulty() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) {
      nav("/login");
    }
  }, [user, nav]);

  return (
    <div className="center-page">
      <div className="card-box" style={{ width: "400px" }}>
        <h2>Choose Difficulty</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          <button className="btn btn-green" onClick={() => nav("/game/easy")}>
            🟢 Easy (2 pairs)
          </button>

          <button className="btn btn-yellow" onClick={() => nav("/game/medium")}>
            🟡 Medium (4 pairs)
          </button>

          <button className="btn btn-red" onClick={() => nav("/game/hard")}>
            🔴 Hard (6 pairs)
          </button>
        </div>
      </div>
    </div>
  );
}


