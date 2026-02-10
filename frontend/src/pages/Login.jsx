import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../config";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username,
    password,
  }),
});


      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erreur de connexion");
        return;
      }

      localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));


      navigate("/");
    } catch (err) {
      setError("Impossible de contacter le serveur");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Connexion</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
            {error}
          </div>
        )}

        {/* USERNAME */}
        <div>
          <label className="text-sm">Nom d’utilisateur</label>
          <input
            className="w-full border p-2 rounded"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD + OEIL */}
        <div>
          <label className="text-sm">Mot de passe</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border p-2 rounded pr-10"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            {/* ŒIL */}
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer select-none text-gray-500"
              onMouseEnter={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}
              title="Afficher le mot de passe"
            >
              👁
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
