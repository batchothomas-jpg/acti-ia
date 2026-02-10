export default function WeatherBadge({ data }) {
  if (!data) return null;

  return (
    <div className="text-xs flex items-center gap-1 text-slate-600">
      <span>{data.icon}</span>
      <span>{data.tmin}°/{data.tmax}°</span>
    </div>
  );
}
