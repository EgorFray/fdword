function Form({ onSubmit, children }) {
  return (
    <form
      className="flex w-full max-w-[320px] flex-col items-start justify-items-start gap-4 md:max-w-160 md:gap-7"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default Form;
