import jsPDF from "jspdf";
import "jspdf-autotable";

export default function generateACMPdf({weeks,group}) {
  const doc = new jsPDF("landscape");

  const dateLabel = `Planning ACM – ${group}`;

  doc.setFontSize(14);
  doc.text(dateLabel, 14, 12);

  let startY = 22;

  weeks.forEach((week, index) => {
    doc.setFontSize(12);
    doc.text(`Semaine ${index + 1}`, 14, startY);
    startY += 8;

    week.days.forEach(day => {
      doc.setFontSize(10);
      doc.text(
        `${day.label} : Matin → ${day.morning || "—"} | Après-midi → ${day.afternoon || "—"}`,
        16,
        startY
      );
      startY += 6;
    });

    startY += 6;
  });

  doc.save("planning-acm.pdf");
}
