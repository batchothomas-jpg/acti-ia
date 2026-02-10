import React, { useState } from "react";
import ActivityModal from "./ActivityModal";
import WeatherBadge from "./WeatherBadge";
import { useWeather } from "../../hooks/useWeather";

export default function ACMActivityCell({ value, date, onChange, readonly }) {
  const [open, setOpen] = useState(false);
  const weather = useWeather(date);

  const handleDoubleClick = () => {
    if (!readonly) setOpen(true);
  };

  return (
    <td
      className="border p-2 align-top min-h-[60px] cursor-pointer"
      onDoubleClick={handleDoubleClick}
    >
      {weather && (
        <div className="mb-1">
          <WeatherBadge data={weather} />
        </div>
      )}

      {!value && (
        <div className="text-slate-400 italic">Double-cliquer</div>
      )}

      {value && (
        <div className="space-y-1">
          <div className="font-medium">{value.name}</div>
        </div>
      )}

      {open && (
        <ActivityModal
          value={value}
          onClose={() => setOpen(false)}
          onSave={(v) => {
            onChange(v);
            setOpen(false);
          }}
        />
      )}
    </td>
  );
}
