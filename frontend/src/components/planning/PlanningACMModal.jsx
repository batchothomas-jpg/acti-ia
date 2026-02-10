import { useState } from "react";

export default function PlanningACMModal({ value, onConfirm, onClose }) {
  const [name, setName] = useState(value || "");
  const [family, setFamily] = useState("");
  const [note, setNote] = useState("");

  function handleConfirm() {
    const combined = `${name}${family ? " — (" + family + ")" : ""}${note ? " — " + note : ""}`;
    onConfirm(combined);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow w-[400px] space-y-3">
        
        <h2 className="text-lg font-bold">Ajouter une activité</h2>

        {/* Nom */}
        <div>
          <label className="text-sm">Nom de l'activité</label>
          <input
            className="w-full border p-1 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ex: Grand jeu relais"
          />
        </div>

        {/* Famille */}
        <div>
          <label className="text-sm">Famille d'animation</label>
          <select
            className="w-full border p-1 rounded"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
          >
            <option value="">— Choisir —</option>
            <option>Loisir Créatifs</option>
            <option>Expression Corporelle</option>
            <option>Communication</option>
            <option>Cohésion et Stratégie</option>
            <option>Agir en Conscience</option>
            <option>Contes en Balade</option>
            <option>Relaxation</option>
            <option>Grand jeu</option>
          </select>
        </div>

        {/* Note animateur */}
        <div>
          <label className="text-sm">Note animateur</label>
          <textarea
            className="w-full border p-1 rounded min-h-[60px]"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Consignes personnelles, matériel à prévoir, variantes..."
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            className="px-3 py-1 bg-slate-300 rounded"
            onClick={onClose}
          >
            Fermer
          </button>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={handleConfirm}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
