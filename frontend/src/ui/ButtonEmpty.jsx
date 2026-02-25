function ButtonEmpty({ type, children }) {
  return (
    <button
      type={type}
      className="text-md cursor-pointer self-center rounded-full px-4 py-2 tracking-wide text-blue-950 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-colors duration-300 hover:bg-gray-300"
    >
      {children}
    </button>
  );
}

export default ButtonEmpty;
