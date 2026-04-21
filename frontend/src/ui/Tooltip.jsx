import { useState } from "react";

function Tooltip({ ref, style, ratio, video, bluredPoster, tooltip }) {
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <div
      ref={ref}
      style={style}
      className="flex max-h-60 max-w-50 flex-col gap-1 overflow-hidden rounded-xl bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <div
        className="relative w-full overflow-hidden bg-gray-100"
        style={{ aspectRatio: ratio }}
      >
        {!isVideoReady && bluredPoster && (
          <img
            src={bluredPoster}
            alt=""
            className="absolute inset-0 h-full w-full scale-105 object-cover"
          />
        )}

        <video
          preload="metadata"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      <div className="p-1 text-left text-sm">{tooltip}</div>
    </div>
  );
}

export default Tooltip;
