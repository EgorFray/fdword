import FormError from "./FormError";
import FormTooltip from "./FormTooltip";
import Label from "./Label";

function FormRow({ label, children, info = false, error }) {
  return (
    <div className="mb-6 grid grid-cols-[160px_1fr_1fr] items-center justify-items-start gap-6">
      {label && <Label>{label}</Label>}
      <div className="flex items-center gap-2">
        {children}
        {info && <FormTooltip />}
      </div>
      {error && <FormError>{error}</FormError>}
    </div>
  );
}

export default FormRow;
