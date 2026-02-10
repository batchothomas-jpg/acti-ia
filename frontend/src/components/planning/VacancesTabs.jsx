export default function VacancesTabs({ periods, active, onChange, disabled }) {
  return (
    <div className="flex gap-2 mb-3">
      {periods.map(p => (
        <button
          key={p.id}
          disabled={disabled}
          onClick={() => onChange(p.id)}
          className={`
            px-3 py-1.5 text-sm rounded border
            ${disabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" :
              active === p.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-blue-50 border-gray-300"}
          `}
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}
