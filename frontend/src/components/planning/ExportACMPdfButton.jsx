import generateACMPdf from "../../services/planningACM/generateACMPdf";

function handleExport() {
  try {
    if (!group) {
      alert("Veuillez sélectionner un groupe");
      return;
    }

    if (!weeks || weeks.length === 0) {
      alert("Aucun planning à exporter");
      return;
    }


    generateACMPdf({ group, weeks });

  } catch (err) {
    console.error("❌ ERREUR PDF :", err);
    alert("Erreur lors de la génération du planning");
  }
}

export default function ExportACMPdfButton({ weeks, group }) {
  function handleExport() {
    try {
      if (!weeks || weeks.length === 0) {
        alert("Aucun planning à exporter");
        return;
      }

      generateACMPdf({
        group,
        weeks
      });

    } catch (err) {
      console.error("❌ ERREUR PDF :", err);
      alert("Erreur lors de la génération du PDF");
    }
  }

  return (
    <button
      onClick={handleExport}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Télécharger le planning ACM (PDF)
    </button>
  );
}
