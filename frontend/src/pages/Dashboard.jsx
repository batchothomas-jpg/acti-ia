import { useEffect, useState } from "react";
import WeatherWidget from "../components/dashboard/WeatherWidget";
import { getCurrentUser } from "../services/authService";
const user = getCurrentUser();

export default function Dashboard() {
  return (
    <div className="p-5 space-y-6">

      <h1 className="text-2xl font-semibold text-slate-800 mb-1">
        Tableau de bord
      </h1>

        {user?.center && (
          <p className="text-sm text-slate-500">
            Centre : <span className="font-medium">{user.center}</span>
          </p>
        )}

      

      {/* GRID DES WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* MÉTÉO */}
        <WeatherWidget />
        
        {/* ESPACE POUR D’AUTRES WIDGETS */}
        <div className="p-4 rounded-lg bg-white shadow border text-slate-700">
          <h2 className="text-sm font-semibold mb-2">À venir</h2>
          <p className="text-sm text-slate-500">
            Widgets supplémentaires (statistiques, liste matériel, alertes…)
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white shadow border text-slate-700">
          <h2 className="text-sm font-semibold mb-2">À venir</h2>
          <p className="text-sm text-slate-500">
            Automatisations, rappels, nouveautés…
          </p>
        </div>
      </div>
    </div>
  );
}
