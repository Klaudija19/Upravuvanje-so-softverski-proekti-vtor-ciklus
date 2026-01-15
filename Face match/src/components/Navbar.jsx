import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/difficulty" className="navbar-brand">
          🎮 Face Match
        </Link>
        <div className="navbar-links">
          <Link to="/difficulty">Play</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/history">History</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          {user && (
            <span className="navbar-user">👤 {user.username}</span>
          )}
          <button onClick={handleLogout} className="navbar-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

