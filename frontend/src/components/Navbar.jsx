import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../utils/auth";

const Navbar = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUserInfo = () => {
      const token = localStorage.getItem("token");
      if (!token) return null;
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          return null;
        }
        return payload;
      } catch (e) {
        localStorage.removeItem("token");
        return null;
      }
    };

    const updateUserInfo = () => setUserInfo(getUserInfo());

    updateUserInfo();
    window.addEventListener("tokenChanged", updateUserInfo);
    window.addEventListener("storage", updateUserInfo);

    return () => {
      window.removeEventListener("tokenChanged", updateUserInfo);
      window.removeEventListener("storage", updateUserInfo);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUserInfo(null);
    window.dispatchEvent(new Event("tokenChanged"));
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-emerald-600 font-semibold"
      : "hover:text-emerald-600";

  return (
    <header className="flex items-center justify-between md:px-[8vw] px-[3vw] bg-white h-14 text-black shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="logo">
        <Link to="/" className="flex items-center gap-1">
          <img
            className="h-7 -mt-1"
            src="https://img.icons8.com/pastel-glyph/64/40C057/marker--v1.png"
            alt="marker--v1"
          />
          <span className="text-lg font-bold">Desa Cibiru</span>
        </Link>
      </div>
      <nav>
        <ul className="flex font-medium items-center gap-4">
          <li>
            <Link to="/" className={isActive("/")}>
              Profil
            </Link>
          </li>
          <li>
            <Link to="/berita" className={isActive("/berita")}>
              Berita
            </Link>
          </li>
          <li>
            <Link to="/layanan" className={isActive("/layanan")}>
              Layanan
            </Link>
          </li>

          {userInfo && userInfo.user && userInfo.user.role === "admin" && (
            <li>
              <Link
                to="/admin"
                className="font-semibold text-red-600 hover:text-red-700"
              >
                Admin Panel
              </Link>
            </li>
          )}

          <li>
            {userInfo ? (
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-sm font-semibold px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-emerald-600 text-sm font-semibold text-white px-4 py-1.5 rounded-md hover:bg-emerald-700"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
