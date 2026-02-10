import React, { useState } from "react";

export default function ActivityModal({ value, onClose, onSave }) {
  const [name, setName] = useState(value?.name || "");
  const [family, setFamily] = useState(value?.family || "");
  const [note, setNote] = useState(value?.note || "");

  const families = [
    "Loisir Créatifs", "Expression Corporelle(Danse et Cirque,...)", "Communication(Théâtre,...)",
    "Cohésion et Stratégie(Jeux de société, ...)",
    "Agir en Conscience", "Contes en Balade", "Relaxation", "Grand jeu"
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-96 rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold mb-3">
          Activité
        </h2>

        <label className="text-sm font-medium">Nom</label>
        <input
          className="border rounded w-full px-2 py-1 mb-3"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label className="text-sm font-medium">Famille</label>
        <select
          className="border rounded w-full px-2 py-1 mb-3"
          value={family}
          onChange={e => setFamily(e.target.value)}
        >
          <option value="">— Choisir —</option>
          {families.map(f => <option key={f} value={f}>{f}</option>)}
        </select>

        <label className="text-sm font-medium">Note (optionnel)</label>
        <textarea
          className="border rounded w-full px-2 py-1 mb-3"
          value={note}
          onChange={e => setNote(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-200 rounded"
          >
            Annuler
          </button>
          <button
            onClick={() =>
              onSave({ name, family, note })
            }
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
