import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportVacancesPdfButton({
  group,
  startDate,
  endDate,
  weeks,
  activities
}) {
  function hasAtLeastOneActivity() {
    return Object.values(activities).some(day =>
      (day?.matin && day.matin.trim() !== "") ||
      (day?.apresMidi && day.apresMidi.trim() !== "")
    );
  }

  function generatePdf() {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4"
    });

    /* ===== EN-TÊTE PROFESSIONNEL ===== */
    doc.setFillColor(40, 40, 40);
    doc.rect(0, 0, 297, 18, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(`PLANNING VACANCES — ${group}`, 14, 11);

    doc.setFontSize(9);
    doc.text(`Du ${startDate} au ${endDate}`, 220, 11);

    let y = 25;

    weeks.forEach(week => {
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.text(`Semaine ${week.index}`, 14, y);
      y += 6;

      const head = [
        week.days.map(d =>
          d.date.toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "numeric",
            month: "numeric"
          })
        )
      ];

      const morningRow = week.days.map(d => {
        const a = activities[d.iso] || {};
        return `MATIN\n\n${a.matin || "-"}`;
      });

      const afternoonRow = week.days.map(d => {
        const a = activities[d.iso] || {};
        return `APRÈS-MIDI\n\n${a.apresMidi || "-"}`;
      });

      autoTable(doc, {
        startY: y,
        head,
        body: [morningRow, afternoonRow],
        theme: "grid",

        styles: {
          fontSize: 9,
          cellPadding: 6,
          overflow: "linebreak",
          valign: "top",
          lineWidth: 0.4,
          lineColor: [80, 80, 80]
        },

        headStyles: {
          fillColor: [230, 230, 230],
          textColor: [0, 0, 0],
          fontStyle: "bold"
        },

        didParseCell: function (data) {
          if (data.section === "body") {
            if (data.row.index === 0) {
              // MATIN légèrement grisé
              data.cell.styles.fillColor = [245, 247, 250];
              data.cell.styles.fontStyle = "bold";
            }
            if (data.row.index === 1) {
              // APRÈS-MIDI fond blanc mais titre en gras
              data.cell.styles.fontStyle = "bold";
            }
          }
        }
      });

      y = doc.lastAutoTable.finalY + 12;

      if (y > 180) {
        doc.addPage();
        y = 25;
      }
    });

    /* ===== NUMÉRO DE PAGE ===== */
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(
        `Page ${i} / ${pageCount}`,
        270,
        200
      );
    }

    doc.save(`planning-vacances-${group}.pdf`);
  }

  const enabled = hasAtLeastOneActivity();

  return (
    <button
      onClick={enabled ? generatePdf : undefined}
      disabled={!enabled}
      className={`px-4 py-2 rounded font-medium ${
        enabled
          ? "bg-orange-500 text-white hover:bg-orange-600"
          : "bg-slate-300 text-slate-500 cursor-not-allowed"
      }`}
    >
      Télécharger le planning en PDF
    </button>
  );
}
