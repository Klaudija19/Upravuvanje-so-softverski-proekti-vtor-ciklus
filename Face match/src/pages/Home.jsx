import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h1 className="mb-4">🎭 Face Matching Game</h1>

      {!user && (
        <>
          <button
            className="btn btn-primary btn-lg mb-3"
            onClick={() => navigate("/register")}
          >
            Register
          </button>

          <button
            className="btn btn-outline-primary btn-lg"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </>
      )}

      {user && (
        <>
          <p className="mb-3">Welcome, <b>{user.username}</b></p>

          <button
            className="btn btn-success btn-lg mb-3"
            onClick={() => navigate("/game")}
          >
            🎮 Start Game
          </button>

          <button
            className="btn btn-outline-danger"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}


