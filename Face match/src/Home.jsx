import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">

      <h1 className="mb-4">🧠 Memory Game</h1>

      {!user ? (
        <>
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate("/register")}
          >
            Register
          </button>

          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </>
      ) : (
        <>
          <p className="mb-2">
            Logged in as <strong>{user.username}</strong>
          </p>

          <button
            className="btn btn-success mb-3"
            onClick={() => navigate("/game")}
          >
            Start Game
          </button>

          <button
            className="btn btn-outline-danger"
            onClick={logout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}



