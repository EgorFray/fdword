import { BsQuestionCircle } from "react-icons/bs";
import { useState } from "react";
import {
  useFloating,
  useHover,
  offset,
  useInteractions,
  useTransitionStyles,
  flip,
  shift,
} from "@floating-ui/react";
import Tooltip from "../../ui/Tooltip";

function FormTooltip({ video, poster, tooltip }) {
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    placement: "right",
    middleware: [offset(10), flip(), shift()],
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
    delay: 200,
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
          poster={poster}
          tooltip={tooltip}
          {...getFloatingProps()}
        />
      )}
    </div>
  );
}

export default FormTooltip;
