import Button from "./Button";
import ButtonEmpty from "./ButtonEmpty";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { modifyDoc } from "../services/apiModify";
import { toOptionalFloat, toOptionalBool } from "../services/helpers";
import toast from "react-hot-toast";
import Download from "./Download";
import FormContainer from "../features/modifyForm/FormContainer";
import Form from "../features/modifyForm/Form";
import FormRow from "../features/modifyForm/FormRow";
import Dropdown from "./Dropdown";
import FormInput from "../features/modifyForm/FormInput";
import Heading from "./Heading";
import MainHeading from "./MainHeading";
import SubHeading from "./SubHeading";
import DropdownsContainer from "./DropdownsContainer";

function ModifyForm({ formRef }) {
  const { register, handleSubmit, reset, formState } = useForm({
    shouldUnregister: true,
  });
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
    console.log("DATA:", data);
    const heading = {
      jc: data.headingjc || undefined,
      fLind: toOptionalFloat(data.headingfLind),
      caps: toOptionalBool(data.headingCaps),
      bold: toOptionalBool(data.headingBold),
    };

    const obj = {
      lineSpacing: toOptionalFloat(data.lineSpacing),
      fontSize: toOptionalFloat(data.fontSize),
      fontType: data.fontType || undefined,
      mTop: toOptionalFloat(data.mTop),
      mRgh: toOptionalFloat(data.mRgh),
      mBtm: toOptionalFloat(data.mBtm),
      mLft: toOptionalFloat(data.mLft),
      fLind: toOptionalFloat(data.fLind),
      jc: data.jc || undefined,

      heading,
    };

    if (
      heading.jc === undefined &&
      heading.fLind === undefined &&
      heading.caps === undefined &&
      heading.bold === undefined
    ) {
      delete obj.heading;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    formData.append("file", data.file[0]);

    console.log(Object.fromEntries(formData));

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
      <Form onSubmit={handleSubmit(onSubmit, onError)} formRef={formRef}>
        <Heading>
          <MainHeading>Choose what to update</MainHeading>
          <SubHeading>
            Only fill in the fields you want to change. <br /> Leave the rest
            empty
          </SubHeading>
        </Heading>

        <DropdownsContainer>
          <Dropdown title="Font settings">
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
              tooltip="Change the default font type for all text"
            >
              <select
                id="fontType"
                name="fontType"
                className="w-full rounded-lg bg-white p-1 pl-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
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
          </Dropdown>

          <Dropdown title="Page settings">
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
              label="Margin top"
              info={true}
              error={errors?.mTop?.message}
              video="/marginTop.mp4"
              tooltip="Change margin top in the entire document. Default value in word - 2.57"
            >
              <FormInput
                id="mTop"
                type="number"
                step={0.01}
                placeholder="From 0 to 7"
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

            <FormRow
              label="Margin right"
              info={true}
              error={errors?.mRgh?.message}
              video="/marginRight.mp4"
              tooltip="Change margin right in the entire document. Default value in word - 2.57"
            >
              <FormInput
                id="mRgh"
                type="number"
                step={0.01}
                placeholder="From 0 to 7"
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

            <FormRow
              label="Margin bottom"
              info={true}
              error={errors?.mBtm?.message}
              video="/marginBottom.mp4"
              tooltip="Change margin bottom in the entire document. Default value in word - 2.57"
            >
              <FormInput
                id="mBtm"
                type="number"
                step={0.01}
                placeholder="From 0 to 7"
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

            <FormRow
              label="Margin left"
              info={true}
              error={errors?.mLft?.message}
              video="/marginLeft.mp4"
              tooltip="Change margin left in the entire document. Default value in word - 2.57"
            >
              <FormInput
                id="mLft"
                type="number"
                step={0.01}
                placeholder="From 0 to 7"
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

            <FormRow
              label="First line indent"
              info={true}
              video="firstLineIndent.mp4"
              tooltip="Indent the first line of a paragraph"
              error={errors?.fLind?.message}
            >
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

            <FormRow
              label="Justify content"
              info={true}
              video="/justifyContent.mp4"
              tooltip="Justify text left, center, right or both"
            >
              <select
                id="jc"
                name="jc"
                className="w-full rounded-lg bg-white p-1 pl-2"
                placeholder="Choose an option"
                {...register("jc")}
              >
                <option value="">Choose an option</option>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="both">Both</option>
              </select>
            </FormRow>
          </Dropdown>

          <Dropdown title="First paragraph settings">
            <FormRow
              label="Justify content"
              info={true}
              error={errors?.headingjc?.message}
              video="/headingJustifyContent.mp4"
              tooltip="Justify first paragraph left, center, right or both"
            >
              <select
                id="headingjc"
                name="headingjc"
                className="w-full rounded-lg bg-white p-1 pl-2"
                placeholder="Choose an option"
                {...register("headingjc")}
              >
                <option value="">Choose an option</option>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="both">Both</option>
              </select>
            </FormRow>

            <FormRow
              label="First line indent"
              info={true}
              error={errors?.headingfLind?.message}
              video="/headingFirstLineIndent.mp4"
              tooltip="Indent the first line of the first paragraph"
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

            <FormRow
              label="Capitalize"
              info={true}
              video="/capitalize.mp4"
              tooltip="Set uppercase for the first paragraph"
            >
              <div className="w-47.25 text-start">
                <input
                  id="headingCaps"
                  name="headingCaps"
                  type="checkbox"
                  value="true"
                  {...register("headingCaps")}
                />
              </div>
            </FormRow>

            <FormRow
              label="Bold"
              info={true}
              video="/bold.mp4"
              tooltip="Set first paragraph bold"
            >
              <div className="w-47.25 text-start">
                <input
                  id="headingBold"
                  name="headingBold"
                  type="checkbox"
                  value="true"
                  {...register("headingBold")}
                />
              </div>
            </FormRow>
          </Dropdown>

          <FormRow error={errors?.file?.message}>
            <input
              type="file"
              id="file"
              className="rounded-md file:cursor-pointer file:self-center file:rounded-full file:bg-blue-600 file:px-4 file:py-2 file:tracking-wide file:text-blue-50 file:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] file:transition-colors file:duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 md:text-base"
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
        </DropdownsContainer>
      </Form>

      {fileBlob && <Download onClick={handleCreateLink} />}
    </FormContainer>
  );
}

export default ModifyForm;
