import axios from "axios";
import { API_URL } from "./config";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
