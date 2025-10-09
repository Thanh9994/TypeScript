import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: { "Content-Type": "application/json" },
});

// ví dụ interceptor
http.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(err?.response || err);
    return Promise.reject(err);
  }
);
