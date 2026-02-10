export default function VacancesSelector({ value, onChange }) {

  // Périodes définies manuellement (modifiable plus tard)
  const periods = [
    {
      id: "vacances-1",
      label: "Période 1",
      weeks: []
    },
    {
      id: "vacances-2",
      label: "Période 2",
      weeks: []
    }
  ];

  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm font-medium text-slate-700">
        Période :
      </span>

      <select
        value={value || ""}
        onChange={e => {
          const selected = periods.find(p => p.id === e.target.value);
          onChange(selected);
        }}
        className="border rounded-md px-3 py-1.5 text-sm bg-white shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <option value="">— Choisir une période —</option>

        {periods.map(p => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
}
