import { useState } from "react";
import Button from "../ui/Button";
import { addMaterial } from "../../services/materialService";

/**
 * Composant carte matériel
 * Affiche:
 *  - Nom
 *  - Catégorie
 *  - Quantité (inline + +/-)
 *  - Suppression
 *  - Futur besoin planning (optionnel)
 */
export default function MaterialCard({ item, refresh, needed }) {
  const [editingQty, setEditingQty] = useState(false);
  const [qtyValue, setQtyValue] = useState(item.quantity);

  async function updateQty(newQty) {
    const q = Number(newQty);

    // Bloquer sous zéro (ton choix)
    if (isNaN(q) || q < 0) return;

    // MAJ locale
    setQtyValue(q);

    // MAJ stockage
    await materialService.update(item.id, {
      quantity: q,
      updatedAt: Date.now(),
    });

    refresh();
  }

  return (
    <div
      style={{
        border: "1px solid #E2E8F0",
        borderRadius: "8px",
        padding: "10px",
        background: "white",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {/* Nom */}
      <div style={{ fontWeight: "600", fontSize: "15px" }}>
        {item.name}
      </div>

      {/* Catégorie */}
      <div style={{ fontSize: "13px", color: "#64748B" }}>
        {item.category}
      </div>

      {/* Quantité */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => updateQty(qtyValue - 1)}
          disabled={qtyValue <= 0}
        >
          -
        </Button>

        {editingQty ? (
          <input
            type="number"
            value={qtyValue}
            onChange={(e) => setQtyValue(e.target.value)}
            onBlur={() => {
              updateQty(qtyValue);
              setEditingQty(false);
            }}
            autoFocus
            style={{
              width: "50px",
              textAlign: "center",
              border: "1px solid #CBD5E1",
              borderRadius: "4px",
            }}
          />
        ) : (
          <span
            style={{
              cursor: "pointer",
              minWidth: "40px",
              textAlign: "center",
            }}
            onClick={() => setEditingQty(true)}
          >
            {qtyValue}
          </span>
        )}

        <Button
          variant="secondary"
          size="sm"
          onClick={() => updateQty(qtyValue + 1)}
        >
          +
        </Button>
      </div>

      {/* FUTUR — stock nécessaire selon planning */}
      {needed != null && (
        <div
          style={{
            fontSize: "13px",
            marginTop: "4px",
            color: needed > qtyValue ? "#DC2626" : "#16A34A",
          }}
        >
          Besoin: {needed} — 
          {needed > qtyValue ? (
            <> Manque: {needed - qtyValue}</>
          ) : (
            <> OK</>
          )}
        </div>
      )}

      {/* Supprimer */}
      <Button
        variant="danger"
        size="sm"
        onClick={async () => {
          await materialService.remove(item.id);
          refresh();
        }}
      >
        Supprimer
      </Button>
    </div>
  );
}
