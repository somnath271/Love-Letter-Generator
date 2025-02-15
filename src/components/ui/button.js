export function Button({ children, onClick }) {
  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
