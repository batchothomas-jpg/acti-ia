export default function VacancesWeekSelector({ weeks, active, onSelect }) {
  return (
    <div className="flex gap-2 mb-4">
      {weeks.map((_, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`px-3 py-1 rounded border text-sm ${
            active === idx
              ? "bg-blue-600 text-white border-blue-700"
              : "bg-white text-slate-700 border-slate-300"
          }`}
        >
          Semaine {idx + 1}
        </button>
      ))}
    </div>
  );
}
