import { getAuthHeaders } from "./authService";

const API_URL = "https://acti-ia.onrender.com/api/materials";

export async function fetchMaterials() {
  const res = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Erreur chargement matériel");
  return res.json();
}

export async function createMaterial(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erreur création matériel");
  return res.json();
}

export async function updateMaterial(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erreur mise à jour matériel");
  return res.json();
}

export async function deleteMaterial(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Erreur suppression matériel");
}
