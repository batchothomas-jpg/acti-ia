export default function StatusBannerVacances({ group, period }) {
  if (!group) {
    return (
      <div className="p-3 rounded-md text-sm bg-yellow-100 text-yellow-800 border border-yellow-300">
        Sélectionner un groupe pour afficher le planning.
      </div>
    );
  }

  if (!period) {
    return (
      <div className="p-3 rounded-md text-sm bg-yellow-100 text-yellow-800 border border-yellow-300">
        Choisir une période de vacances.
      </div>
    );
  }

  return null;
}
