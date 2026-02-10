export default function VacancesPeriodTabs({ periods, selected, onSelect, disabled }) {
  if (!periods || periods.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {periods.map(p => (
        <button
          key={p.id}
          disabled={disabled}
          onClick={() => onSelect(p.id)}
          className={`px-4 py-1.5 rounded-md text-sm border
            ${selected === p.id
              ? "bg-orange-500 text-white border-orange-600"
              : "bg-white text-slate-700 hover:bg-orange-50"}
            ${disabled ? "opacity-40 cursor-not-allowed" : ""}
          `}
        >
          {p.nom}
        </button>
      ))}
    </div>
  );
}
