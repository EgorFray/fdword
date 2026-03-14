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
import FormDropdown from "../features/modifyForm/FormDropdown";
import FormInput from "../features/modifyForm/FormInput";

function ModifyForm({ openForm, formRef }) {
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
    const obj = {
      lineSpacing: parseFloat(data.lineSpacing),
      fontSize: parseFloat(data.fontSize),
      fontType: data.fontType,
      mTop: parseFloat(data.mTop),
      mRgh: parseFloat(data.mRgh),
      mBtm: parseFloat(data.mBtm),
      mLft: parseFloat(data.mLft),
      fLind: parseFloat(data.fLind),
      jc: data.jc,

      heading: {
        jc: data.headingjc,
        fLind: data.headingfLind,
      },
    };

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
    openForm && (
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit, onError)} formRef={formRef}>
          <FormHeading>Select what to change</FormHeading>

          <FormDropdown title="Font settings">
            <FormRow
              label="Line spacing"
              info={true}
              error={errors?.lineSpacing?.message}
              video="/lineSpacing.mp4"
              tooltip="Change the line spacing in an entire document"
            >
              <FormInput
                id="lineSpacing"
                type="number"
                step={0.01}
                placeholder="From 0.5 to 5"
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

            <FormRow
              label="Font size"
              info={true}
              error={errors?.fontSize?.message}
              video="/fontSize.mp4"
              tooltip="Change the default font size for all text"
            >
              <FormInput
                id="fontSize"
                type="number"
                step={0.1}
                placeholder="From 5 to 72"
                {...register("fontSize", {
                  min: {
                    value: 5,
                    message: "Font size should be more than 5",
                  },
                  max: {
                    value: 72,
                    message: "Font size should be less than 72",
                  },
                })}
              />
            </FormRow>

            <FormRow
              label="Font type"
              info={true}
              video="/fontType.mp4"
              tooltip="Change the default font typp for all text"
            >
              <select
                id="fontType"
                name="fontType"
                className="w-47.25 rounded-lg bg-white p-1 pl-2"
                placeholder="Select font"
                {...register("fontType")}
              >
                <option value="">Select font</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Calibri">Calibri</option>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Verdana">Verdana</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Century">Century</option>
                <option value="Courier">Courier</option>
              </select>
            </FormRow>
          </FormDropdown>

          <FormDropdown title="Page settings">
            <FormRow label="Margin top" error={errors?.mTop?.message}>
              <FormInput
                id="mTop"
                type="number"
                step={0.01}
                defaultValue={2.54}
                {...register("mTop", {
                  min: {
                    value: 0,
                    message: "Margin top couldn't be less than 0",
                  },
                  max: {
                    value: 7,
                    message: "Margin top should be less than 7",
                  },
                })}
              />
            </FormRow>

            <FormRow label="Margin right" error={errors?.mRgh?.message}>
              <FormInput
                id="mRgh"
                type="number"
                step={0.01}
                defaultValue={2.54}
                {...register("mRgh", {
                  min: {
                    value: 0,
                    message: "Margin right couldn't be less than 0",
                  },
                  max: {
                    value: 7,
                    message: "Margin right should be less than 7",
                  },
                })}
              />
            </FormRow>

            <FormRow label="Margin bottom" error={errors?.mBtm?.message}>
              <FormInput
                id="mBtm"
                type="number"
                step={0.01}
                defaultValue={2.54}
                {...register("mBtm", {
                  min: {
                    value: 0,
                    message: "Margin bottom couldn't be less than 0",
                  },
                  max: {
                    value: 7,
                    message: "Margin bottom should be less than 7",
                  },
                })}
              />
            </FormRow>

            <FormRow label="Margin left" error={errors?.mLft?.message}>
              <FormInput
                id="mLft"
                type="number"
                step={0.01}
                defaultValue={2.54}
                {...register("mLft", {
                  min: {
                    value: 0,
                    message: "Margin left couldn't be less than 0",
                  },
                  max: {
                    value: 7,
                    message: "Margin left should be less than 7",
                  },
                })}
              />
            </FormRow>

            <FormRow label="First line indent" error={errors?.fLind?.message}>
              <FormInput
                id="fLind"
                type="number"
                step={0.01}
                placeholder="From 0 to 3"
                {...register("fLind", {
                  min: {
                    value: 0,
                    message: "Indent couldn't be less than 0",
                  },
                  max: {
                    value: 3,
                    message: "Indent should be less than 3",
                  },
                })}
              />
            </FormRow>

            <FormRow label="Justify content">
              <select
                id="jc"
                name="jc"
                className="w-47.25 rounded-lg bg-white p-1 pl-2"
                placeholder="Choose an option"
                {...register("jc")}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="both">Both</option>
              </select>
            </FormRow>
          </FormDropdown>

          <FormDropdown title="First paragraph settings">
            <FormRow label="Justify content" error={errors?.headingjc?.message}>
              <select
                id="headingjc"
                name="headingjc"
                className="w-47.25 rounded-lg bg-white p-1 pl-2"
                placeholder="Choose an option"
                {...register("headingjc")}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="both">Both</option>
              </select>
            </FormRow>

            <FormRow
              label="First line indent"
              error={errors?.headingfLind?.message}
            >
              <FormInput
                id="headingfLind"
                type="number"
                step={0.01}
                placeholder="From 0 to 3"
                {...register("headingfLind", {
                  min: {
                    value: 0,
                    message: "Indent couldn't be less than 0",
                  },
                  max: {
                    value: 3,
                    message: "Indent should be less than 3",
                  },
                })}
              />
            </FormRow>
          </FormDropdown>

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
    )
  );
}

export default ModifyForm;
