import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BsChevronDown, BsChevronDoubleDown } from "react-icons/bs";

function FormDropdown({ title, children }) {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const rowRef = useRef(null);

  useEffect(() => {
    if (isDropOpen && rowRef.current) {
      setTimeout(() => {
        rowRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [isDropOpen]);

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
          {isDropOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{
                height: { duration: 0.25 },
                opacity: { delay: 0.2, duration: 0.25 },
              }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: "hidden" }}
              ref={rowRef}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      }
    </>
  );
}

export default FormDropdown;
