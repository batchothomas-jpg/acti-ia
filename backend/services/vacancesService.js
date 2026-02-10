import { computeVacancesZoneC } from "./computeVacancesZoneC.js";
import { saveVacances, loadVacances } from "./storageVacances.js";

export function refreshVacances() {
  const list = computeVacancesZoneC();
  saveVacances(list);
  return list;
}

export function getVacances() {
  return loadVacances();
}
