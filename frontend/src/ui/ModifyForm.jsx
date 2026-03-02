import Button from "./Button";
import ButtonEmpty from "./ButtonEmpty";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { modifyDoc } from "../services/apiModify";
import toast from "react-hot-toast";
import Download from "./Download";
import FormContainer from "../features/modifyForm/FormContainer";
import Form from "../features/modifyForm/Form";
import FormHeading from "../features/modifyForm/FormHeading";
import FormRow from "../features/modifyForm/FormRow";

function ModifyForm() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const {
    mutate,
    data: fileBlob,
    isLoading: isModifying,
  } = useMutation({
    mutationFn: modifyDoc,
    onSuccess: () => {
      toast.success("Formatted document successfully created");
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

  function onError(errors) {
    console.log(errors);
  }

  function handleCreateLink() {
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
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormHeading>Select what to change</FormHeading>

        <FormRow label="Line spacing" error={errors?.lineSpacing?.message}>
          <input
            id="lineSpacing"
            type="number"
            step={0.01}
            className="rounded-lg bg-white p-1 pl-2"
            placeholder="For example 1 or 1.15"
            {...register("lineSpacing", {
              min: {
                value: 0.5,
                message: "Line space should be at least 0.5 or higher",
              },
              max: {
                value: 5,
                message: "Line space should be less than 5",
              },
            })}
          />
        </FormRow>

        <FormRow label="File" error={errors?.file?.message}>
          <input
            type="file"
            id="file"
            className="file:cursor-pointer file:self-center file:rounded-full file:bg-blue-600 file:px-4 file:py-2 file:tracking-wide file:text-blue-50 file:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] file:transition-colors file:duration-300"
            {...register("file", {
              validate: (value) => {
                const file = value[0];
                return (
                  (file &&
                    [
                      "application/msword",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    ].includes(file.type)) ||
                  "Please provide only doc or docx document"
                );
              },
            })}
          />
        </FormRow>

        <div className="mr-4 flex w-full justify-end gap-2">
          <ButtonEmpty type="reset" onClick={() => reset()}>
            Cancel
          </ButtonEmpty>
          <Button disabled={isModifying}>Submit</Button>
        </div>
      </Form>

      {fileBlob && <Download onClick={handleCreateLink} />}
    </FormContainer>
  );
}

export default ModifyForm;
