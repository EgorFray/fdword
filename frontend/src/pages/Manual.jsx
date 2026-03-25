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

      <ManualSectionHeading>Font settings</ManualSectionHeading>
      <DropdownsLayout>
        <Dropdown title="Font size">
          <ManualSection argName="font size" image="/fontSize.png">
            As you can guess this parameter controls the line spacing of a
            paragraph. In formal documents, values such as 1 or 1.15 are
            commonly used, but you can choose any spacing that best suits your
            needs.
          </ManualSection>
        </Dropdown>

        <Dropdown title="Font type">
          <ManualSection argName="font type" image="/fontType.png">
            Some text for testing
          </ManualSection>
        </Dropdown>
      </DropdownsLayout>

      <ManualSectionHeading>Page settings</ManualSectionHeading>
      <DropdownsLayout>
        <Dropdown title="Line spacing">
          <ManualSection argName="line spacing" image="/lineSpacing.png">
            As you can guess this parameter controls the line spacing of a
            paragraph. In formal documents, values such as 1 or 1.15 are
            commonly used, but you can choose any spacing that best suits your
            needs.
          </ManualSection>
        </Dropdown>

        <Dropdown title="Margins">
          <ManualSection>Some text for testing</ManualSection>
        </Dropdown>

        <Dropdown title="First line indent">
          <ManualSection
            argName="first line indent"
            image="/firstLineIndent.png"
          >
            Some text for testing
          </ManualSection>
        </Dropdown>

        <Dropdown title="Justify content">
          <ManualSection argName="justify content" image="/justifyContent.png">
            Some text for testing
          </ManualSection>
        </Dropdown>
      </DropdownsLayout>
    </PageLayout>
  );
}

export default Manual;
