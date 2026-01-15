import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function History() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await api.post("/history.php", { user_id: user.id });
        setGames(res.data);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="center-page">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="center-page">
      <div style={{ width: "90%", maxWidth: "800px" }}>
        <h2>📜 Game History</h2>
        {games.length === 0 ? (
          <p>No games played yet. Start playing to see your history!</p>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#1e293b", borderRadius: "8px", overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#334155" }}>
                  <th style={{ padding: "12px", textAlign: "left" }}>Level</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Time</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Attempts</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Score</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game, index) => (
                  <tr key={index} style={{ borderTop: "1px solid #334155" }}>
                    <td style={{ padding: "12px", textTransform: "capitalize" }}>{game.level}</td>
                    <td style={{ padding: "12px" }}>{game.time}s</td>
                    <td style={{ padding: "12px" }}>{game.attempts}</td>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>{game.score}</td>
                    <td style={{ padding: "12px" }}>{new Date(game.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button onClick={() => navigate("/difficulty")} style={{ marginTop: "20px" }}>
          Back to Game
        </button>
      </div>
    </div>
  );
}

