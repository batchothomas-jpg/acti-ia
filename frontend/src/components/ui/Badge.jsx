export default function Badge({ children, variant = "info" }) {
  const colors = {
    info: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${colors[variant]}`}>
      {children}
    </span>
  );
}
