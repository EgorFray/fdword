function ManualSection({ argName, image, children }) {
  return (
    <section className="mx-4 mt-4 mb-6 grid grid-cols-[400px_1fr] gap-x-6">
      {/* Image 1 (before) */}
      <div className="col-start-1 row-start-1">
        <img
          src={image}
          alt={`Example of ${argName} before changes`}
          className="w-full rounded-xl"
        />
      </div>

      {/* Description */}
      <div className="col-start-2 row-span-2 text-start text-lg font-medium text-blue-950/80">
        {children}
      </div>
    </section>
  );
}

export default ManualSection;
