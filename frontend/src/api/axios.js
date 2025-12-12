import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // Needed for cookies
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    // If token expired
    if (err.response?.status === 403 && !original._retry) {
      original._retry = true;

      const refresh = await api.get("/auth/refresh");
      localStorage.setItem("accessToken", refresh.data.accessToken);

      api.defaults.headers.common["Authorization"] =
        "Bearer " + refresh.data.accessToken;

      return api(original);
    }
    return Promise.reject(err);
  }
);

export default api;
