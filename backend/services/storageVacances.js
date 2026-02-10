import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "storage", "vacances.json");

export function saveVacances(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

export function loadVacances() {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
