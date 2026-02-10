export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-5 border border-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
