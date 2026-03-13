function Tooltip({ ref, style, video, tooltip }) {
  return (
    <div
      ref={ref}
      style={style}
      className="flex max-h-60 max-w-50 flex-col gap-1 overflow-hidden rounded-xl bg-red-400"
    >
      <video autoPlay loop muted playsInline>
        <source src={video} type="video/mp4" />
      </video>
      <div className="p-1 text-left text-sm">{tooltip}</div>
    </div>
  );
}

export default Tooltip;
