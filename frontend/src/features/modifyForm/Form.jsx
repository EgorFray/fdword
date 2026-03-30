function Form({ onSubmit, formRef, children }) {
  return (
    <form
      className="flex w-full max-w-100 flex-col items-start justify-items-start gap-3 py-0 md:max-w-160 md:gap-7 md:p-6"
      onSubmit={onSubmit}
      ref={formRef}
    >
      {children}
    </form>
  );
}

export default Form;
