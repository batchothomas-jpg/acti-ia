import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function VacancesPDFExport({ selected, weeks }) {
  const exportPDF = () => {
    const pdf = new jsPDF({ orientation: "landscape" });

    pdf.setFontSize(16);
    pdf.text(`Planning Vacances — ${selected.label}`, 14, 12);

    weeks.forEach((week, idx) => {
      const rows = week.map(day => {
        const label = day.date.toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long"
        });

        if (day.holiday) {
          return [label, `${day.holidayName} (Férié)`, `${day.holidayName} (Férié)`];
        }

        return [
          label,
          day.morning?.name || "",
          day.afternoon?.name || ""
        ];
      });

      autoTable(pdf, {
        startY: pdf.lastAutoTable ? pdf.lastAutoTable.finalY + 10 : 20,
        head: [["Jour", "Matin", "Après-midi"]],
        body: rows,
        theme: "grid",
        styles: { fontSize: 9 },
        headStyles: { fillColor: [37, 99, 235] }, // bleu ACM
      });
    });

    pdf.save(`planning_vacances_${selected.id}.pdf`);
  };

  return (
    <button
      onClick={exportPDF}
      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
    >
      Export PDF
    </button>
  );
}
