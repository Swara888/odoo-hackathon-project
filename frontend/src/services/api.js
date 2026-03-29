import axios from "axios";

const api = axios.create({
  // Your teammate's backend IP
  baseURL: "http://10.27.106.12:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Request Interceptor: Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Response Interceptor: Handle Global Errors (Crucial for Hackathons)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the backend says the token is invalid (401), kick user to Login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole"); // Clear role too
      window.location.href = "/login";
    }
    
    // Log errors to console so you can see them during the hackathon
    console.error("API Error:", error.response?.data || error.message);
    
    return Promise.reject(error);
  }
);

export default api;