// src/components/activities/ActivityCard.jsx
export default function ActivityCard({ activity, onOpen }) {
  return (
    <div
      className="border rounded-lg p-4 bg-white shadow hover:shadow-md cursor-pointer"
      onClick={onOpen}
    >
      <h2 className="font-semibold text-lg">{activity.title}</h2>
      <p className="text-sm text-slate-600">{activity.family}</p>
      <p className="text-xs text-slate-500">
        {activity.group} • {activity.duration} min
      </p>
    </div>
  );
}
