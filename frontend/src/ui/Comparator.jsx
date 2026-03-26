function Comparator() {
  return (
    <div className="grid grid-cols-2 rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
      <img
        src="/before.png"
        className="rounded-tl-xl rounded-bl-xl border-r border-blue-950/20"
      />
      <img src="/after.png" className="rounded-tr-xl rounded-br-xl" />
    </div>
  );
}

export default Comparator;
