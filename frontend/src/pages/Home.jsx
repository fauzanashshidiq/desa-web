import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const Home = () => {
  const cibiruPosition = [-6.9346385, 107.7176171];

  return (
    <main className="flex w-full min-h-screen items-center justify-center pt-14 md:px-[8vw] px-[3vw]">
      <div className="flex flex-col md:flex-row w-full max-w-6xl items-center justify-center gap-10">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl font-sans w-full md:w-2/3">
          <div className="flex items-start gap-4">
            <img
              src="/src/main.jpg"
              alt="Foto Desa"
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-teal-700">Desa Cibiru</h2>
              <p className="text-md text-gray-600">
                Kecamatan Cileunyi, Kabupaten Bandung
              </p>
            </div>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">Visi</h3>
              <p className="text-sm italic text-gray-600 mt-1">
                "Terwujudnya Desa Cibiru yang Maju, Mandiri, dan Sejahtera
                melalui Pembangunan yang Berkelanjutan dan Berkeadilan"
              </p>
              <h3 className="mt-4 font-semibold text-gray-800 text-lg">Misi</h3>
              <ul className="text-sm text-gray-600 list-disc list-inside mt-1 space-y-1">
                <li>
                  Meningkatkan kualitas pelayanan publik yang cepat, tepat, dan
                  transparan.
                </li>
                <li>
                  Mengembangkan potensi ekonomi lokal berbasis pertanian dan
                  UMKM.
                </li>
                <li>
                  Meningkatkan kualitas sumber daya manusia melalui pendidikan
                  dan kesehatan.
                </li>
                <li>
                  Mewujudkan pembangunan infrastruktur yang merata dan
                  berkelanjutan.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">Statistik</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mt-2">
                <div>
                  <span className="font-semibold">2,45 Km²</span>
                  <br />
                  <span className="text-gray-500">Luas wilayah</span>
                </div>
                <div>
                  <span className="font-semibold">14</span>
                  <br />
                  <span className="text-gray-500">RW</span>
                </div>
                <div>
                  <span className="font-semibold">60</span>
                  <br />
                  <span className="text-gray-500">RT</span>
                </div>
                <div>
                  <span className="font-semibold">8,200</span>
                  <br />
                  <span className="text-gray-500">Penduduk</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 h-80 rounded-xl overflow-hidden shadow-md">
          <MapContainer
            center={cibiruPosition}
            zoom={15}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={cibiruPosition}>
              <Popup>
                <b>Desa Cibiru</b> <br /> Kecamatan Cileunyi, Kabupaten Bandung
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
};

export default Home;
