import { useEffect, useState } from "react"

export default function ActivityModal({ onClose, onSelect }) {
  const [mode, setMode] = useState("select")
  const [activities, setActivities] = useState([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const centerId = localStorage.getItem("centerId")
    const r = await fetch(`http://localhost:4000/api/activity/${centerId}`)
    setActivities(await r.json())
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded p-4 w-[500px] space-y-4">
        <h3 className="text-xl font-semibold">Choisir une activité</h3>

        <div className="flex gap-2">
          <button className={`flex-1 p-2 rounded ${mode === "select" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setMode("select")}>
            Activités existantes
          </button>

          <button className={`flex-1 p-2 rounded ${mode === "generate" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setMode("generate")}>
            Générer avec IA
          </button>
        </div>

        {mode === "select" && (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {activities.map(a => (
              <div key={a._id}
                className="border rounded p-2 hover:bg-gray-50 cursor-pointer flex justify-between"
                onClick={() => onSelect(a)}>
                <div>
                  <div className="font-medium">{a.title || "(sans titre)"}</div>
                  <div className="text-sm text-gray-600">{a.duration} min • {a.group}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {mode === "generate" && (
          <div className="space-y-2 text-center">
            <button
              className="px-3 py-1 bg-green-600 text-white rounded"
              onClick={() => {
                onClose()
                window.location.href = "/ia"
              }}>
              Ouvrir IA
            </button>
          </div>
        )}

        <button className="px-3 py-1 bg-gray-300 rounded" onClick={onClose}>Fermer</button>
      </div>
    </div>
  )
}
