import React from "react";

export default function ACMStatusBanner({ state }) {
  if (state === "nogroup") {
    return (
      <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md mb-3 text-sm">
        ⚠ Sélectionnez un groupe avant de planifier les activités.
      </div>
    );
  }

  if (state === "archive") {
    return (
      <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mb-3 text-sm">
        📁 Archive — Consultation uniquement
      </div>
    );
  }

  if (state === "summer") {
    return (
      <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-md mb-3 text-sm">
        ☀ Planning d'été — Lecture seule
      </div>
    );
  }

  return null;
}
