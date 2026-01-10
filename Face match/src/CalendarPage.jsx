import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarPage() {
  const [value, setValue] = useState(new Date());
  const [playedDates, setPlayedDates] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("playedDates")) || [];
    setPlayedDates(stored);
  }, []);

  
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      if (playedDates.includes(dateString)) {
        return "bg-success text-white rounded-circle";
      }
    }
    return null;
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <h2 className="mb-4">🗓️ Game Calendar</h2>
      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={tileClassName}
      />
      <p className="mt-3">
        Selected date: <strong>{value.toDateString()}</strong>
      </p>

      <button className="btn btn-secondary mt-4" onClick={() => navigate("/")}>
        🔙 Back to Home
      </button>
    </div>
  );
}
