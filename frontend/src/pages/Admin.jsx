import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getBerita, addBerita, deleteBerita } from "../api/berita";
import { logout } from "../utils/auth";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Admin = () => {
  const navigate = useNavigate();
  const [berita, setBerita] = useState([]);
  const [judul, setJudul] = useState("");
  const [gambar, setGambar] = useState(null);
  const quillRef = useRef(null);
  const editorRef = useRef(null);

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
    </main>
  );
};

export default Admin;
