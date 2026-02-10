// src/pages/Activities.jsx
import { useEffect, useState } from "react";
import { fetchActivities } from "../services/activityService";
import ActivityCard from "../components/activities/ActivityCard";
import ActivityDetail from "../components/activities/ActivityDetail";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchActivities()
      .then(setActivities)
      .catch(() => setError("Impossible de charger les activités"));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">📚 Activités enregistrées</h1>

      {error && <div className="text-red-600">{error}</div>}

      <div className="grid md:grid-cols-2 gap-4">
        {activities.map(act => (
          <ActivityCard
            key={act._id}
            activity={act}
            onOpen={() => setSelected(act)}
          />
        ))}
      </div>

      {selected && (
        <ActivityDetail
          activity={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
