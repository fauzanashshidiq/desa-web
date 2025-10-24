import axios from "axios";
import { API_URL } from "../utils/config";

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth`, { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Gagal login" };
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
