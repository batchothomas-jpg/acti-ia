import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateACMPdf(planning) {
  const doc = new jsPDF({ orientation: "portrait" });

  doc.setFontSize(18);
  doc.text("Planning ACM", 14, 20);

  const tableData = [];

  planning.forEach(day => {
    tableData.push([
      {
        content: `${day.date}\n🌞 Matin`,
        styles: { fontStyle: "bold" }
      },
      day.morning || "-"
    ]);

    tableData.push([
      {
        content: `${day.date}\n🌙 Après-midi`,
        styles: { fontStyle: "bold" }
      },
      day.afternoon || "-"
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
        data.cell.styles.fillColor = [230, 242, 255];
      }
      if (data.row.raw[0].content.includes("🌙")) {
        data.cell.styles.fillColor = [255, 240, 230];
      }
    }
  });

  doc.save("planning-acm.pdf");
}
