import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPeminjamanById, updatePeminjaman } from "../api/peminjaman";

export default function EditPeminjaman() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    barang: "",
    keperluan: "",
    tanggalPinjam: "",
    tanggalKembali: "",
    status: "Diajukan",
  });

  // GET DATA 1 ITEM
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getPeminjamanById(id);

      setForm({
        nama: data.nama,
        barang: data.barang,
        keperluan: data.keperluan,
        tanggalPinjam: data.tanggalPinjam
          ? data.tanggalPinjam.split("T")[0]
          : "",
        tanggalKembali: data.tanggalKembali
          ? data.tanggalKembali.split("T")[0]
          : "",
        status: data.status,
      });
    } catch (err) {
      alert("Gagal memuat data.");
      navigate("/admin");
    }
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updatePeminjaman(id, form);

      if (res.msg) alert(res.msg);
      alert("Data berhasil diperbarui!");

      navigate("/admin");
    } catch (err) {
      alert("Gagal update.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">Edit Peminjaman</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <div>
          <label className="block text-sm font-medium">Nama Pemohon</label>
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Barang</label>
          <input
            name="barang"
            value={form.barang}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Keperluan</label>
          <input
            name="keperluan"
            value={form.keperluan}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tanggal Pinjam</label>
          <input
            type="date"
            name="tanggalPinjam"
            value={form.tanggalPinjam}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Tanggal Akan Dikembalikan
          </label>
          <input
            type="date"
            name="tanggalKembali"
            value={form.tanggalKembali}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option>Diajukan</option>
            <option>Disetujui</option>
            <option>Dipinjam</option>
            <option>Dikembalikan</option>
            <option>Ditolak</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Batal
          </button>

          <button
            type="submit"
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
