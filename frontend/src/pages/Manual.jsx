import Dropdown from "../ui/Dropdown";
import DropdownsLayout from "../ui/DropdownsLayout";
import ManualHeading from "../ui/ManualHeading";
import ManualSection from "../ui/ManualSection";
import ManualSectionHeading from "../ui/ManualSectionHeading";
import PageLayout from "../ui/PageLayout";

function Manual() {
  return (
    <PageLayout>
      <ManualHeading />

      <ManualSectionHeading />
      <DropdownsLayout>
        <Dropdown title="Line spacing">
          <ManualSection
            imageA="/line-space--1.5.png"
            imageB="/line-space--1.png"
          >
            As you can guess this parameter controls the line spacing of a
            paragraph. In formal documents, values such as 1 or 1.15 are
            commonly used, but you can choose any spacing that best suits your
            needs.
          </ManualSection>
        </Dropdown>

        <Dropdown title="Font type">
          <ManualSection reverse="true">Some text for testing</ManualSection>
        </Dropdown>
      </DropdownsLayout>
    </PageLayout>
  );
}

export default Manual;
