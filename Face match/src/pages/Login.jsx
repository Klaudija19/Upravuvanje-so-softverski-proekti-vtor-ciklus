import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    const res = await fetch("http://localhost/face-match-backend/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2>Login</h2>
      <input className="mb-2" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input className="mb-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-success" onClick={submit}>Login</button>
    </div>
  );
}
