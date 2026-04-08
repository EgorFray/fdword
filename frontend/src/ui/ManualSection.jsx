function ManualSection({ argName, image, children }) {
  return (
    <section className="mx-4 mt-2 mb-2 flex flex-col gap-3 md:mt-4 md:mb-6 md:grid md:grid-cols-[400px_1fr] md:gap-x-6">
      <div className="flex items-center justify-center">
        <img
          src={image}
          alt={`Example of ${argName} before changes`}
          className="w-4/6 rounded-xl md:w-full"
        />
      </div>

      <div className="ml-1 text-start text-base font-medium text-blue-950/80 md:ml-0 md:text-lg">
        {children}
      </div>
    </section>
  );
}

export default ManualSection;
