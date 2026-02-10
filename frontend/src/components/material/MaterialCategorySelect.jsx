import Select from "../ui/Select";

const CATEGORIES = [
  "Matériel sportif",
  "Jeux de société",
  "Matériel manuelle",
  "Autre"
];

export default function MaterialCategorySelect({ value, onChange }) {
  return (
    <Select label="Catégorie" value={value} onChange={(e) => onChange(e.target.value)}>
      {CATEGORIES.map(c => (
        <option key={c} value={c}>{c}</option>
      ))}
    </Select>
  );
}
