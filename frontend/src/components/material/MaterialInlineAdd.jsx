import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import MaterialCategorySelect from "./MaterialCategorySelect";
import { addMaterial } from "../../services/materialService";


export default function MaterialInlineAdd({ refresh }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);
  const [category, setCategory] = useState("Autre");

  async function handleAdd() {
    if (!name.trim()) return;

  

    setName("");
    setQty(1);
    setCategory("Autre");
    refresh();
  }

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "12px" }}>
      <Input
        placeholder="Nom du matériel"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ flex: 2 }}
      />

      <Input
        type="number"
        value={qty}
        onChange={(e) => setQty(+e.target.value)}
        style={{ width: "80px" }}
      />

      <MaterialCategorySelect value={category} onChange={setCategory} />

      <Button variant="primary" onClick={handleAdd}>
        Ajouter
      </Button>
    </div>
  );
}
