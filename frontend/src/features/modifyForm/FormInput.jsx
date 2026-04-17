function FormInput({ id, type, placeholder, ...props }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg bg-white p-1 pl-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      {...props}
    />
  );
}

export default FormInput;
