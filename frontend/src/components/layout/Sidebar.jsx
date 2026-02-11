import { NavLink } from "react-router-dom";
import {
  Home,
  Package,
  Brain,
  Calendar,
  Umbrella,
  Building2,
  User,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import LogoutButton from "../auth/LogoutButton";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/materiel", label: "Matériel", icon: Package },
    { to: "/ia", label: "IA", icon: Brain },
    { to: "/planning-acm", label: "Planning ACM", icon: Calendar },
    { to: "/planning-vacances", label: "Planning Vacances", icon: Calendar },
    { to: "/activites", label: "Activitées", icon: Building2 }
  ];

  return (
    <>
      {/* Bouton menu mobile */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3 left-3 z-50 md:hidden bg-white p-2 rounded shadow"
      >
        <Menu size={22} />
      </button>

      {/* Overlay mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static z-50
          top-0 left-0
          h-screen
          w-64 md:w-56
          bg-white border-r
          flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b">
          <span className="font-semibold">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden"
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-3 py-2 rounded-lg
                text-sm
                ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "hover:bg-gray-100"
                }
              `
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t space-y-1">
          <NavLink
            to="/profil"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
          >
            <User size={18} />
            <span>Profil</span>
          </NavLink>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
          >
            
            <span><LogoutButton size={18} /></span>
          </button>
        </div>
      </aside>
    </>
  );
}
