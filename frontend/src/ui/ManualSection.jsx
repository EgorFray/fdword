import { useState } from "react";

function ManualSection({ argName, image, lazyImg, ratio, children }) {
  const [isLoadedImage, setIsLoadedImage] = useState(false);

  return (
    <section className="mx-4 mt-2 flex flex-col gap-3 md:mt-4 md:mb-6 md:grid md:grid-cols-[400px_1fr] md:gap-x-6">
      <div
        className="relative flex w-4/6 items-center justify-center overflow-hidden rounded-xl md:w-full"
        style={{ aspectRatio: ratio }}
      >
        {!isLoadedImage && (
          <img
            src={lazyImg}
            alt={`Blured image of ${image.replace(/^\/|\.png$/g, "")}`}
            className="absolute inset-0 h-full w-full object-cover blur-md"
          />
        )}
        <img
          src={image}
          alt={`Example of ${argName} before changes`}
          className="absolute inset-0 h-full w-full object-cover"
          onLoad={() => setIsLoadedImage(true)}
        />
      </div>

      <div className="ml-1 text-start text-base font-medium text-blue-950/80 md:ml-0 md:text-lg">
        {children}
      </div>
    </section>
  );
}

export default ManualSection;
