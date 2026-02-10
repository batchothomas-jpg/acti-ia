import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

const links = [
  { label: "Tableau de Bord", to: "/" },
  { label: "Gestion Utilisateur & Mémoires", to: "/users" },
  { label: "Matériel", to: "/materiel" },
  { label: "Planning ACM", to: "/planning-acm" },
  { label: "Planning Vacances", to: "/planning-vacances" },
  { label: "Création IA", to: "/ia" },
  { label: "Activités enregistrées", to: "/activites" },
];

export default function Sidebar({ onClose, onLogout }) {
  return (
    <aside className="absolute left-0 top-0 h-full w-56 bg-white border-r shadow z-20 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-semibold">Menu</span>
        <button
          onClick={onClose}
          className="text-xl hover:bg-gray-100 rounded px-2"
        >
          ✕
        </button>
      </div>

      <nav className="flex flex-col gap-1 py-2">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className={({ isActive }) =>
              `px-4 py-2 mx-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
          <LogoutButton onLogout={onLogout} />

      <div className="mt-auto p-4 text-xs text-gray-400">
        v1.0 • Acti-IA
      </div>
    </aside>
  );
}
