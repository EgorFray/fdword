import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

      {
        <AnimatePresence>
          isDropOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={
              isDropOpen
                ? { opacity: 1, height: "auto" }
                : { opacity: 0, height: 0 }
            }
            transition={
              isDropOpen
                ? {
                    height: { duration: 0.25 },
                    opacity: { delay: 0.2, duration: 0.25 },
                  }
                : {
                    height: { delay: 0.25, duration: 0.25 },
                    opacity: { duration: 0.25 },
                  }
            }
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
          )
        </AnimatePresence>
      }
    </>
  );
}

export default FormDropdown;
