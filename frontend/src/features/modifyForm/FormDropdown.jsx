import { BsChevronDown } from "react-icons/bs";

function FormDropdown({ title, isOpen, onClick, children }) {
  return (
    <div className="mb-2 w-full rounded-xl bg-blue-200 px-4 py-4 text-2xl font-semibold">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={onClick}
      >
        <span className="flex items-start">{title}</span>
        <BsChevronDown color="text-blue-950" />
      </div>
      {isOpen && children}
    </div>
  );
}

export default FormDropdown;
