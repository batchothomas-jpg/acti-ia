// src/components/activities/ExportActivityPdfButton.jsx
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportActivityPdfButton({ activity }) {
  function exportPdf() {
    const doc = new jsPDF();

    doc.setFillColor(255, 165, 0);
    doc.rect(0, 0, 210, 20, "F");
    doc.setTextColor(0, 0, 0);
    doc.text(activity.title, 10, 13);

    doc.text(`Famille : ${activity.family}`, 10, 30);
    doc.text(`Groupe : ${activity.group}`, 10, 38);
    doc.text(`Durée : ${activity.duration} min`, 10, 46);

    autoTable(doc, {
      startY: 55,
      head: [["Déroulement"]],
      body: activity.steps.map(s => [`${s.title} : ${s.content}`]),
    });

    doc.save(`${activity.title}.pdf`);
  }

  return (
    <button
  type="button"   // ✅ LIGNE MAGIQUE
  onClick={exportPdf}
  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
>
  📄 Télécharger la fiche PDF
</button>

  );
}
