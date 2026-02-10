import fs from "fs";

const file = "./vacances-ete.json";

export function saveEte(start, end) {
  fs.writeFileSync(file, JSON.stringify({ start, end }, null, 2));
}

export function loadEte() {
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
