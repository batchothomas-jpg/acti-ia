import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function VacancesEteModal({ open, onClose, onSave }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  function submit() {
    if (!start || !end) return;
    if (new Date(start) > new Date(end)) return;
    onSave({ start, end });
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg space-y-4">
          <Dialog.Title className="text-lg font-semibold">
            Définir les dates d’ouverture (Été)
          </Dialog.Title>

          <div className="space-y-2">
            <label className="text-sm text-gray-700">Début :</label>
            <input
              type="date"
              className="border rounded px-3 py-1.5 w-full"
              value={start}
              onChange={e => setStart(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-700">Fin :</label>
            <input
              type="date"
              className="border rounded px-3 py-1.5 w-full"
              value={end}
              onChange={e => setEnd(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={onClose}
              className="px-3 py-1.5 border rounded"
            >
              Annuler
            </button>
            <button
              onClick={submit}
              className="px-3 py-1.5 rounded bg-blue-600 text-white"
            >
              Valider
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
