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

    /* 🟧 BANNIÈRE */
    doc.setFillColor(249, 115, 22);
    doc.rect(0, 0, 297, 20, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(`Planning Vacances — ${group}`, 14, 13);

    doc.setFontSize(10);
    doc.text(`Du ${startDate} au ${endDate}`, 14, 18);

    let y = 28;

    weeks.forEach(week => {
      doc.setFontSize(12);
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

      const body = [
        week.days.map(d => {
          const a = activities[d.iso] || {};

          return {
            content:
              "🌞 MATIN\n\n" +
              (a.matin || "-") +
              "\n\n\n━━━━━━━━━━━━━━━━━━━━\n\n" +
              "🌙 APRÈS-MIDI\n\n" +
              (a.apresMidi || "-"),
            styles: {
              valign: "top"
            }
          };
        })
      ];

      autoTable(doc, {
        startY: y,
        head,
        body,
        theme: "grid",

        styles: {
          fontSize: 9,
          cellPadding: 5,
          overflow: "linebreak",
          textColor: [0, 0, 0],
          valign: "top"
        },

        headStyles: {
          fillColor: [255, 237, 213],
          textColor: [0, 0, 0],
          fontStyle: "bold"
        },

        didParseCell: function (data) {
          if (data.section === "body") {
            const text = data.cell.raw.content || "";

            if (text.includes("🌞 MATIN")) {
              data.cell.styles.fillColor = [219, 234, 254]; // bleu clair
            }
          }
        }
      });

      y = doc.lastAutoTable.finalY + 10;

      if (y > 180) {
        doc.addPage();
        y = 28;
      }
    });

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
