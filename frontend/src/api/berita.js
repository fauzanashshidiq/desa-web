import { API_URL } from "../utils/config";

const token = localStorage.getItem("token");
const authHeader = { Authorization: `Bearer ${token}` };

export const getBerita = async () => {
  const res = await fetch(`${API_URL}/api/berita`);
  return res.json();
};

export const getBeritaById = async (id) => {
  const res = await fetch(`${API_URL}/api/berita/${id}`);
  if (!res.ok) throw new Error("Gagal mengambil detail berita");
  return res.json();
};

export const addBerita = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/berita/cloud`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.msg || "Gagal upload berita");
  }

  return res.json();
};

export const updateBerita = async (id, data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/berita/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.msg || "Gagal update berita");
  }

  return res.json();
};

export const deleteBerita = async (id) => {
  const res = await fetch(`${API_URL}/api/berita/${id}`, {
    method: "DELETE",
    headers: authHeader,
  });
  if (!res.ok) throw new Error("Gagal hapus berita");
  return res.json();
};
