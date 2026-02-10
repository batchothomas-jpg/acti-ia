import { useEffect, useState } from "react";
import { fetchUsers, createUser } from "../services/userService";
import { getCurrentUser } from "../services/authService";

export default function Users() {
  const user = getCurrentUser();

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("animateur");
  const [error, setError] = useState("");
  const [center, setCenter] = useState("");

  
  async function load() {
    const data = await fetchUsers();
    setUsers(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await createUser({
        username,
        password,
        email,
        center,
        role
      });

      setUsername("");
      setPassword("");
      setEmail("");
      setRole("animateur");
      setCenter("");


      load();
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Erreur lors de la création de l’utilisateur"
      );
    }
  }

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold">Gestion des utilisateurs et de la mémoires</h1>

      {/* FORMULAIRE */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-3"
      >
        <div>
          <label className="text-sm font-medium">Nom d’utilisateur</label>
          <input
            className="border w-full p-2"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="border w-full p-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Mot de passe</label>
          <input
            type="password"
            className="border w-full p-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
          <div>
            <label className="text-sm font-medium">Centre</label>
            <input
              className="border w-full p-2"
              value={center}
              onChange={e => setCenter(e.target.value)}
              placeholder="Ex: Centre Jules Ferry"
              required
            />
          </div>

        <div>
          <label className="text-sm font-medium">Rôle</label>
          <select
            className="border w-full p-2"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="animateur">Animateur</option>
            <option value="directeur">Directeur</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Créer l’utilisateur
        </button>
      </form>

      {/* LISTE */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Utilisateurs existants</h2>

        <ul className="space-y-1 text-sm">
          {users.map(u => (
            <li key={u._id}>
              <span className="font-medium">{u.username}</span>{" "}
              — <span className="italic">{u.role}</span>
              — <span className="text-slate-500">{u.center}</span>
            </li>
          ))}
        </ul>
      </div>
      {user?.role === "admin" && (
  <button
    onClick={async () => {
      if (!confirm("Réinitialiser toute la mémoire IA ?")) return;

      await fetch("http://localhost:3001/api/ia/reset-memory", {
        method: "POST",
        credentials: "include"
      });

      alert("Mémoire IA réinitialisée");
    }}
    className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-black"
  >
    🧹 Réinitialiser la mémoire IA
  </button>
)}

    </div>
  );
}
