export default function Select({ label, children, ...props }) {
  return (
    <label className="flex flex-col gap-1 w-full">
      {label && <span className="font-medium text-sm text-gray-700">{label}</span>}
      <select
        {...props}
        className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:ring-2 focus:outline-none bg-white"
      >
        {children}
      </select>
    </label>
  );
}
