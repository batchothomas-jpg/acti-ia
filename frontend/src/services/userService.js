import { API_URL } from "../config";

export async function fetchUsers() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erreur chargement utilisateurs");
  }

  return res.json();
}


export async function createUser(data) {
  const res = await fetch("https://acti-ia.onrender.com/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Erreur création utilisateur");
  }

  return res.json();
}

export async function changePassword(payload) {
  const token = localStorage.getItem("token");

  const res = await fetch("https://acti-ia.onrender.com/api/users/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Erreur changement mot de passe");
  }

  return data;
}
