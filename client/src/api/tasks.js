import axios from "axios";

const API = "https://ai-productivity-companion-1.onrender.com";
const API = import.meta.env.VITE_API_URL;

axios.get(`${API}/plan`);

export const getTasks = () => axios.get(`${API}/tasks`);

export const addTask = (task) => axios.post(`${API}/tasks`, task);

export const deleteTask = (id) =>
  axios.delete(`${API}/tasks/${id}`);

export const completeTask = (id) =>
  axios.put(`${API}/tasks/${id}/complete`);

export const breakdownTask = (title) =>
  axios.post(`${API}/breakdown`, { title });