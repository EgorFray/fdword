import Button from "./Button";
import ButtonEmpty from "./ButtonEmpty";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { modifyDoc } from "../services/apiModify";
import toast from "react-hot-toast";

function ModifyForm() {
  const { register, handleSubmit, reset } = useForm();

  const {
    mutate,
    data: fileBlob,
    isLoading: isModifying,
  } = useMutation({
    mutationFn: modifyDoc,
    onSuccess: (data) => {
      toast.success("Formatted document successfully created");
      console.log("BLOB:", data);
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const obj = {};
    obj.lineSpacing = parseFloat(data.lineSpacing);

    const formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    formData.append("file", data.file[0]);

    mutate(formData);
  }

  function handleCreateLink() {
    console.log(fileBlob);
    const url = URL.createObjectURL(fileBlob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "formatted.docx";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex justify-center">
      <form
        className="max-w-160 items-start justify-items-start rounded-xl border border-blue-950/40 p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-6 ml-4 text-2xl font-bold">Select what to change</h2>

        <div className="mb-6 grid grid-cols-[200px_1fr_1fr] items-center justify-items-start">
          <label
            htmlFor="lineSpacing"
            className="ml-4 text-lg font-semibold text-blue-950/80"
          >
            Line spacing
          </label>
          <input
            id="lineSpacing"
            type="number"
            step={0.01}
            placeholder="For example 1 or 1.15"
            className="rounded-lg bg-white p-1 pl-2"
            {...register("lineSpacing")}
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
            {...register("file")}
          />
        </div>

        <div className="mr-4 flex w-full justify-end gap-2">
          <ButtonEmpty type="reset" onClick={() => reset()}>
            Cancel
          </ButtonEmpty>
          <Button disabled={isModifying}>Submit</Button>
        </div>
      </form>

      {fileBlob && <Button onClick={handleCreateLink}>Download</Button>}
    </div>
  );
}

export default ModifyForm;
