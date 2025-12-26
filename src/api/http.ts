import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.status === 401) {
      try {
        await axios.post(`${baseURL}/auth/refresh`)
        return
      } catch (error) {
        throw error
      }
    }
    throw error;
  }
);

export default api;