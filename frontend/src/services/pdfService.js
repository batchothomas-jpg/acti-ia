import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export function exportPDFAnimateur(planning) {
  const doc = new jsPDF({ orientation: "landscape" })
  doc.setFont("Helvetica", "normal")

  doc.setFontSize(18)
  doc.text("Planning Animateur", 14, 18)

  const rows = []

  planning.days.forEach(d => {
    rows.push([
      formatDate(d.date),
      d.morning?.title || "-",
      d.afternoon?.title || "-",
      d.grandJeu ? "⭐" : ""
    ])
  })

  autoTable(doc, {
    startY: 28,
    head: [["Date", "Matin", "Après-midi", "Grand Jeu"]],
    body: rows,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [66, 139, 202] }
  })

  doc.save("planning-animateur.pdf")
}

export function exportPDFDirection(planning) {
  const doc = new jsPDF({ orientation: "landscape" })
  doc.setFont("Helvetica", "normal")

  doc.setFontSize(18)
  doc.text("Planning Direction", 14, 18)

  const rows = []

  planning.days.forEach(d => {
    rows.push([
      formatDate(d.date),
      d.morning?.title || "-",
      d.morning?.objective || "-",
      d.afternoon?.title || "-",
      d.afternoon?.objective || "-"
    ])
  })

  autoTable(doc, {
    startY: 28,
    head: [["Date", "Matin", "Objectif", "Après-midi", "Objectif"]],
    body: rows,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [92, 184, 92] }
  })

  doc.save("planning-direction.pdf")
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit"
  })
}
