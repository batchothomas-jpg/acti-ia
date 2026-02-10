// src/components/activities/ActivityDetail.jsx
import ExportActivityPdfButton from "./ExportActivityPdfButton";
export default function ActivityDetail({ activity, onClose }) {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4">

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{activity.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✖
          </button>
        </div>

        <p className="text-sm text-gray-700">{activity.description}</p>

        {/* OBJECTIFS */}
        {activity.objectives?.length > 0 && (
          <div>
            <h3 className="font-semibold">🎯 Objectifs</h3>
            <ul className="list-disc ml-6">
              {activity.objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        )}

        {/* MATÉRIEL */}
        {activity.materials?.length > 0 && (
          <div>
            <h3 className="font-semibold">🧰 Matériel</h3>
            <ul className="list-disc ml-6">
              {activity.materials.map((mat, i) => (
                <li key={i}>{mat}</li>
              ))}
            </ul>
          </div>
        )}

        {/* DÉROULEMENT */}
        {activity.steps?.length > 0 && (
          <div>
            <h3 className="font-semibold">📋 Déroulement</h3>
            <ul className="space-y-2">
              {activity.steps.map((step, i) => (
                <li key={step._id || i} className="border rounded p-2">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-gray-700">{step.content}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* VARIANTES */}
        {activity.variants?.length > 0 && (
          <div>
            <h3 className="font-semibold">🔁 Variantes</h3>
            <ul className="space-y-2">
              {activity.variants.map((variant, i) => (
                <li key={variant._id || i} className="border rounded p-2">
                  <p className="font-medium">{variant.title}</p>
                  <p className="text-sm text-gray-700">{variant.content}</p>
                </li>
              ))}
            </ul>
            <ExportActivityPdfButton activity={activity} />

          </div>
        )}

        {/* VIGILANCE */}
        {activity.vigilance && (
          <div className="bg-yellow-100 border border-yellow-300 p-3 rounded">
            ⚠️ <strong>Vigilance :</strong> {activity.vigilance}
          </div>
        )}
      </div>
    </div>
  );
}
