const API_URL = "http://localhost:5000";

export const getAspirasi = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/aspirasi`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const deleteAspirasi = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/aspirasi/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
