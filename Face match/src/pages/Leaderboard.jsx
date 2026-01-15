import { useEffect, useState } from "react";
import api from "../api";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get("/leaderboard.php");
        setLeaderboard(res.data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="center-page">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="center-page">
      <div style={{ width: "90%", maxWidth: "600px" }}>
        <h2>🏆 Leaderboard</h2>
        {leaderboard.length === 0 ? (
          <p>No players yet. Be the first to play!</p>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#1e293b", borderRadius: "8px", overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#334155" }}>
                  <th style={{ padding: "12px", textAlign: "left" }}>Rank</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Username</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Best Score</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Games</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player, index) => (
                  <tr key={index} style={{ borderTop: "1px solid #334155" }}>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                    </td>
                    <td style={{ padding: "12px" }}>{player.username}</td>
                    <td style={{ padding: "12px", fontWeight: "bold", color: "#38bdf8" }}>{player.best_score}</td>
                    <td style={{ padding: "12px" }}>{player.total_games}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
