// src/pages/Materials.jsx
import { useEffect, useState } from "react";
import {
  fetchMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial
} from "../services/materialService";

const CATEGORIES = [
  "Sportif",
  "Jeux de société",
  "Manuel / Créatif",
  "Numérique",
  "Autre"
];

export default function Materials() {
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await fetchMaterials();
    setMaterials(data);
  }

  async function handleAdd() {
    if (!name.trim()) {
      setError("Le nom de l’objet est obligatoire");
      return;
    }

    setError("");

    await createMaterial({
      name: name.trim(),
      category,
      quantity: 1
    });

    setName("");
    setCategory("");
    load();
  }

  async function changeQuantity(mat, value) {
    const qty = Math.max(0, Number(value));
    await updateMaterial(mat._id, { quantity: qty });
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Matériel</h1>

      {/* Formulaire ajout */}
      <div className="bg-white p-4 rounded shadow space-y-3 max-w-md">
        <h2 className="font-semibold">Ajouter du matériel</h2>

        <input
          className="border rounded px-2 py-1 w-full"
          placeholder="Nom de l’objet *"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <select
          className="border rounded px-2 py-1 w-full"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">— Catégorie —</option>
          {CATEGORIES.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Ajouter
        </button>
      </div>

      {/* Liste */}
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-slate-100 text-left">
            <th className="p-2">Objet</th>
            <th className="p-2">Catégorie</th>
            <th className="p-2">Quantité</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {materials.map(mat => (
            <tr key={mat._id} className="border-t">
              <td className="p-2">{mat.name}</td>
              <td className="p-2">{mat.category || "—"}</td>
              <td className="p-2 flex items-center gap-2">
                <button
                  onClick={() => changeQuantity(mat, mat.quantity - 1)}
                  className="px-2 bg-slate-200 rounded"
                >
                  −
                </button>

                <input
                  type="number"
                  min="0"
                  value={mat.quantity}
                  onChange={e => changeQuantity(mat, e.target.value)}
                  className="w-16 border rounded text-center"
                />

                <button
                  onClick={() => changeQuantity(mat, mat.quantity + 1)}
                  className="px-2 bg-slate-200 rounded"
                >
                  +
                </button>
              </td>

              <td className="p-2">
                <button
                  onClick={() => deleteMaterial(mat._id).then(load)}
                  className="text-red-600"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
