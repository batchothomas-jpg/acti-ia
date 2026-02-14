import jsPDF from "jspdf";

export function generateVacancesPdf(planning) {
  const doc = new jsPDF({ orientation: "landscape" });

  const cellWidth = 60;
  const cellHeight = 18; // une cellule matin / aprem
  const spacingY = 6;
  const maxLines = 3;

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
    const yStart = 15 + wIndex * 60;

    doc.setFontSize(12);
    doc.text(week.title || "", 10, yStart);

    week.days.forEach((day, dIndex) => {
      const x = 10 + dIndex * (cellWidth + 8);
      const yMorning = yStart + 5;
      const yAfternoon = yMorning + cellHeight;

      const morningLines = wrapText(day.morning);
      const afternoonLines = wrapText(day.afternoon);

      // 📦 Cellule MATIN
      doc.rect(x, yMorning, cellWidth, cellHeight);
      doc.setFontSize(8);
      doc.text(morningLines, x + 2, yMorning + 6);

      // 📦 Cellule APRÈS-MIDI
      doc.rect(x, yAfternoon, cellWidth, cellHeight);
      doc.text(afternoonLines, x + 2, yAfternoon + 6);
    });
  });

  doc.save("planning-vacances.pdf");
}
