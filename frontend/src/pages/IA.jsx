import { useState, useEffect } from "react";
import { fetchMaterials } from "../services/materialService";

import { generateActivities } from "../services/iaService";
import ExportActivityPdfButton from "../components/ia/ExportActivityPdfButton";
import SaveActivityButton from "../components/ia/SaveActivityButton";

import MaterialReadOnlyCard from "../components/material/MaterialReadOnlyCard";


export default function IA() {

  const [materials, setMaterials] = useState([]);

  const [form, setForm] = useState({
    group: "",
    children: "",
    duration: "",
    family: "",
    theme: "",
    userPrompt:""
  });


  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedbackSent, setFeedbackSent] = useState({});
useEffect(() => {
  fetchMaterials().then(data => {
    setMaterials(data);
  });
}, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleGenerate() {
    setError("");
    setActivities([]);
    setLoading(true);

    try {
      const res = await generateActivities({
        ...form,
        materials: materials
  .filter(m => m.quantity > 0)
  .map(m => `${m.name} (${m.quantity})`)

      });

      setActivities(res.activities || []);
    } catch (e) {
      setError("Erreur lors de la génération IA");
    } finally {
      setLoading(false);
    }
  }

  async function sendFeedback(activity, delta, index) {
  if (feedbackSent[index]) return;

  setFeedbackSent(prev => ({
    ...prev,
    [index]: delta > 0 ? "positive" : "negative"
  }));

  try {
    await fetch("https://acti-ia.onrender.com/api/ia/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        family: activity.family,
        ageGroup: activity.group,
        mechanic: activity.mechanic,
        delta
      })
    });
  } catch (err) {
    console.error("Erreur feedback", err);
  }
}

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Création d’activités par IA</h1>

      <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded shadow">

        <select name="group" onChange={handleChange} className="border p-2 rounded">
          <option value="">Groupe</option>
          <option value="maternelle">Maternelle</option>
          <option value="primaire">Primaire</option>
        </select>

        <input
          name="children"
          type="number"
          placeholder="Nombre d’enfants"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="duration"
          type="number"
          placeholder="Durée (min)"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select name="family" onChange={handleChange} className="border p-2 rounded">
          <option value="">Famille</option>
          <option>Manuelle</option>
          <option>Sportif</option>
          <option>Jeux de société</option>
        </select>

        <input
          name="theme"
          placeholder="Thème (optionnel)"
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
        <textarea
          name="userPrompt"
          placeholder="Indications supplémentaires (optionnel) : contraintes, ambiance, idées..."
          onChange={handleChange}
          className="border p-2 rounded col-span-2 min-h-[80px]"
        />


        <button
          onClick={handleGenerate}
          disabled={loading}
          className="col-span-2 bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Génération en cours..." : "Générer les activités"}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {activities.map((a, i) => (
        <div key={i} className="bg-white border rounded p-4 space-y-2">
          <h2 className="text-lg font-bold">{a.title}</h2>
          <p className="text-sm">{a.description}</p>
                <ExportActivityPdfButton activity={a} /> 
          <SaveActivityButton activity={a} />
          <div className="flex gap-2 mt-2">
            <button
              disabled={!!feedbackSent[i]}
              onClick={() => sendFeedback(a, 1, i)}
              className={`
                px-2 py-1 rounded transition-all duration-300
                ${feedbackSent[i] === "positive"
                  ? "bg-green-600 text-white scale-110"
                  : "bg-green-500 text-white hover:scale-105"}
                ${feedbackSent[i] ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              👍 Utile
            </button>

            <button
              disabled={!!feedbackSent[i]}
              onClick={() => sendFeedback(a, -2, i)}
              className={`
                px-2 py-1 rounded transition-all duration-300
                ${feedbackSent[i] === "negative"
                  ? "bg-red-600 text-white scale-110"
                  : "bg-red-500 text-white hover:scale-105"}
                ${feedbackSent[i] ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              👎 Pas adapté
            </button>
          </div>
        </div>
      ))}
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ fontWeight: "600", marginBottom: "10px" }}>
            Matériel disponible
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "12px",
            }}
          >
            {materials.map(item => (
              <MaterialReadOnlyCard key={item._id} item={item} />
            ))}
          </div>
        </div>

    </div>
    
  );
}
