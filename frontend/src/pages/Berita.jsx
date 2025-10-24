import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/config";

const Berita = () => {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const response = await fetch(`${API_URL}/api/berita`);
      if (!response.ok) throw new Error("Gagal mengambil data berita");
      const data = await response.json();
      setBerita(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col w-full min-h-screen pt-20 bg-[#D9FFE6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl text-emerald-600 font-semibold mb-8">
          Berita & Artikel Desa
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center text-gray-500">
              Memuat berita...
            </div>
          ) : berita.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              Belum ada berita yang dipublikasikan.
            </p>
          ) : (
            berita.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden"
              >
                <Link to={`/berita/${item._id}`}>
                  <img
                    className="w-full h-48 object-cover"
                    src={
                      item.gambar.startsWith("http")
                        ? item.gambar
                        : `${API_URL}${item.gambar}`
                    }
                    alt={item.judul}
                  />
                </Link>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-emerald-700 mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <Link to={`/berita/${item._id}`}>
                    <h2 className="text-lg font-bold tracking-tight text-gray-900">
                      {item.judul}
                    </h2>
                  </Link>
                  <p className="flex-grow my-3 font-normal text-gray-600 text-sm">
                    {item.isi.replace(/<[^>]+>/g, "").substring(0, 100) + "..."}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/berita/${item._id}`}
                      className="inline-flex items-center font-semibold text-emerald-600 hover:text-emerald-800"
                    >
                      Baca Selengkapnya
                      <svg
                        className="w-4 h-4 ms-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Berita;
