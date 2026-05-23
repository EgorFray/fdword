function FormContainer({ children }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      {children}
    </div>
  );
}

export default FormContainer;
