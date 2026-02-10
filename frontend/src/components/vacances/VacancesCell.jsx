import { useState } from "react";

export default function VacancesCell({ day, slot, onChange }) {
  const [open, setOpen] = useState(false);

  if (day.ferie) {
    return (
      <td className="border p-2 bg-slate-200 text-center text-slate-600 text-xs">
        Férié
      </td>
    );
  }

  const value = day[slot];

  const handle = () => {
    const name = prompt("Nom activité :", value?.name || "");
    if (!name) return;
    onChange({ name });
  };

  return (
    <td
      className="border p-2 min-w-[140px] cursor-pointer"
      onDoubleClick={() => setOpen(true)}
    >
      {value ? (
        <div className="text-sm font-medium">{value.name}</div>
      ) : (
        <span className="text-xs text-slate-400 italic">Double-cliquer</span>
      )}

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Ajouter activité</h2>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded mr-2"
              onClick={() => {
                handle();
                setOpen(false);
              }}
            >
              OK
            </button>
            <button
              className="px-3 py-1 bg-slate-300 rounded"
              onClick={() => setOpen(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </td>
  );
}
