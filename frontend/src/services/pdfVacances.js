import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateVacancesPdf(planning, group) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`Planning Vacances – ${group}`, 14, 20);

  let startY = 30;

  planning.forEach(day => {

    // 📅 Titre du jour (ligne pleine largeur)
    autoTable(doc, {
      startY: startY,
      body: [[{ content: day.date, styles: { halign: "center", fontStyle: "bold" } }]],
      theme: "grid",
      styles: { fontSize: 12 },
      columnStyles: {
        0: { cellWidth: 180 }
      }
    });

    startY = doc.lastAutoTable.finalY;

    // 🌞 MATIN
    autoTable(doc, {
      startY: startY,
      body: [
        [{ content: "MATIN", styles: { fontStyle: "bold", fillColor: [230, 242, 255] } }],
        [day.morning || "-"]
      ],
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 6,
        overflow: "linebreak",
        valign: "top"
      },
      columnStyles: {
        0: { cellWidth: 180 }
      }
    });

    startY = doc.lastAutoTable.finalY;

    // 🌙 APRÈS-MIDI
    autoTable(doc, {
      startY: startY,
      body: [
        [{ content: "APRÈS-MIDI", styles: { fontStyle: "bold", fillColor: [255, 240, 230] } }],
        [day.afternoon || "-"]
      ],
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 6,
        overflow: "linebreak",
        valign: "top"
      },
      columnStyles: {
        0: { cellWidth: 180 }
      }
    });

    startY = doc.lastAutoTable.finalY + 6; // espace entre les jours
  });

  doc.save(`planning-vacances-${group}.pdf`);
}
