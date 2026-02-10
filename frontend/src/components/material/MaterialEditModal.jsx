import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import MaterialCategorySelect from "./MaterialCategorySelect";
import { addMaterial }from "../../services/materialService";

export default function MaterialEditModal({ item, refresh, onClose }) {
  const [name, setName] = useState(item.name);
  const [qty, setQty] = useState(item.quantity);
  const [category, setCategory] = useState(item.category || "Autre");

  async function handleSave() {
    await materialService.update(item.id, {
      name,
      quantity: qty,
      category,
    });

    refresh();
    onClose();
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          width: "340px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Modifier le matériel</h2>

        <Input
          label="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Quantité"
          type="number"
          value={qty}
          onChange={(e) => setQty(+e.target.value)}
        />

        <MaterialCategorySelect value={category} onChange={setCategory} />

        <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
}
