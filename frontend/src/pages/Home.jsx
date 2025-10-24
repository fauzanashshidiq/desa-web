import React from "react";

const Home = () => {
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
        <div className="w-full md:w-1/3">
          <img
            src="/src/petaCibiru.png"
            alt="Peta Desa Cibiru"
            className="w-full h-auto rounded-xl shadow-md object-contain"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
