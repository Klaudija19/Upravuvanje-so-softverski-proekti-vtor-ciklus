import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Difficulty from "./pages/Difficulty";
import Game from "./pages/Game";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./components/Navbar";
import "./App.css";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const showNavbar = user !== null;

  return (
    <BrowserRouter>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/difficulty" element={<Difficulty />} />
        <Route path="/game/:level" element={<Game />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}















