import { BsQuestionCircle } from "react-icons/bs";
import { useState } from "react";
import { useFloating } from "@floating-ui/react";
import Tooltip from "../../ui/Tooltip";

function FormTooltip() {
  const { refs } = useFloating();
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  return (
    <div onClick={() => setIsOpenTooltip((isOpen) => !isOpen)}>
      <BsQuestionCircle className="cursor-pointer text-gray-400" />
      {isOpenTooltip && <Tooltip />}
    </div>
  );
}

export default FormTooltip;
