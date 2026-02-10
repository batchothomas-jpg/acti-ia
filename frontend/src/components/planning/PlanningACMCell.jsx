import { useState } from "react";
import { createPortal } from "react-dom";
import PlanningACMModal from "./PlanningACMModal";

export default function PlanningACMCell({ value, onChange, disabled }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <td
        onClick={() => {
          if (!disabled) setOpen(true);
        }}
        className={`p-2 border align-top ${
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "cursor-pointer hover:bg-blue-50"
        }`}
      >
        {value ? (
          <div className="text-sm whitespace-pre-wrap">{value}</div>
        ) : (
          <div className="text-xs italic text-gray-400">
            + Ajouter une activité
          </div>
        )}
      </td>

      {open &&
        createPortal(
          <PlanningACMModal
            value={value}
            onClose={() => setOpen(false)}
            onConfirm={(val) => {
              onChange(val);
              setOpen(false);
            }}
          />,
          document.body
        )}
    </>
  );
}
