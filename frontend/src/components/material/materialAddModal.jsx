import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import MaterialCategorySelect from "./MaterialCategorySelect";
import { addMaterial }from "../../services/materialService";

export default function MaterialAddModal({ refresh, onClose }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);
  const [category, setCategory] = useState("Autre");
  const [error, setError] = useState("");

  async function handleAdd() {
    // validation nom
    if (!name.trim()) {
      setError("Le nom du matériel est obligatoire.");
      return;
    }

    await materialService.add({
      id: crypto.randomUUID(),
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
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "22px",
          borderRadius: "12px",
          width: "340px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>
          Ajouter un matériel
        </h2>

        <Input
          label="Nom"
          placeholder="ex: Ballons"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />

        <Input
          label="Quantité"
          type="number"
          value={qty}
          onChange={(e) => setQty(+e.target.value)}
        />

        <MaterialCategorySelect value={category} onChange={setCategory} />

        {error && (
          <div style={{ color: "#EF4444", fontSize: "13px", marginTop: "6px" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={handleAdd}
            disabled={!name.trim()}
          >
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
}
