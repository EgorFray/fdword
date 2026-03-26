import Button from "./Button";

function DashboardHeading({ formRef }) {
  function handleClick() {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-3xl font-bold">
        Transform your word file into <br /> well-formated document
      </p>
      <p className="text-xl font-medium text-blue-950/80">
        Just add your document, choose what <br />
        to format and get the result
      </p>
      <Button onClick={handleClick}>Format document</Button>
    </div>
  );
}

export default DashboardHeading;
