function Button({ children }) {
  return (
    <button className="text-md cursor-pointer self-center rounded-full bg-blue-600 px-4 py-2 tracking-wide text-blue-50 transition-colors duration-300 hover:bg-blue-500">
      {" "}
      {children}{" "}
    </button>
  );
}

export default Button;
