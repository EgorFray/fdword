import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

function Comparator() {
  const [showDivider, setShowDivider] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      for (let i = 0; i < 1; i++) {
        await controls.start({
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          transition: { duration: 1.5, ease: "easeInOut" },
        });

        await controls.start({
          clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)",
          transition: { duration: 1.5, ease: "easeInOut" },
        });
      }

      await controls.start({
        clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
        transition: { duration: 0.8 },
      });

      setShowDivider(true);
    };

    sequence();
  }, []);

  return (
    <div className="relative m-auto w-full max-w-md overflow-hidden">
      {/* AFTER */}
      <img src="/after.png" alt="Document after formating" className="w-full" />

      {/* BEFORE */}
      <motion.img
        src="/before.png"
        alt="Document before formating"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        animate={controls}
      />

      {showDivider && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="absolute top-0 bottom-0 w-px bg-blue-950"
          style={{ left: "50%" }}
        />
      )}
    </div>
  );
}

export default Comparator;
