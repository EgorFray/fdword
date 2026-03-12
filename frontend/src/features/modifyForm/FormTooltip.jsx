import { BsQuestionCircle } from "react-icons/bs";
import { useState } from "react";
import { useFloating } from "@floating-ui/react";
import Tooltip from "../../ui/Tooltip";

function FormTooltip() {
  const { refs, floatingStyles } = useFloating({
    placement: "right",
  });
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  return (
    <div
      onClick={() => setIsOpenTooltip((isOpen) => !isOpen)}
      onMouseEnter={() => setIsOpenTooltip(true)}
      onMouseLeave={() => setIsOpenTooltip(false)}
    >
      <BsQuestionCircle
        ref={refs.setReference}
        className="cursor-pointer text-gray-400"
      />
      {isOpenTooltip && (
        <Tooltip ref={refs.setFloating} style={floatingStyles} />
      )}
    </div>
  );
}

export default FormTooltip;
