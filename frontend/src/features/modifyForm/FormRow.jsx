import FormError from "./FormError";
import Label from "./Label";

function FormRow({ label, children, error }) {
  return (
    <div className="mb-6 grid grid-cols-[160px_1fr_1fr] items-center justify-items-start gap-6">
      {label && <Label>{label}</Label>}
      {children}
      {error && <FormError>{error}</FormError>}
    </div>
  );
}

export default FormRow;
