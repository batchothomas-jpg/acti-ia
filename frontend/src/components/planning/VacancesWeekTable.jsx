import VacancesCell from "./VacancesCell";

export default function VacancesWeekTable({ weeks, activities, onChange }) {
  if (!weeks || weeks.length === 0) return null;

  return (
    <div className="space-y-6">

      {weeks.map(week => (
        <div key={week.index} className="border rounded-lg overflow-hidden">

          {/* TITRE SEMAINE */}
          <div className="bg-slate-100 px-3 py-2 font-semibold text-slate-700">
            Semaine {week.index}
          </div>

          {/* TABLE */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 text-sm">
                {week.days.map(day => (
                  <th
                    key={day.iso}
                    className="border px-2 py-1 text-center font-medium"
                  >
                    {day.date.toLocaleDateString("fr-FR", {
                      weekday: "short",
                      day: "numeric",
                      month: "numeric"
                    })}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                {week.days.map(day => (
                  <VacancesCell
                    key={day.iso}
                    day={day}
                    value={activities[day.iso]}
                    onChange={val => onChange(day.iso, val)}
                  />
                ))}
              </tr>
            </tbody>
          </table>

        </div>
      ))}
    </div>
  );
}
