import React, { useState } from "react";

export default function VacancesActivityModal({
  day,
  value,
  onClose,
  onConfirm
}) {
  const [name, setName] = useState(value?.name || "");
  const [family, setFamily] = useState(value?.family || "");
  const [note, setNote] = useState(value?.note || "");

  const families = [
    "Loisir Créatifs",
    "Expression Corporelle (Danse, Cirque, …)",
    "Communication (Théâtre, …)",
    "Cohésion et Stratégie (Jeux de société, …)",
    "Agir en Conscience",
    "Contes en Balade",
    "Relaxation",
    "Grand jeu"
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold mb-1">
          Activité
        </h2>

        <div className="text-sm text-slate-500 mb-3">
          {new Date(day.iso).toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          })}
        </div>

        <label className="text-sm font-medium">Nom</label>
        <input
          className="border rounded w-full px-2 py-1 mb-3"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label className="text-sm font-medium">Famille d’animation</label>
        <select
          className="border rounded w-full px-2 py-1 mb-3"
          value={family}
          onChange={e => setFamily(e.target.value)}
        >
          <option value="">— Choisir —</option>
          {families.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        <label className="text-sm font-medium">
          Note (optionnel)
        </label>
        <textarea
          className="border rounded w-full px-2 py-1 mb-4"
          rows={3}
          value={note}
          onChange={e => setNote(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300"
          >
            Annuler
          </button>

          <button
            onClick={() =>
              onConfirm({ name, family, note })
            }
            disabled={!name}
            className={`px-3 py-1 rounded text-white
              ${name
                ? "bg-orange-600 hover:bg-orange-700"
                : "bg-orange-300 cursor-not-allowed"}
            `}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
