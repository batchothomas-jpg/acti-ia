import { useNavigate } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate(); // ✅ OBLIGATOIRE

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const roleColors = {
    admin: "bg-red-100 text-red-700",
    directeur: "bg-blue-100 text-blue-700",
    animateur: "bg-green-100 text-green-700",
  };

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-4">
      {/* GAUCHE */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="text-2xl font-bold cursor-pointer"
        >
          ☰
        </button>

        <span className="font-semibold text-gray-800">
          Acti-IA
        </span>
      </div>

      {/* DROITE */}
      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {user.username}
          </span>

          <button
            onClick={() => navigate("/profil")} // ✅ fonctionne maintenant
            className="focus:outline-none"
          >
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                roleColors[user.role] || "bg-gray-200 text-gray-700"
              }`}
            >
              {user.role}
            </span>
          </button>
        </div>
      )}
    </header>
  );
}
