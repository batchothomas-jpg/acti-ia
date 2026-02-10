import { useState } from "react";

export default function SaveActivityButton({ activity }) {
  const [status, setStatus] = useState("idle");

  const isValid =
    activity?.title &&
    activity?.description &&
    activity?.family;

  async function saveActivity() {
    if (!isValid || status === "saving") return;

    setStatus("saving");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3001/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(activity),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <button
      onClick={saveActivity}
      disabled={!isValid || status === "saving"}
      className={`px-3 py-1.5 text-sm rounded transition
        ${
          status === "success"
            ? "bg-green-600 text-white"
            : status === "error"
            ? "bg-red-600 text-white"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
    >
      {status === "saving"
        ? "Enregistrement..."
        : status === "success"
        ? "✔ Enregistré"
        : status === "error"
        ? "Erreur"
        : "💾 Enregistrer"}
    </button>
  );
}
