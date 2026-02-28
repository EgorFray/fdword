function Button({ type, onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="text-md cursor-pointer self-center rounded-full bg-blue-600 px-4 py-2 tracking-wide text-blue-50 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-colors duration-300 hover:bg-blue-500"
    >
      {" "}
      {children}{" "}
    </button>
  );
}

export default Button;
