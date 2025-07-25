import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "production"
    ? "https://your-production-api-url.com/api"
    : "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("clerkToken");
//     console.log(token);

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;

//     }
//     console.log('Headers:', config.headers);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default instance;
