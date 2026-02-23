function ManualSection({ argName, imageA, imageB, children, reverse = false }) {
  return (
    <>
      <h2>{argName}</h2>
      <section className="grid grid-cols-[300px_1fr] grid-rows-2 gap-6">
        {/* Image 1 (before) */}
        <div className={`col-start-1 row-start-1 ${reverse ? "order-2" : ""}`}>
          <img
            src={imageA}
            alt={`Example of ${argName} before changes`}
            className="w-full"
          />
        </div>
        {/* Image 2 (after) */}
        <div className={`col-start-1 row-start-2 ${reverse ? "order-2" : ""}`}>
          <img
            src={imageB}
            alt={`Example of ${argName} before changes`}
            className="w-full"
          />
        </div>
        {/* Description */}
        <div className={`col-start-2 row-span-2 ${reverse ? "order-1" : ""}`}>
          {children}
        </div>
      </section>
    </>
  );
}

export default ManualSection;
