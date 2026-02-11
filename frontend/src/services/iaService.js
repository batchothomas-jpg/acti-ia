export async function generateActivities(payload) {
  const token = localStorage.getItem("token");

  const res = await fetch("https://acti-ia.onrender.com/api/ia/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ OBLIGATOIRE
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Erreur génération IA");
  }

  return res.json();
}
