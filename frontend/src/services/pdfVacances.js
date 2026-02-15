import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateVacancesPdf(planning, group) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`Planning Vacances – ${group}`, 14, 20);

  const tableData = [];

  planning.forEach(day => {
    // 🌞 Ligne MATIN
    tableData.push([
      day.date,
      "Matin",
      day.morning || "-"
    ]);

    // 🌙 Ligne APRÈS-MIDI
    tableData.push([
      day.date,
      "Après-midi",
      day.afternoon || "-"
    ]);
  });

  autoTable(doc, {
    startY: 30,

    head: [["Jour", "Moment", "Activité"]],

    body: tableData,

    styles: {
      fontSize: 10,
      cellPadding: 6,
      valign: "top",
      overflow: "linebreak",
    },

    columnStyles: {
      0: { cellWidth: 35 },  // Jour
      1: { cellWidth: 35 },  // Moment
      2: { cellWidth: 120 }, // Activité
    },

    didParseCell: function (data) {
      if (data.column.index === 1) {
        if (data.cell.raw === "Matin") {
          data.cell.styles.fillColor = [230, 242, 255];
        }
        if (data.cell.raw === "Après-midi") {
          data.cell.styles.fillColor = [255, 240, 230];
        }
      }
    }
  });

  doc.save(`planning-vacances-${group}.pdf`);
}
