import { families } from "../data/families";

export default function BadgeFamily({ family }) {
  const color = families[family] || "bg-slate-500";

  return (
    <span className={`text-white text-xs px-2 py-0.5 rounded-full ${color}`}>
      {family}
    </span>
  );
}
