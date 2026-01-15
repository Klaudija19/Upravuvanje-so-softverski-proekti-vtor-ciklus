import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e?.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/register.php", { username, password });

      if (res.data.success) {
        navigate("/login");
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-page">
      <div className="card-box">
        <h2>Register</h2>
        {error && <p style={{ color: "#ef4444", fontSize: "14px" }}>{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Already have an account? <Link to="/login" style={{ color: "#38bdf8" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}




