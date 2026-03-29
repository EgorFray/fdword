import FormError from "./FormError";
import FormTooltip from "./FormTooltip";
import Label from "./Label";

function FormRow({ label, children, info = false, error, video, tooltip }) {
  return (
    <div className="mb-4 flex flex-col items-start justify-items-start gap-2 md:mb-6 md:grid md:grid-cols-[160px_1fr_1fr] md:items-center md:gap-6">
      {label && <Label>{label}</Label>}
      <div className="ml-4 flex w-full items-center gap-2 md:ml-0">
        {children}
        {info && <FormTooltip video={video} tooltip={tooltip} />}
      </div>
      {error && <FormError>{error}</FormError>}
    </div>
  );
}

export default FormRow;
