import { useState } from "react";
import { addMaterial } from "../../services/materialService";

export default function MaterialInlineAdd({ onAdded }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  async function handleAdd() {
    if (!name.trim()) {
      setError("Nom du matériel obligatoire");
      return;
    }

    await addMaterial({ name, quantity });
    setName("");
    setQuantity(1);
    setError("");
    onAdded();
  }

  return (
    <div className="flex items-center gap-2 mt-3">
      <input
        className="border px-2 py-1 rounded w-48"
        placeholder="Nom du matériel"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        min="1"
        className="border px-2 py-1 rounded w-20"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <button
        onClick={handleAdd}
        className="px-3 py-1 bg-orange-500 text-white rounded"
      >
        Ajouter
      </button>

      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
}
