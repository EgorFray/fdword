import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BsChevronDown, BsChevronDoubleDown } from "react-icons/bs";

function Dropdown({ title, children }) {
  const [height, setHeight] = useState(0);
  const [isDropOpen, setIsDropOpen] = useState(false);
  const rowRef = useRef(null);

  // I use timeout, because other solution with observers ar too complicated for me right now. I can come back later to solve it properly.
  useLayoutEffect(() => {
    if (rowRef.current) {
      setTimeout(() => setHeight(rowRef.current.scrollHeight), 100);
    }
  }, [isDropOpen]);

  // The same issue is with scrollIntoView. I can fix it later.
  useEffect(() => {
    if (isDropOpen && rowRef.current) {
      setTimeout(() => {
        rowRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 275);
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
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: height,
              }}
              transition={{
                height: { duration: 0.25 },
                opacity: { delay: 0.25, duration: 0.25 },
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

export default Dropdown;
