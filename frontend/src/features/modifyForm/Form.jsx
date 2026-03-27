function Form({ onSubmit, formRef, children }) {
  return (
    <form
      className="flex max-w-160 flex-col items-start justify-items-start gap-7 rounded-xl border border-blue-950/40 p-6"
      onSubmit={onSubmit}
      ref={formRef}
    >
      {children}
    </form>
  );
}

export default Form;
