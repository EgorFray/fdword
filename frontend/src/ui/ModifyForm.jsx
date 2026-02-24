import Button from "./Button";
import ButtonEmpty from "./ButtonEmpty";

function ModifyForm() {
  return (
    <div className="flex justify-center">
      <form className="max-w-160 items-start justify-items-start rounded-xl border border-blue-950/40 p-6">
        <h2 className="mb-6 ml-4 text-2xl font-bold">Select what to change</h2>

        <div className="mb-6 grid grid-cols-[200px_1fr_1fr] items-center justify-items-start">
          <label
            htmlFor="lineSpace"
            className="ml-4 text-lg font-semibold text-blue-950/80"
          >
            Line spacing
          </label>
          <input
            id="lineSpace"
            type="text"
            placeholder="For example 1 or 1.15"
            className="rounded-lg bg-white p-1 pl-2"
          />
        </div>

        <div className="mb-6 grid grid-cols-[200px_1fr_1fr] items-center justify-items-start">
          <label
            htmlFor="file"
            className="ml-4 text-lg font-semibold text-blue-950/80"
          >
            File
          </label>
          <input
            type="file"
            id="file"
            className="file:cursor-pointer file:self-center file:rounded-full file:bg-blue-600 file:px-4 file:py-2 file:tracking-wide file:text-blue-50 file:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] file:transition-colors file:duration-300"
          />
        </div>

        <div className="mr-4 flex w-full justify-end gap-2">
          <ButtonEmpty>Cancel</ButtonEmpty>
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default ModifyForm;
