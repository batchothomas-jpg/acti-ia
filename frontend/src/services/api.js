import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// mock temporaire
export function getCenterId() {
  return 1;
}
