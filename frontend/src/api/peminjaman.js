const API_URL = "http://localhost:5000";

// GET ALL
export const getPeminjaman = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/peminjaman`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

// GET BY ID
export const getPeminjamanById = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/peminjaman/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

// UPDATE
export const updatePeminjaman = async (id, data) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/peminjaman/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// DELETE
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
