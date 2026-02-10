export default function MaterialSortBar({ sortBy, sortDir, onChange }) {
  const headers = [
    { key: "name", label: "Nom" },
    { key: "category", label: "Catégorie" },
    { key: "quantity", label: "Quantité" },
    { key: "updatedAt", label: "Modifié" },
  ];

  function toggle(key) {
    if (sortBy === key) {
      onChange(key, sortDir === "asc" ? "desc" : "asc");
    } else {
      onChange(key, "asc");
    }
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      fontWeight: "600",
      marginBottom: "6px",
      fontSize: "14px",
      cursor: "pointer"
    }}>
      {headers.map(h => (
        <div key={h.key} onClick={() => toggle(h.key)}>
          {h.label}
          {sortBy === h.key && (
            <span>{sortDir === "asc" ? " ▲" : " ▼"}</span>
          )}
        </div>
      ))}
    </div>
  );
}
