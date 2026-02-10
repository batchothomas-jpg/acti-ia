import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportActivityPdfButton({ activity }) {
  function generatePdf() {
    if (!activity) return;

    const doc = new jsPDF("p", "mm", "a4");

    /* =========================
       EN-TÊTE
    ========================= */
    doc.setFillColor(255, 159, 64); // orange
    doc.rect(0, 0, 210, 22, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(activity.title || "Fiche activité", 105, 14, { align: "center" });

    let y = 30;

    /* =========================
       INFOS GÉNÉRALES
    ========================= */
    doc.setFontSize(11);
    doc.text(`Famille : ${activity.family}`, 14, y);
    y += 6;

    doc.text(
      `Groupe : ${activity.group} — ${activity.children} enfants — ${activity.duration} min`,
      14,
      y
    );
    y += 6;

    if (activity.theme) {
      doc.text(`Thème : ${activity.theme}`, 14, y);
      y += 6;
    }

    /* =========================
       OBJECTIFS
    ========================= */
    if (activity.objectives?.length) {
      doc.setFontSize(13);
      doc.text("Objectifs pédagogiques", 14, y);
      y += 4;

      doc.setFontSize(11);
      activity.objectives.forEach(o => {
        doc.text(`• ${o}`, 16, y);
        y += 5;
      });
    }

    /* =========================
       MATÉRIEL
    ========================= */
    y += 2;
    doc.setFontSize(13);
    doc.text("Matériel nécessaire", 14, y);
    y += 4;

    doc.setFontSize(11);
    doc.text(activity.materials || "—", 16, y);
    y += 8;

    /* =========================
       DÉROULEMENT
    ========================= */
    doc.setFontSize(13);
    doc.text("Déroulement de l’activité", 14, y);
    y += 4;

    autoTable(doc, {
      startY: y,
      head: [["Étape", "Description"]],
      body: activity.steps.map((s, i) => [
        `Étape ${i + 1} — ${s.title}`,
        s.content
      ]),
      styles: {
        fontSize: 10,
        textColor: [0, 0, 0]
      },
      headStyles: {
        fillColor: [255, 159, 64],
        textColor: [0, 0, 0]
      }
    });

    y = doc.lastAutoTable.finalY + 6;

    /* =========================
       VARIANTES
    ========================= */
    if (activity.variants?.length) {
      doc.setFontSize(13);
      doc.text("Variantes possibles", 14, y);
      y += 4;

      doc.setFontSize(11);
      activity.variants.forEach(v => {
        doc.text(`• ${v}`, 16, y);
        y += 5;
      });
    }

    /* =========================
       VIGILANCE
    ========================= */
    if (activity.vigilance) {
      y += 4;
      doc.setFontSize(13);
      doc.text("Points de vigilance", 14, y);
      y += 4;

      doc.setFontSize(11);
      doc.text(activity.vigilance, 16, y);
    }

    /* =========================
       EXPORT
    ========================= */
    const filename = activity.title
      ? activity.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
      : "fiche_activite";

    doc.save(`${filename}.pdf`);
  }

  return (
    <button
      onClick={generatePdf}
      className="px-3 py-1.5 bg-orange-500 text-black rounded hover:bg-orange-600 text-sm"
    >
      📄 Télécharger la fiche PDF
    </button>
  );
}
