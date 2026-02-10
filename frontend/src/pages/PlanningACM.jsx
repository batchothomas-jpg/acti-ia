import { useState } from "react";
import ACMGroupSelector from "../components/planning/ACMGroupSelector";
import PlanningACMCell from "../components/planning/PlanningACMCell";
import ExportACMPdfButton from "../components/planning/ExportACMPdfButton";

function getWednesdaysBetween(start, end) {
  const dates = [];
  const current = new Date(start);

  while (current <= end) {
    if (current.getDay() === 3) {
      dates.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export default function PlanningACM() {
  const [group, setGroup] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ✅ LE STATE QUI MANQUAIT
  const [weeks, setWeeks] = useState([]);

  function generatePlanning() {
    if (!group) {
    alert("Veuillez sélectionner un groupe");
    return;
  }

  if (!startDate || !endDate) {
    alert("Veuillez sélectionner une période");
    return;
  }

    const wednesdays = getWednesdaysBetween(
      new Date(startDate),
      new Date(endDate)
    );

    const generatedWeeks = wednesdays.map((date, index) => ({
      label: `Semaine ${index + 1}`,
      date,
      morning: "",
      afternoon: "",
    }));

    setWeeks(generatedWeeks);
  }

  function updateCell(index, period, value) {
    const updated = [...weeks];
    updated[index][period] = value;
    setWeeks(updated);
  }

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Planning ACM</h1>

      {/* GROUPE */}
      <ACMGroupSelector group={group} onChange={setGroup} />

      {/* PERIODE */}
      <div className="flex gap-4">
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={generatePlanning}
          className="bg-green-600 text-white px-4 rounded"
        >
          Générer les mercredis
        </button>
      </div>

      {/* TABLEAU */}
      {weeks.length > 0 && (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Semaine</th>
              <th className="border p-2">Matin</th>
              <th className="border p-2">Après-midi</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, i) => (
              <tr key={i}>
                <td className="border p-2">
                  {week.label}<br />
                  <span className="text-xs text-gray-500">
                    {week.date.toLocaleDateString("fr-FR")}
                  </span>
                </td>
                <PlanningACMCell
                  value={week.morning}
                  disabled={!group}
                  onChange={val => updateCell(i, "morning", val)}
                />

                <PlanningACMCell
                  value={week.afternoon}
                  disabled={!group}
                  onChange={val => updateCell(i, "afternoon", val)}
                />

              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* EXPORT PDF */}
      {weeks.length > 0 && (
        <ExportACMPdfButton weeks={weeks}group={group}/>

      )}
    </div>
  );
}
