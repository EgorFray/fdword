import ManualHeading from "../ui/ManualHeading";
import ManualSection from "../ui/ManualSection";

function Manual() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <ManualHeading />
      </div>

      <p className="mt-6 mb-4 text-xl font-medium text-blue-950/80">
        On this page you can find the names of the available attributes and see
        how each of them affects your document
      </p>

      <ManualSection
        argName="Line-spacing"
        imageA="/line-space--1.5.png"
        imageB="/line-space--1.png"
      >
        As you can guess this parameter controls the line spacing of a
        paragraph. In formal documents, values such as 1 or 1.15 are commonly
        used, but you can choose any spacing that best suits your needs.
      </ManualSection>
    </>
  );
}

export default Manual;
