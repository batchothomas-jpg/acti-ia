import { useState } from "react";
import { changePassword } from "../services/userService";

export default function Profile() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
  e.preventDefault();
  setError("");
  setStatus("loading");

  if (form.newPassword !== form.confirmPassword) {
    setError("Les nouveaux mots de passe ne correspondent pas");
    setStatus("error");
    return;
  }

  try {
    const res = await fetch("http://localhost:3001/api/users/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    const text = await res.text(); // ⚠️ IMPORTANT

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Réponse serveur invalide");
    }

    if (!res.ok) {
      throw new Error(data.error || "Erreur lors de l'enregistrement");
    }

    setStatus("success");
    setForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (err) {
    setError(err.message);
    setStatus("error");
  }
}


  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
      <h1 className="text-xl font-bold">Changer mon mot de passe</h1>

     {error && (
  <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
    {error}
  </div>
)}

{status === "success" && (
  <div className="bg-green-100 text-green-700 p-2 rounded text-sm">
    Mot de passe modifié avec succès ✅
  </div>
)}


      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          name="oldPassword"
          placeholder="Ancien mot de passe"
          value={form.oldPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            placeholder="Nouveau mot de passe"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded pr-10"
            required
          />

          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer select-none text-gray-500"
            onMouseEnter={() => setShowNewPassword(true)}
            onMouseLeave={() => setShowNewPassword(false)}
            title="Afficher le mot de passe"
          >
            👁
          </span>
        </div>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le nouveau mot de passe"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {status === "loading" ? "Modification..." : "Changer le mot de passe"}
        </button>
      </form>
    </div>
  );
}
