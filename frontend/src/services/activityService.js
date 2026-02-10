const API_URL = "http://localhost:3001/api/activities";

export async function fetchActivities() {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erreur chargement activités");
  }

  return res.json();
}

export async function deleteActivity(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erreur suppression activité");
  }

  return res.json();
}
