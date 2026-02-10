import MaterialBadge from "./MaterialBadge";

function normalizeCategory(category) {
  if (!category) return "Autre";

  const c = category.trim().toLowerCase();

  if (c.includes("sport")) return "Matériel sportif";
  if (c.includes("société")) return "Jeux de société";
  if (c.includes("manuel")) return "Matériel manuelle";

  return "Autre";
}

export default function MaterialReadOnlyCard({ item }) {
  const normalizedCategory = normalizeCategory(item.category);

  return (
    <div
      style={{
        border: "1px solid #E2E8F0",
        borderRadius: "8px",
        padding: "10px",
        background: "white",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <div style={{ fontWeight: "600", fontSize: "15px" }}>
        {item.name}
      </div>

      <MaterialBadge category={normalizedCategory} />

      <div style={{ fontSize: "14px", color: "#334155" }}>
        Quantité disponible : <b>{item.quantity}</b>
      </div>
    </div>
  );
}
