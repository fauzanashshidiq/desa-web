import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Berita from "./pages/Berita";
import Layanan from "./pages/Layanan";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import BacaBerita from "./pages/BacaBerita";
import EditBerita from "./pages/EditBerita";
import EditPeminjaman from "./pages/EditPeminjaman";
import Artikel from "./pages/Artikel";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/berita" element={<Berita />} />
            <Route path="/layanan" element={<Layanan />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/berita/:id" element={<BacaBerita />} />
            <Route path="/edit-berita/:id" element={<EditBerita />} />
            <Route path="/edit-peminjaman/:id" element={<EditPeminjaman />} />
            <Route path="/artikel" element={<Artikel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
