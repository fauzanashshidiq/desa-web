import axios from "axios";
import { API_URL } from "../utils/config";

export const registerUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/api/users`, { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Gagal registrasi" };
  }
};
