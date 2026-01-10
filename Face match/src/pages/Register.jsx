import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    await fetch("http://localhost/face-match-backend/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    navigate("/login");
  };

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2>Register</h2>
      <input className="mb-2" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input className="mb-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary" onClick={submit}>Register</button>
    </div>
  );
}

