import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateVacancesPdf(planning, group) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`Planning Vacances – ${group}`, 14, 20);

  let startY = 30;

  planning.forEach(day => {

    // 📅 DATE (bandeau gris)
    autoTable(doc, {
      startY,
      body: [[{
        content: day.date,
        styles: {
          halign: "center",
          fontStyle: "bold",
          fillColor: [220, 220, 220],
          fontSize: 12
        }
      }]],
      theme: "grid",
      columnStyles: { 0: { cellWidth: 180 } }
    });

    startY = doc.lastAutoTable.finalY;

    // 🌞 MATIN (bandeau bleu)
    autoTable(doc, {
      startY,
      body: [
        [{
          content: "🌞 MATIN",
          styles: {
            fontStyle: "bold",
            fillColor: [180, 215, 255],
            fontSize: 11
          }
        }],
        [{
          content: day.morning || "-",
          styles: { fontSize: 10 }
        }]
      ],
      theme: "grid",
      styles: {
        overflow: "linebreak",
        cellPadding: 8,
        valign: "top",
        lineWidth: 0.5
      },
      columnStyles: { 0: { cellWidth: 180 } }
    });

    startY = doc.lastAutoTable.finalY + 4;

    // 🌙 APRÈS-MIDI (bandeau orange)
    autoTable(doc, {
      startY,
      body: [
        [{
          content: "🌙 APRÈS-MIDI",
          styles: {
            fontStyle: "bold",
            fillColor: [255, 210, 170],
            fontSize: 11
          }
        }],
        [{
          content: day.afternoon || "-",
          styles: { fontSize: 10 }
        }]
      ],
      theme: "grid",
      styles: {
        overflow: "linebreak",
        cellPadding: 8,
        valign: "top",
        lineWidth: 0.5
      },
      columnStyles: { 0: { cellWidth: 180 } }
    });

    startY = doc.lastAutoTable.finalY + 10; // espace fort entre jours
  });

  doc.save(`planning-vacances-${group}.pdf`);
}
