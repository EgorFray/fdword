import Button from "./Button";

function Heading() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-3xl font-bold">
        Transform your document into <br /> well-formated document
      </p>
      <p className="text-xl font-medium text-blue-950/80">
        Just add your document, choose what <br />
        to format and get the result
      </p>
      <Button>Format document</Button>
    </div>
  );
}

export default Heading;
