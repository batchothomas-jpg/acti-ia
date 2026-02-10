export default function EmptyState({ message, action }) {
  return (
    <div className="text-center text-gray-500 py-12">
      <p className="mb-3">{message}</p>
      {action && action}
    </div>
  );
}
