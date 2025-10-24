import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { registerUser } from "../api/users";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [formData, setFormData] = useState({
    loginEmail: "",
    loginPassword: "",
    registerEmail: "",
    registerPassword: "",
  });
  const navigate = useNavigate();

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    showMessage("processing", "Mencoba masuk...");

    try {
      const data = await loginUser(formData.loginEmail, formData.loginPassword);
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("tokenChanged"));
      showMessage("success", "Login berhasil! Anda akan dialihkan...");

      setTimeout(() => {
        navigate(data.user && data.user.role === "admin" ? "/admin" : "/");
      }, 1500);
    } catch (error) {
      showMessage("error", error.message || "Login gagal.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    showMessage("processing", "Mendaftarkan akun...");

    try {
      await registerUser(formData.registerEmail, formData.registerPassword);
      showMessage("success", "Registrasi berhasil! Silakan login.");
      setTimeout(() => {
        setMode("login");
        setMessage("");
      }, 1500);
    } catch (error) {
      showMessage("error", error.message || "Registrasi gagal.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="flex flex-row h-screen w-screen pt-14">
      {/* Kolom Gambar */}
      <div className="hidden md:block w-3/5 h-full">
        <div className="bg-amber-600 h-full w-full">
          <img
            className="w-full h-full object-cover"
            src="/src/main.jpg"
            alt="Pemandangan Desa"
          />
        </div>
      </div>

      <div className="w-full md:w-2/5 h-full flex items-center justify-center p-6 md:px-12 bg-white overflow-auto">
        <div className="w-full max-w-sm">
          {mode === "login" ? (
            <div>
              <h2 className="text-2xl font-bold text-[#139B82] mb-6 text-center">
                Masuk Akun Warga
              </h2>
              {message && (
                <div
                  className={`mb-4 p-3 rounded-lg text-center text-sm ${
                    messageType === "success"
                      ? "bg-green-100 text-green-800"
                      : messageType === "error"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {message}
                </div>
              )}
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="loginEmail"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="loginEmail"
                    name="loginEmail"
                    value={formData.loginEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full h-[52px] p-3 pl-5 rounded-lg bg-[#F0EDFFCC] font-medium text-sm border border-gray-300 focus:ring-2 focus:ring-[#139B82]"
                    placeholder="Masukkan email Anda"
                  />
                </div>
                <div>
                  <label
                    htmlFor="loginPassword"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="loginPassword"
                    name="loginPassword"
                    value={formData.loginPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full h-[52px] p-3 pl-5 rounded-lg bg-[#F0EDFFCC] font-medium text-sm border border-gray-300 focus:ring-2 focus:ring-[#139B82]"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-[50px] bg-[#139B82] text-white p-2 rounded-lg font-bold hover:bg-emerald-700 transition-colors"
                >
                  Login Now
                </button>
                <p className="text-sm text-center mt-4 text-gray-600">
                  Belum punya akun?
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setMessage("");
                    }}
                    className="text-[#139B82] hover:underline font-semibold ml-1"
                  >
                    Daftar
                  </button>
                </p>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-[#139B82] mb-6 text-center">
                Registrasi Akun Warga
              </h2>
              {message && (
                <div
                  className={`mb-4 p-3 rounded-lg text-center text-sm ${
                    messageType === "success"
                      ? "bg-green-100 text-green-800"
                      : messageType === "error"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {message}
                </div>
              )}
              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label
                    htmlFor="registerEmail"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="registerEmail"
                    name="registerEmail"
                    value={formData.registerEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full h-[52px] p-3 pl-5 rounded-lg bg-[#F0EDFFCC] font-medium text-sm border border-gray-300 focus:ring-2 focus:ring-[#139B82]"
                    placeholder="Masukkan email Anda"
                  />
                </div>
                <div>
                  <label
                    htmlFor="registerPassword"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="registerPassword"
                    name="registerPassword"
                    value={formData.registerPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full h-[52px] p-3 pl-5 rounded-lg bg-[#F0EDFFCC] font-medium text-sm border border-gray-300 focus:ring-2 focus:ring-[#139B82]"
                    placeholder="Buat password (min. 6 karakter)"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-[50px] bg-[#139B82] text-white p-2 rounded-lg font-bold hover:bg-emerald-700 transition-colors"
                >
                  Daftar Sekarang
                </button>
                <p className="text-sm text-center mt-4 text-gray-600">
                  Sudah punya akun?
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setMessage("");
                    }}
                    className="text-[#139B82] hover:underline font-semibold ml-1"
                  >
                    Login
                  </button>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Login;
