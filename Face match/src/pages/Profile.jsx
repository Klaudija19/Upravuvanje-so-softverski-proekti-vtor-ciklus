import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await api.post("/profile.php", { user_id: user.id });
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="center-page">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="center-page">
      <div className="card-box" style={{ width: "400px" }}>
        <h2>👤 Profile</h2>
        <div style={{ textAlign: "left", marginTop: "20px" }}>
          <p><strong>Username:</strong> {user?.username}</p>
          {stats && (
            <>
              <p><strong>Total Games:</strong> {stats.total_games || 0}</p>
              <p><strong>Best Score:</strong> {stats.best_score || 0}</p>
              <p><strong>Average Score:</strong> {Math.round(stats.avg_score || 0)}</p>
              <p><strong>Last Played:</strong> {stats.last_played ? new Date(stats.last_played).toLocaleString() : "Never"}</p>
            </>
          )}
        </div>
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button onClick={() => navigate("/difficulty")} style={{ flex: 1 }}>
            Play Game
          </button>
          <button onClick={handleLogout} style={{ flex: 1, background: "#ef4444" }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
