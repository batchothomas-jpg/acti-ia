import { useEffect, useState } from "react"

export default function Centers() {
  const [centers, setCenters] = useState([])
  const [name, setName] = useState("")
  const [city, setCity] = useState("Aulnay-sous-Bois")
  const [groups, setGroups] = useState({ maternelle: false, primaire: false })

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const r = await fetch("http://localhost:4000/api/centers")
    const data = await r.json()
    setCenters(data)
  }

  async function addCenter() {
    if (!name) return
    await fetch("http://localhost:4000/api/centers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, city, groups })
    })
    setName("")
    load()
  }

  function selectCenter(id) {
    localStorage.setItem("centerId", id)
    window.location.href = "/materiel"
  }

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-3xl font-semibold text-blue-600">Centres</h2>

      <div className="space-y-2">
        {centers.map(c => (
          <div key={c._id} className="p-3 border rounded bg-white flex justify-between items-center">
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-sm text-gray-600">{c.city}</div>
            </div>
            <button
              onClick={() => selectCenter(c._id)}
              className="px-3 py-1 rounded bg-blue-600 text-white">
              Entrer
            </button>
          </div>
        ))}
      </div>

      <div className="p-3 border rounded bg-white space-y-3">
        <h3 className="font-semibold">Créer un centre</h3>

        <input
          className="border p-2 rounded w-full"
          placeholder="Nom du centre"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <div className="flex gap-3">
          <label className="flex items-center gap-1 text-sm">
            <input type="checkbox" checked={groups.maternelle}
              onChange={() => setGroups(p => ({...p, maternelle: !p.maternelle}))} />
            Maternelle
          </label>
          <label className="flex items-center gap-1 text-sm">
            <input type="checkbox" checked={groups.primaire}
              onChange={() => setGroups(p => ({...p, primaire: !p.primaire}))} />
            Primaire
          </label>
        </div>

        <button onClick={addCenter} className="px-3 py-1 rounded bg-green-600 text-white">
          Ajouter
        </button>
      </div>
    </div>
  )
}
