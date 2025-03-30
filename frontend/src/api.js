import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change this if deployed
});

// Automatically attach token to requests if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth APIs
export const login = (userData) => API.post("/users/login", userData);
export const register = (userData) => API.post("/users/register", userData);
export const getProfile = () => API.get("/users/profile");

// Task APIs
export const getTasks = () => API.get("/tasks");
export const getCompletedTasks = () => API.get("/tasks/completed"); // ✅ Added API to fetch completed tasks
export const addTask = (taskData) => API.post("/tasks", taskData);
export const updateTask = (taskId, taskData) => API.put(`/tasks/${taskId}`, taskData);
export const deleteTask = (taskId) => API.delete(`/tasks/${taskId}`);
