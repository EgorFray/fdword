function ManualSection({ argName, imageA, children, reverse = false }) {
  return (
    <section className="mx-4 mt-4 mb-6 grid grid-cols-[350px_1fr] gap-x-6">
      {/* Image 1 (before) */}
      <div
        className={`col-start-1 row-start-1 border-b border-blue-950/50 ${reverse ? "order-2" : ""}`}
      >
        <img
          src={imageA}
          alt={`Example of ${argName} before changes`}
          className="w-full"
        />
      </div>

      {/* Description */}
      <div
        className={`col-start-2 row-span-2 text-lg font-medium text-blue-950/80 ${reverse ? "order-1" : ""}`}
      >
        {children}
      </div>
    </section>
  );
}

export default ManualSection;
