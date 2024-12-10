import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development" ? `${apiUrl}/api/v1` : "/api/v1",
  withCredentials: true,
});
