import { useState } from "react";
import { motion } from "motion/react";
import { BsChevronDown, BsChevronDoubleDown } from "react-icons/bs";

function FormDropdown({ title, children }) {
  const [isDropOpen, setIsDropOpen] = useState(false);

  return (
    <>
      <div className="mb-2 w-full rounded-xl bg-blue-200 px-4 py-4 text-2xl font-semibold">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsDropOpen((isOpen) => !isOpen)}
        >
          <span className="flex items-start">{title}</span>
          {isDropOpen ? (
            <BsChevronDoubleDown color="text-blue-950" />
          ) : (
            <BsChevronDown color="text-blue-950" />
          )}
        </div>
      </div>

      {isDropOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{
            height: { duration: 0.25 },
            opacity: { delay: 0.2, duration: 0.25 },
          }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}

export default FormDropdown;
