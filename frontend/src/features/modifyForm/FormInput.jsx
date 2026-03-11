function FormInput({ id, type, placeholder, ...props }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="rounded-lg bg-white p-1 pl-2"
      {...props}
    />
  );
}

export default FormInput;
