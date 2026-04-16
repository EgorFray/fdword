import { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BsChevronDown, BsChevronDoubleDown } from "react-icons/bs";

function Dropdown({ title, children }) {
  const [height, setHeight] = useState(0);
  const [isDropOpen, setIsDropOpen] = useState(false);
  const rowRef = useRef(null);

  useLayoutEffect(() => {
    if (!isDropOpen || !rowRef.current) return;
    const element = rowRef.current;
    const updateHeight = () => {
      setHeight(element.scrollHeight);
    };
    updateHeight();

    const observer = new ResizeObserver(() => {
      updateHeight();
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [isDropOpen, children]);

  function scrollDropdownIntoView(element) {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const topOffset = 10;
    const bottomOffset = 10;

    const viewportTop = topOffset;
    const viewportBottom = window.innerHeight - bottomOffset;

    if (rect.top < viewportTop) {
      window.scrollBy({
        top: rect.top - viewportTop,
        behavior: "smooth",
      });
      return;
    }

    if (rect.bottom > viewportBottom) {
      window.scrollBy({
        top: rect.bottom - viewportBottom,
        behavior: "smooth",
      });
    }
  }

  return (
    <>
      <div className="mb-2 rounded-xl bg-blue-200 p-3 text-xl font-semibold md:p-4 md:text-2xl">
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
              animate={{ opacity: 1, height }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                height: { duration: 0.25 },
                opacity: { delay: 0.1, duration: 0.3 },
              }}
              style={{ overflow: "hidden" }}
              onAnimationComplete={() => {
                if (isDropOpen || rowRef.current) {
                  scrollDropdownIntoView(rowRef.current);
                }
              }}
            >
              <div ref={rowRef} className="p-1">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      }
    </>
  );
}

export default Dropdown;
