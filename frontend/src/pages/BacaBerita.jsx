import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../utils/config";

const BacaBerita = () => {
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    loadBerita();
  }, [id]);

  const loadBerita = async () => {
    if (!id) {
      setBerita({ judul: "Berita tidak ditemukan.", isi: "" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/berita/${id}`);
      if (!response.ok) throw new Error("Gagal mengambil detail berita");
      const data = await response.json();

      data.tanggalFormatted = `Dipublikasikan pada ${new Date(
        data.tanggal
      ).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`;

      if (data.gambar && !data.gambar.startsWith("http")) {
        data.gambar = `${API_URL}${data.gambar}`;
      }

      setBerita(data);
      document.title = data.judul;
    } catch (error) {
      setBerita({ judul: "Gagal memuat berita.", isi: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="pt-20 px-4 md:px-[8vw] flex-1">
        <p className="text-center text-gray-500">Memuat berita...</p>
      </main>
    );
  }

  return (
    <main className="pt-20 px-4 md:px-[8vw] flex-1">
      {berita && (
        <article className="max-w-4xl mx-auto bg-white p-6 sm:p-8 shadow rounded-lg">
          <div className="mb-6">
            <Link
              to="/berita"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Kembali ke Daftar Berita
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {berita.judul}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            {berita.tanggalFormatted}
          </p>
          <img
            src={berita.gambar}
            alt={berita.judul}
            className="rounded-lg mb-6 w-full h-auto max-h-[500px] object-cover"
          />
          <div
            className="prose max-w-none text-gray-800 leading-relaxed ql-editor"
            dangerouslySetInnerHTML={{ __html: berita.isi }}
          />
        </article>
      )}
    </main>
  );
};

export default BacaBerita;
