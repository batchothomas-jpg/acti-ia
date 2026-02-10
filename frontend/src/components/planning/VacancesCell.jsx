import { useState } from "react";
import PlanningACMModal from "./PlanningACMModal";

/* 🎨 Couleurs par famille (TES FAMILLES) */
const FAMILY_COLORS = {
  "Loisir Créatifs": "bg-amber-100 border-amber-400",
  "Expression Corporelle": "bg-pink-100 border-pink-400",
  "Communication": "bg-indigo-100 border-indigo-400",
  "Cohésion et Stratégie": "bg-green-100 border-green-400",
  "Agir en Conscience": "bg-teal-100 border-teal-400",
  "Contes en Balade": "bg-orange-100 border-orange-400",
  "Relaxation": "bg-sky-100 border-sky-400",
  "Grand jeu": "bg-red-100 border-red-400"
};

/* 🔍 Extraction de la famille depuis le texte ACM :
   "Nom activité — (Famille) — note"
*/
function extractFamily(text) {
  if (!text) return null;
  const match = text.match(/\((.*?)\)/);
  return match ? match[1] : null;
}

export default function VacancesCell({ value, onChange }) {
  const [slot, setSlot] = useState(null); // "matin" | "apresMidi"

  function save(text) {
    onChange({
      ...value,
      [slot]: text
    });
    setSlot(null);
  }

  function cellClass(text) {
    const family = extractFamily(text);
    return FAMILY_COLORS[family] || "bg-white border-slate-300";
  }

  return (
    <td className="border align-top p-1 text-xs">

      {/* MATIN */}
      <div
        className={`border rounded p-1 mb-1 cursor-pointer hover:opacity-80 ${cellClass(value?.matin)}`}
        onClick={() => setSlot("matin")}
      >
        <div className="text-[10px] font-semibold text-slate-600">
          Matin
        </div>
        <div className="text-slate-800 whitespace-pre-wrap">
          {value?.matin || "—"}
        </div>
      </div>

      {/* APRÈS-MIDI */}
      <div
        className={`border rounded p-1 cursor-pointer hover:opacity-80 ${cellClass(value?.apresMidi)}`}
        onClick={() => setSlot("apresMidi")}
      >
        <div className="text-[10px] font-semibold text-slate-600">
          Après-midi
        </div>
        <div className="text-slate-800 whitespace-pre-wrap">
          {value?.apresMidi || "—"}
        </div>
      </div>

      {slot && (
        <PlanningACMModal
          value={value?.[slot] || ""}
          onConfirm={save}
          onClose={() => setSlot(null)}
        />
      )}
    </td>
  );
}
