import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Comparator() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoDone, setIsAutoDone] = useState(false);

  const [isBeforeLoad, setIsBeforeLoad] = useState(false);
  const [isAfterLoad, setIsAfterLoad] = useState(false);

  const isImagesLoaded = isBeforeLoad && isAfterLoad;

  const bluredPoster =
    "data:image/jpeg;base64,/9j/7gAhQWRvYmUAZIAAAAABAwAQAwIDBgAAAAAAAAAAAAAAAP/bAIQAICEhMyQzUTAwUUIvLy9CJxwcHBwnIhcXFxcXIhEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAEiMzM0JjQiGBgiFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8IAEQgAjABsAwEiAAIRAQMRAf/EAHcAAQEBAQEBAAAAAAAAAAAAAAABAgMEBgEBAAAAAAAAAAAAAAAAAAAAABAAAgMBAAICAwEAAAAAAAAAAAERAhIiECADEzBQIUARAQEAAgIDAQAAAAAAAAAAAAAxESEQIDBAATISAQAAAAAAAAAAAAAAAAAAAFD/2gAMAwEBAhEDEQAAAPoDkdXk6nZxHZyh2cR2cdmwJcFvGHdxHZwp2cKdnCnayjG8GJoRYS2ApJqm6DG+ZiBqQVKNTRKpsDG8nK2AAEqkUb1nQxvByoSgBKF3zHa42MbwZgWAAsFQdmNjG8HKqQpJoRYSh10DOhynYc+gAAAAf//aAAgBAgABBQD9/wD/2gAIAQMAAQUA/f8A/9oACAEBAAEFAPz/ACOFpmLRhmLDpYXx2PrsfXYxYrVr0Z/CUSiUSiUSiUSiV6Xg4OB4OI4IoRQ5ODNWJR5s4NGh2Hb+Sag0aJNC82k6Ojo7Fo7Ozs6Fr0upWUZTITFVIyjKFST6xfHAqR6Xg4RNDlHJwRUTrU+xH2IV0/SzaNWNMVmaZpmmaZpks1Yq214tJFiLEWIsRYixFhKwlYzcqmvN0mRUhGakVZFURUipFSrVTaE583aRNSUyamkSiULJKZKG6lHPm0k2JsN2JsTYm43YmxNhO0+bKUkyGQyGJMhmWQyGQyvm8HBFDg5IocHBFGcI4K1VfN3Bok0OwrSaNCsOwrelpIuRcqrf6P/aAAgBAgIGPwB//9oACAEDAgY/AH//2gAIAQEBBj8A9C/VVVVVVvfpb7Z6Y6TKIiIiIidNea4VVVVVVXpviIiJ4NfMoiIiIiI3zpVVVVVVW+dqzlVVVVeu0REREREa50iIiIiInS4VVVVVVVc875x4NczKI/KIiIzhOmud+x//2Q==";

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
        {!isImagesLoaded && (
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center blur-md"
            style={{ backgroundImage: `url(${bluredPoster})` }}
          />
        )}
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
