import axios from "axios";

// ✅ Tạo instance axios
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL + "/api"
    : "http://localhost:4000/api", // fallback khi chưa có biến môi trường
  headers: { "Content-Type": "application/json" },
});

// ✅ Gắn token tự động vào header cho mọi request
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("🔑 Sending token:", token);

    if (token) {
      // đảm bảo headers tồn tại
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Xử lý lỗi 401 tự động logout
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("🚫 Token hết hạn hoặc không hợp lệ. Đang đăng xuất...");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
