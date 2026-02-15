import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateVacancesPdf(planning, group) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`Planning Vacances – ${group}`, 14, 20);

  const tableData = [];

  planning.forEach(day => {
    tableData.push([
      {
        content: `${day.date}\n🌞 Matin`,
        styles: { fontStyle: "bold" }
      },
      {
        content: day.morning || "-",
      }
    ]);

    tableData.push([
      {
        content: `${day.date}\n🌙 Après-midi`,
        styles: { fontStyle: "bold" }
      },
      {
        content: day.afternoon || "-",
      }
    ]);
  });

  autoTable(doc, {
  startY: 30,
  head: [["Jour / Moment", "Activité"]],
  body: tableData,

  styles: {
    fontSize: 10,
    cellPadding: 6,
    valign: "top",
    overflow: "linebreak",
  },

  columnStyles: {
    0: { cellWidth: 55 },
    1: { cellWidth: 135 },
  },

  bodyStyles: {
    minCellHeight: 16,
  },

  didParseCell: function (data) {
    if (data.row.raw[0].content.includes("🌞")) {
      data.cell.styles.fillColor = [230, 242, 255]; // bleu clair matin
    }
    if (data.row.raw[0].content.includes("🌙")) {
      data.cell.styles.fillColor = [255, 240, 230]; // beige clair aprem
    }
  }
});

  doc.save(`planning-vacances-${group}.pdf`);
}


