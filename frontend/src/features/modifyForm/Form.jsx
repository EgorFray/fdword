function Form({ onSubmit, formRef, children }) {
  return (
    <form
      className="max-w-160 items-start justify-items-start rounded-xl border border-blue-950/40 p-6"
      onSubmit={onSubmit}
      ref={formRef}
    >
      {children}
    </form>
  );
}

export default Form;
