import { BsQuestionCircle } from "react-icons/bs";
import { useState } from "react";
import { useFloating, offset } from "@floating-ui/react";
import Tooltip from "../../ui/Tooltip";

function FormTooltip({ video, tooltip }) {
  const { refs, floatingStyles } = useFloating({
    placement: "right",
    middleware: [offset(10)],
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
        <Tooltip
          ref={refs.setFloating}
          style={floatingStyles}
          video={video}
          tooltip={tooltip}
        />
      )}
    </div>
  );
}

export default FormTooltip;
