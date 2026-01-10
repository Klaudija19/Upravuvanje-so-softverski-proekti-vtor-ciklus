import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import App from "./App.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/game" element={<App />} />
    </Routes>
  </BrowserRouter>
);
