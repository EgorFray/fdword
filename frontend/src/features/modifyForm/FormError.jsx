function FormError({ children }) {
  return (
    <span className="ml-4 text-start text-sm text-red-700 md:ml-0">
      {children}
    </span>
  );
}

export default FormError;
