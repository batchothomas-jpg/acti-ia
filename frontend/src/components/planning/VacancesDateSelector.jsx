export default function VacancesDateSelector({ start, end, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-700">
          Début :
        </label>
        <input
          type="date"
          value={start || ""}
          onChange={e => onChange(e.target.value, end)}
          className="border rounded-md px-2 py-1 text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-700">
          Fin :
        </label>
        <input
          type="date"
          value={end || ""}
          onChange={e => onChange(start, e.target.value)}
          className="border rounded-md px-2 py-1 text-sm"
        />
      </div>

    </div>
  );
}
