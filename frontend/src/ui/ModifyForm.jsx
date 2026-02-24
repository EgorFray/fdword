function ModifyForm() {
  return (
    <form className="max-w-160 border border-blue-950">
      <h2>Select what to change</h2>

      <div>
        <label>Line spacing</label>
        <input type="text" />
      </div>

      <div>
        <label>File</label>
        <input type="file" />
      </div>
    </form>
  );
}

export default ModifyForm;
