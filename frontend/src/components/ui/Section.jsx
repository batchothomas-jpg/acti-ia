export default function Section({ title, children }) {
  return (
    <section className="mb-8">
      {title && (
        <h2 className="text-xl font-semibold mb-3 text-gray-800">{title}</h2>
      )}
      {children}
    </section>
  );
}
