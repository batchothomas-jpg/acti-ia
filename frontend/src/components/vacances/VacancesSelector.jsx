export default function VacancesSelector({ value, periods, onChange }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm font-medium text-slate-700">Vacances :</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="border rounded-md px-3 py-1.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
      >
        <option value="">— Choisir une période —</option>
        {periods.map(p => (
          <option key={p.id} value={p.id}>
            {p.nom} ({p.annee})
          </option>
        ))}
      </select>
    </div>
  );
}
