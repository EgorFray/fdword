function Tooltip({ ref, style, video, poster, tooltip }) {
  return (
    <div
      ref={ref}
      style={style}
      className="flex max-h-60 max-w-50 flex-col gap-1 overflow-hidden rounded-xl bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <video
        poster={poster}
        preload="metadata"
        autoPlay
        loop
        muted
        playsInline
        className="shadow-[0_1px_0_0_rgba(30,58,138)]"
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="p-1 text-left text-sm">{tooltip}</div>
    </div>
  );
}

export default Tooltip;
