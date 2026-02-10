export default function ActivityFilters({ filters, setFilters }) {
  return (
    <div className="flex gap-4">
      <select
        className="border px-2 py-1 rounded"
        value={filters.family}
        onChange={e =>
          setFilters(f => ({ ...f, family: e.target.value }))
        }
      >
        <option value="">Toutes les familles</option>
        <option>Manuelle</option>
        <option>Sportif</option>
        <option>Jeux de société</option>
      </select>

      <select
        className="border px-2 py-1 rounded"
        value={filters.group}
        onChange={e =>
          setFilters(f => ({ ...f, group: e.target.value }))
        }
      >
        <option value="">Tous les groupes</option>
        <option>Maternelle</option>
        <option>Primaire</option>
      </select>
    </div>
  );
}
