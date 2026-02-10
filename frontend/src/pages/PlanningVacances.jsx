import { useState } from "react";
import VacancesDateSelector from "../components/planning/VacancesDateSelector";
import VacancesWeekTable from "../components/planning/VacancesWeekTable";
import ExportVacancesPdfButton from "../components/planning/ExportVacancesPdfButton";

export default function PlanningVacances() {
  const [group, setGroup] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weeks, setWeeks] = useState([]);
  const [activities, setActivities] = useState({});

  function generateWeeks(start, end) {
    const startD = new Date(start);
    const endD = new Date(end);

    const days = [];
    for (let d = new Date(startD); d <= endD; d.setDate(d.getDate() + 1)) {
      const day = new Date(d);
      const dayOfWeek = day.getDay();

      // jours ouvrés uniquement (lundi → vendredi)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days.push({
          iso: day.toISOString().slice(0, 10),
          date: new Date(day)
        });
      }
    }

    const result = [];
    for (let i = 0; i < days.length; i += 5) {
      result.push({
        index: result.length + 1,
        days: days.slice(i, i + 5)
      });
    }

    return result;
  }

  function handleDatesChange(start, end) {
    setStartDate(start);
    setEndDate(end);

    if (start && end && start <= end) {
      setWeeks(generateWeeks(start, end));
      setActivities({});
    } else {
      setWeeks([]);
      setActivities({});
    }
  }

  function updateDayActivity(dateISO, value) {
    setActivities(prev => ({
      ...prev,
      [dateISO]: value
    }));
  }

  return (
    <div className="space-y-5">

      <h1 className="text-2xl font-bold text-slate-800">
        Planning Vacances
      </h1>

      {/* GROUPE */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-700">Groupe :</span>
        <select
          value={group}
          onChange={e => setGroup(e.target.value)}
          className="border rounded-md px-3 py-1.5 text-sm bg-white shadow-sm"
        >
          <option value="">— Choisir —</option>
          <option value="maternelle">Maternelle</option>
          <option value="primaire">Primaire</option>
        </select>
      </div>

      {!group && (
        <div className="text-sm font-medium text-orange-600">
          Veuillez choisir un groupe avant de définir le planning.
        </div>
      )}

      {/* DATES */}
      {group && (
        <VacancesDateSelector
          start={startDate}
          end={endDate}
          onChange={handleDatesChange}
        />
      )}

      {/* PLANNING */}
      {group && startDate && endDate && weeks.length > 0 && (
        <>
          <VacancesWeekTable
            weeks={weeks}
            activities={activities}
            onChange={updateDayActivity}
          />

          <ExportVacancesPdfButton
            group={group}
            startDate={startDate}
            endDate={endDate}
            weeks={weeks}
            activities={activities}
          />
        </>
      )}

    </div>
  );
}
