import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getBerita, addBerita, deleteBerita } from "../api/berita";
import { getPeminjaman, deletePeminjaman } from "../api/peminjaman";
import { getAspirasi, deleteAspirasi } from "../api/aspirasi";
import { logout } from "../utils/auth";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Link } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [berita, setBerita] = useState([]);
  const [judul, setJudul] = useState("");
  const [gambar, setGambar] = useState(null);
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const [peminjaman, setPeminjaman] = useState([]);
  const [aspirasi, setAspirasi] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now() || payload.user.role !== "admin") {
        alert("Akses Ditolak!");
        logout();
      }
    } catch {
      logout();
    }
  }, [navigate]);

  useEffect(() => {
    getBerita()
      .then(setBerita)
      .catch(() => alert("Gagal memuat berita"));
  }, []);

  useEffect(() => {
    if (quillRef.current) return;
    if (!editorRef.current) return;

    const editor = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Tulis isi berita...",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      },
    });

    quillRef.current = editor;

    return () => {
      quillRef.current = null;
      if (editorRef.current) editorRef.current.innerHTML = "";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isi = quillRef.current.root.innerHTML;
    if (!judul || !gambar || !isi.trim()) {
      return alert("Harap isi semua field.");
    }
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("isi", isi);
    formData.append("gambar", gambar);

    try {
      await addBerita(formData);
      alert("Berita berhasil diupload!");
      setJudul("");
      setGambar(null);
      getBerita().then(setBerita);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus berita ini?")) return;
    try {
      await deleteBerita(id);
      setBerita(berita.filter((b) => b._id !== id));
    } catch {
      alert("Gagal menghapus berita");
    }
  };

  useEffect(() => {
    fetchPeminjaman();
    fetchAspirasi();
  }, []);

  const fetchPeminjaman = async () => {
    const data = await getPeminjaman();
    setPeminjaman(data);
  };

  const handleDeletePeminjaman = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data peminjaman?")) return;
    await deletePeminjaman(id);
    fetchPeminjaman();
  };

  const fetchAspirasi = async () => {
    const data = await getAspirasi();
    setAspirasi(data);
  };

  const handleDeleteAspirasi = async (id) => {
    if (!window.confirm("Yakin ingin menghapus aspirasi ini?")) return;
    await deleteAspirasi(id);
    fetchAspirasi();
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Berita Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Judul Berita
            </label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gambar (Thumbnail)
            </label>
            <input
              type="file"
              onChange={(e) => setGambar(e.target.files[0])}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Isi Berita
            </label>
            <div
              ref={editorRef}
              id="editor"
              className="bg-white min-h-[200px] border border-gray-300 rounded-md"
            ></div>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 font-semibold transition"
          >
            Upload Berita
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Kelola Berita</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Judul
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {berita.length > 0 ? (
                berita.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 text-sm">{item.judul}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(item.tanggal).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/edit-berita/${item._id}`}
                        className="text-emerald-600 hover:text-emerald-900 mr-2"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Tidak ada berita.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 mt-7 rounded-lg shadow mb-10">
        <h2 className="text-xl font-bold mb-4">Manajemen Peminjaman Sarana</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-600">
              TOTAL PENGAJUAN
            </h4>
            <p className="text-3xl font-bold text-blue-800">
              {peminjaman.length}
            </p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-600">
              BARANG DIPINJAM
            </h4>
            <p className="text-3xl font-bold text-yellow-800">
              {peminjaman.filter((p) => p.status === "Dipinjam").length}
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="text-sm font-medium text-green-600">
              SUDAH DIKEMBALIKAN
            </h4>
            <p className="text-3xl font-bold text-green-800">
              {peminjaman.filter((p) => p.status === "Dikembalikan").length}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Pemohon
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Barang
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tanggal Pinjam
                </th>
                <th className="px-4 py-3 text-left text-xs fondedium text-gray-500 uppercase">
                  Tanggal Kembali
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {peminjaman.length > 0 ? (
                peminjaman.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3">{item.nama}</td>
                    <td className="px-4 py-3">{item.barang}</td>
                    <td className="px-4 py-3">
                      {new Date(item.tanggalPinjam).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-3">
                      {item.tanggalKembali
                        ? new Date(item.tanggalKembali).toLocaleDateString(
                            "id-ID"
                          )
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded 
                          ${
                            item.status === "Diajukan"
                              ? "bg-yellow-100 text-yellow-800"
                              : item.status === "Dikembalikan"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Dipinjam"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }
                        `}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/edit-peminjaman/${item._id}`}
                        className="text-emerald-600 hover:text-emerald-900 mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeletePeminjaman(item._id)}
                        className="text-red-500 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-4 text-center" colSpan="6">
                    Tidak ada data peminjaman.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Kelola Aspirasi</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nama
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Aspirasi
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {aspirasi.length > 0 ? (
                aspirasi.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3">{item.nama}</td>
                    <td className="px-4 py-3">{item.aspirasi}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded bg-gray-100">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDeleteAspirasi(item._id)}
                        className="text-red-500 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-4 text-center" colSpan="4">
                    Tidak ada aspirasi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Admin;
