const API_URL = "http://localhost:5000";

export const getPeminjaman = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/peminjaman`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const deletePeminjaman = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/peminjaman/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
