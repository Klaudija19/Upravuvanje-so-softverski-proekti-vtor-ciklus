import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (user) {
      navigate("/difficulty");
    }
  }, [user, navigate]);

  return (
    <div className="page-center">
      <h1>🎮 Face Matching Game</h1>
      <p style={{ fontSize: "1.2rem", color: "#94a3b8", marginBottom: "30px" }}>
        Test your memory by matching pairs of cards!
      </p>

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center" }}>
        <button className="btn btn-blue" onClick={() => navigate("/login")}>
          Login
        </button>

        <button className="btn btn-blue" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
}









