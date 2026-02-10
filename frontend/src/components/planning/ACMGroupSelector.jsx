import React from "react";

export default function ACMGroupSelector({ group, onChange }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm font-medium text-slate-700">Groupe :</span>

      <select
        value={group || ""}
        onChange={e => onChange(e.target.value)}
        className="border rounded-md px-3 py-1.5 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" >
        <option value="">— Choisir —</option>
        <option value="maternelle">Maternelle</option>
        <option value="primaire">Primaire</option>
      </select>
    </div>
  );
}
