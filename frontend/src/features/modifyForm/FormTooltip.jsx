import { BsQuestionCircle } from "react-icons/bs";
import { useState } from "react";
import {
  useFloating,
  useHover,
  offset,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import Tooltip from "../../ui/Tooltip";

function FormTooltip({ video, tooltip }) {
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    placement: "right",
    middleware: [offset(10)],
    open: isOpenTooltip,
    onOpenChange: setIsOpenTooltip,
  });
  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: {
      open: 300,
      close: 400,
    },
  });

  const hover = useHover(context, {
    delay: 150,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <div onClick={() => setIsOpenTooltip((isOpen) => !isOpen)}>
      <BsQuestionCircle
        ref={refs.setReference}
        {...getReferenceProps()}
        className="cursor-pointer text-gray-400"
      />
      {isOpenTooltip && (
        <Tooltip
          ref={refs.setFloating}
          style={{ ...floatingStyles, ...transitionStyles }}
          video={video}
          tooltip={tooltip}
          {...getFloatingProps()}
        />
      )}
    </div>
  );
}

export default FormTooltip;
