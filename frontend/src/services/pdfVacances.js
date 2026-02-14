import jsPDF from "jspdf";

export function generateVacancesPdf(planning) {
  const doc = new jsPDF({ orientation: "landscape" });

  const cellWidth = 60;
  const cellHeight = 30;
  const lineHeight = 4;
  const maxLines = 5;

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

  planning.forEach((week, wIndex) => {
    const yStart = 15 + wIndex * 55;

    doc.setFontSize(12);
    doc.text(week.title || "", 10, yStart);

    week.days.forEach((day, dIndex) => {
      const x = 10 + dIndex * (cellWidth + 8);
      const y = yStart + 5;

      const lines = wrapText(day.activity);

      doc.rect(x, y, cellWidth, cellHeight);
      doc.setFontSize(9);
      doc.text(lines, x + 2, y + 8);
    });
  });

  doc.save("planning-vacances.pdf");
}
