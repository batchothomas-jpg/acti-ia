import jsPDF from "jspdf";

export function generateACMPdf(planning) {
  const doc = new jsPDF({ orientation: "landscape" });

  const cellWidth = 90;
  const cellHeight = 35;
  const lineHeight = 5;
  const maxLines = 6;

  planning.forEach((day, index) => {
    const x = 10;
    const y = 20 + index * (cellHeight + 10);

    doc.setFontSize(11);
    doc.text(day.date || "", x, y);

    const wrapText = (text) => {
      const lines = doc.splitTextToSize(text || "", cellWidth - 4);

      if (lines.length > maxLines) {
        return [
          ...lines.slice(0, maxLines - 1),
          lines[maxLines - 1] + "…",
        ];
      }

      return lines;
    };

    const morningLines = wrapText(day.morning);
    const afternoonLines = wrapText(day.afternoon);

    // Cadres
    doc.rect(x, y + 4, cellWidth, cellHeight);
    doc.rect(x + cellWidth + 10, y + 4, cellWidth, cellHeight);

    // Textes
    doc.setFontSize(10);
    doc.text(morningLines, x + 2, y + 10);
    doc.text(afternoonLines, x + cellWidth + 12, y + 10);
  });

  doc.save("planning-acm.pdf");
}
