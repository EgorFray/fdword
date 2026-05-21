import ManualSectionHeading from "./ManualSectionHeading";

function Templates() {
  return (
    <section>
      <div>
        <ManualSectionHeading>
          01 Choose number of headings
        </ManualSectionHeading>
        <p>Select how many first paragraphs should have custom formatting </p>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-2"></div>
    </section>
  );
}

export default Templates;
