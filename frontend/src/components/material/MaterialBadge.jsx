const CATEGORY_COLORS = {
  "Matériel sportif": {
    color: "#3B82F6",
    label: "Matériel sportif",
  },
  "Jeux de société": {
    color: "#10B981",
    label: "Jeux de société",
  },
  "Matériel manuelle": {
    color: "#F59E0B",
    label: "Matériel manuel",
  },
  "Autre": {
    color: "#6B7280",
    label: "Autre",
  },
};

export default function MaterialBadge({ category }) {
  const cat = CATEGORY_COLORS[category] || CATEGORY_COLORS["Autre"];

  return (
    <span
      style={{
        backgroundColor: `${cat.color}22`, // 22 = opacité douce
        color: cat.color,
        fontSize: "12px",
        padding: "2px 8px",
        borderRadius: "8px",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {cat.label}
    </span>
  );
}
