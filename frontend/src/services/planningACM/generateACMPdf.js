import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function generateACMPdf({ group, weeks }) {
  if (!group) {
    throw new Error("Groupe manquant");
  }

  if (!weeks || !Array.isArray(weeks)) {
    throw new Error("Weeks invalide");
  }

  const doc = new jsPDF();

  // ===== TITRE =====
  doc.setFontSize(16);
  doc.text("Planning ACM", 14, 15);

  doc.setFontSize(11);
  doc.text(`Groupe : ${group}`, 14, 23);

  // ===== TABLE =====
  const body = weeks.map((week) => [
    `${week.label}\n${new Date(week.date).toLocaleDateString("fr-FR")}`,
    week.morning || "",
    week.afternoon || ""
  ]);

  autoTable(doc, {
    startY: 32,
    head: [["Semaine", "Matin", "Après-midi"]],
    body,
    styles: {
      fontSize: 9,
      cellPadding: 3,
      valign: "top"
    },
    headStyles: {
      fillColor: [41, 128, 185]
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 70 },
      2: { cellWidth: 70 }
    }
  });

  doc.save(`planning-acm-${group}.pdf`);
}
