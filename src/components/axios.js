import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9001/api", // adjust as needed
  auth: { username: "admin", password: "admin123" }
});

export default api;
