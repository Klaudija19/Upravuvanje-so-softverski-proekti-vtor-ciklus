import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/face-match-backend",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
