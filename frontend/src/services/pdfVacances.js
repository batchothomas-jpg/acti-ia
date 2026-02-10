import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportVacancesPDF({ data, group, period }) {
  const doc = new jsPDF({ orientation: "landscape" });

  const today = new Date().toLocaleDateString("fr-FR");

  doc.setFontSize(11);
  doc.text(`Centre : ${localStorage.getItem("centerName") || "Non défini"}`, 14, 14);
  doc.text(`Service Animation`, 14, 20);
  doc.text(`Groupe : ${group}`, 14, 26);
  doc.text(`Période : ${period.nom} (${period.start} → ${period.end})`, 14, 32);
  doc.text(`Établi le : ${today}`, 14, 38);

  const rows = data.map(d => [
    d.date,
    d.weekday,
    d.activity || ""
  ]);

  autoTable(doc, {
    startY: 46,
    head: [["Date", "Jour", "Activité"]],
    body: rows,
    styles: {
      fontSize: 9,
      cellPadding: 2
    },
    headStyles: {
      fillColor: [234, 88, 12], // orange
      textColor: 255
    }
  });

  doc.save(`planning_vacances_${period.id}_${group}.pdf`);
}
