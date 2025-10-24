import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/config";

const Layanan = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [aspirasiForm, setAspirasiForm] = useState({ nama: "", aspirasi: "" });
  const [peminjamanForm, setPeminjamanForm] = useState({
    nama: "",
    barang: "",
    keperluan: "",
    tanggalPinjam: "",
    tanggalKembali: "",
  });

  useEffect(() => {
    const getUserInfo = () => {
      const token = localStorage.getItem("token");
      if (!token) return null;
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          return null;
        }
        return payload;
      } catch (e) {
        localStorage.removeItem("token");
        return null;
      }
    };
    setUserInfo(getUserInfo());
  }, []);

  const handleAspirasiSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/aspirasi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aspirasiForm),
      });
      if (!response.ok)
        throw new Error(
          (await response.json()).msg || "Gagal mengirim aspirasi"
        );
      alert("Terima kasih! Aspirasi Anda telah berhasil dikirim.");
      setAspirasiForm({ nama: "", aspirasi: "" });
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePeminjamanSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/api/peminjaman`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(peminjamanForm),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Gagal mengajukan peminjaman");
      alert("Pengajuan peminjaman Anda telah berhasil dikirim.");
      setPeminjamanForm({
        nama: "",
        barang: "",
        keperluan: "",
        tanggalPinjam: "",
        tanggalKembali: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="flex flex-col w-full min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl text-[#139B82] font-semibold">
            Layanan Masyarakat Desa
          </h1>
          <p className="text-gray-600 mt-2">
            Sampaikan aspirasi Anda atau ajukan peminjaman sarana dengan mudah.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Aspirasi Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-800 font-semibold text-xl pb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A4.992 4.992 0 017 17h10a4.992 4.992 0 011.879.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Aspirasi Masyarakat</span>
            </div>
            <form onSubmit={handleAspirasiSubmit} className="space-y-4">
              <input
                type="text"
                value={aspirasiForm.nama}
                onChange={(e) =>
                  setAspirasiForm({ ...aspirasiForm, nama: e.target.value })
                }
                placeholder="Nama Anda"
                required
                className="w-full p-3 rounded-md bg-gray-50 border border-gray-300 text-sm"
              />
              <textarea
                rows="4"
                value={aspirasiForm.aspirasi}
                onChange={(e) =>
                  setAspirasiForm({ ...aspirasiForm, aspirasi: e.target.value })
                }
                placeholder="Sampaikan aspirasi, saran, dan keluhan Anda di sini..."
                required
                className="w-full p-3 rounded-md bg-gray-50 border border-gray-300 text-sm"
              />
              <button
                type="submit"
                className="w-full bg-[#139B82] text-white py-2 rounded-md hover:bg-emerald-700 font-semibold transition"
              >
                Kirim Aspirasi
              </button>
            </form>
          </div>

          {/* Peminjaman Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-800 font-semibold text-xl pb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7M6 21h12a2 2 0 002-2v-7H4v7a2 2 0 002 2z"
                />
              </svg>
              <span>Peminjaman Sarana/Prasarana</span>
            </div>

            {userInfo ? (
              <form onSubmit={handlePeminjamanSubmit} className="space-y-4">
                <input
                  type="text"
                  value={peminjamanForm.nama}
                  onChange={(e) =>
                    setPeminjamanForm({
                      ...peminjamanForm,
                      nama: e.target.value,
                    })
                  }
                  placeholder="Nama Pemohon"
                  required
                  className="w-full p-3 rounded-md bg-gray-50 border border-gray-300 text-sm"
                />
                <input
                  type="text"
                  value={peminjamanForm.barang}
                  onChange={(e) =>
                    setPeminjamanForm({
                      ...peminjamanForm,
                      barang: e.target.value,
                    })
                  }
                  placeholder="Barang yang Dipinjam"
                  required
                  className="w-full p-3 rounded-md bg-gray-50 border border-gray-300 text-sm"
                />
                <input
                  type="text"
                  value={peminjamanForm.keperluan}
                  onChange={(e) =>
                    setPeminjamanForm({
                      ...peminjamanForm,
                      keperluan: e.target.value,
                    })
                  }
                  placeholder="Keperluan"
                  required
                  className="w-full p-3 rounded-md bg-gray-50 border border-gray-300 text-sm"
                />

                <div>
                  <label
                    htmlFor="tanggal-pinjam"
                    className="block text-xs font-medium text-gray-600 mb-1"
                  >
                    Tanggal Pinjam
                  </label>
                  <input
                    type="date"
                    id="tanggal-pinjam"
                    value={peminjamanForm.tanggalPinjam}
                    onChange={(e) =>
                      setPeminjamanForm({
                        ...peminjamanForm,
                        tanggalPinjam: e.target.value,
                      })
                    }
                    required
                    min={today}
                    className="w-full p-3 rounded-md bg-gray-50 border border-gray-300 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tanggal-kembali"
                    className="block text-xs font-medium text-gray-600 mb-1"
                  >
                    Tanggal Kembali
                  </label>
                  <input
                    type="date"
                    id="tanggal-kembali"
                    value={peminjamanForm.tanggalKembali}
                    onChange={(e) =>
                      setPeminjamanForm({
                        ...peminjamanForm,
                        tanggalKembali: e.target.value,
                      })
                    }
                    required
                    min={today}
                    className="w-full p-3 rounded-md bg-gray-50 border border-gray-300 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#139B82] text-white py-2 rounded-md hover:bg-emerald-700 font-semibold transition"
                >
                  Ajukan Peminjaman
                </button>
              </form>
            ) : (
              <div className="text-center text-gray-600 bg-gray-100 p-4 rounded-md">
                <p>
                  Anda harus{" "}
                  <Link
                    to="/login"
                    className="text-emerald-600 font-bold hover:underline"
                  >
                    login
                  </Link>{" "}
                  terlebih dahulu untuk mengajukan peminjaman.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layanan;
