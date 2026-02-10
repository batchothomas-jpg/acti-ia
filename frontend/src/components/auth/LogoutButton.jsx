import { useNavigate } from "react-router-dom";

export default function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    // 🔒 fermeture du menu
    if (onLogout) onLogout();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  }

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1.5 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
    >
      ⏻ Déconnexion
    </button>
  );
}
