import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Comparator() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoDone, setIsAutoDone] = useState(false);

  const [isBeforeLoad, setIsBeforeLoad] = useState(false);
  const [isAfterLoad, setIsAfterLoad] = useState(false);

  const isImagesLoaded = isBeforeLoad && isAfterLoad;

  useEffect(() => {
    if (!isImagesLoaded) return;

    const flipToAfter = setTimeout(() => setIsFlipped(true), 600);
    const flipBackToBefore = setTimeout(() => {
      setIsFlipped(false);
      setIsAutoDone(true);
    }, 1800);
    return () => {
      clearTimeout(flipToAfter);
      clearTimeout(flipBackToBefore);
    };
  }, [isImagesLoaded]);

  function handleFlip() {
    if (!isAutoDone) return;
    setIsFlipped((prev) => !prev);
  }

  return (
    <div
      className="relative m-auto w-80 max-w-md cursor-pointer md:w-full"
      style={{ perspective: "1200px" }}
      onClick={handleFlip}
    >
      <motion.div
        className="relative flex aspect-3/4 w-full rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        whileTap={isAutoDone ? { scale: 0.98 } : undefined}
      >
        {/* BEFORE */}
        <img
          src="/before.png"
          alt="Document before formatting"
          onLoad={() => setIsBeforeLoad(true)}
          className="absolute inset-0 h-full w-full rounded-xl object-cover"
          style={{
            backfaceVisibility: "hidden",
          }}
        />

        {/* AFTER */}
        <img
          src="/after.png"
          alt="Document after formatting"
          onLoad={() => setIsAfterLoad(true)}
          className="absolute inset-0 h-full w-full rounded-xl object-cover"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        />
      </motion.div>
    </div>
  );
}

export default Comparator;
