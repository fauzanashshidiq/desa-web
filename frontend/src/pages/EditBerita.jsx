import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { getBeritaById, updateBerita } from "../api/berita";
import { API_URL } from "../utils/config";

export default function EditBerita() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [judul, setJudul] = useState("");
  const [gambarLama, setGambarLama] = useState("");
  const [newImage, setNewImage] = useState(null);

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  // INIT QUILL
  useEffect(() => {
    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Tulis isi berita di sini...",
    });

    fetchBerita();
  }, []);

  // GET DATA
  const fetchBerita = async () => {
    try {
      const data = await getBeritaById(id);

      setJudul(data.judul);
      setGambarLama(data.gambar);
      quillRef.current.root.innerHTML = data.isi;
    } catch (err) {
      alert(err.message);
    }
  };

  // UPDATE
  const submitUpdate = async (e) => {
    e.preventDefault();

    const isiHTML = quillRef.current.root.innerHTML;

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("isi", isiHTML);
    if (newImage) formData.append("gambar", newImage);

    try {
      await updateBerita(id, formData);

      alert("Berita berhasil diperbarui");
      navigate("/admin");
    } catch (err) {
      alert(err.message);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto pt-24">
      <h1 className="text-3xl font-bold mb-6">Edit Berita</h1>

      <form
        onSubmit={submitUpdate}
        className="space-y-4 bg-white p-6 shadow rounded"
      >
        {/* JUDUL */}
        <div>
          <label className="block text-sm font-medium mb-1">Judul Berita</label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        {/* GAMBAR */}
        <div>
          <label className="block text-sm font-medium">Gambar Saat Ini</label>
          {gambarLama && (
            <img
              src={getImageUrl(gambarLama)}
              className="w-48 rounded mt-2 border"
              alt="Current"
            />
          )}
          <p className="text-xs text-gray-500 mt-2">
            Upload jika ingin mengganti gambar.
          </p>
        </div>

        <div>
          <input
            type="file"
            onChange={(e) => setNewImage(e.target.files[0])}
            className="w-full text-sm file:py-2 file:px-4 file:bg-emerald-50 file:text-emerald-700 file:rounded-md"
          />
        </div>

        {/* ISI BERITA */}
        <div>
          <label className="block text-sm font-medium mb-1">Isi Berita</label>
          <div
            ref={editorRef}
            className="bg-white border rounded"
            style={{ minHeight: "200px" }}
          ></div>
        </div>

        {/* BUTTON */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="py-2 px-4 bg-gray-200 rounded hover:bg-gray-300"
          >
            Batal
          </button>

          <button
            type="submit"
            className="py-2 px-4 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
