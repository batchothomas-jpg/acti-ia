export function generateACMPeriods() {
  return [
    { key: "P1", label: "Sept–Oct",  start: [9, 1],  end: [10, 31] },
    { key: "P2", label: "Nov–Déc",   start: [11, 1], end: [12, 31] },
    { key: "P3", label: "Jan–Fév",   start: [1, 1],  end: [2, 28] },
    { key: "P4", label: "Mar–Avr",   start: [3, 1],  end: [4, 30] },
    { key: "P5", label: "Mai–Juin",  start: [5, 1],  end: [6, 30] },
  ];
}
