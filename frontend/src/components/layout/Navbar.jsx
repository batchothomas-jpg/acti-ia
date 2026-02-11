import { Menu } from "lucide-react";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="h-14 bg-white border-b flex items-center px-4 gap-3">
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded hover:bg-gray-100"
      >
        <Menu size={22} />
      </button>

      <h1 className="font-semibold text-lg">Acti-IA</h1>
    </header>
  );
}
