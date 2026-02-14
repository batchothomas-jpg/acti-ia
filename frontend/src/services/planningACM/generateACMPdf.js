import jsPDF from "jspdf";

export function generateACMPdf(planning) {
  const doc = new jsPDF({ orientation: "landscape" });

  const cellWidth = 90;
  const cellHeight = 20; // une cellule par période
  const daySpacing = 12;
  const maxLines = 4;

  const wrapText = (text) => {
    const lines = doc.splitTextToSize(text || "", cellWidth - 6);

    if (lines.length > maxLines) {
      return [
        ...lines.slice(0, maxLines - 1),
        lines[maxLines - 1] + "…",
      ];
    }

    return lines;
  };

  planning.forEach((day, index) => {
    const x = 10;
    const yBase = 20 + index * (cellHeight * 2 + daySpacing);

    // 📅 Date
    doc.setFontSize(11);
    doc.text(day.date || "", x, yBase);

    const morningLines = wrapText(day.morning);
    const afternoonLines = wrapText(day.afternoon);

    const yMorning = yBase + 4;
    const yAfternoon = yMorning + cellHeight;

    // 🌅 Cellule MATIN
    doc.rect(x, yMorning, cellWidth, cellHeight);
    doc.setFontSize(9);
    doc.text("Matin :", x + 2, yMorning + 6);
    doc.text(morningLines, x + 2, yMorning + 11);

    // 🌇 Cellule APRÈS-MIDI
    doc.rect(x, yAfternoon, cellWidth, cellHeight);
    doc.text("Après-midi :", x + 2, yAfternoon + 6);
    doc.text(afternoonLines, x + 2, yAfternoon + 11);
  });

  doc.save("planning-acm.pdf");
}
