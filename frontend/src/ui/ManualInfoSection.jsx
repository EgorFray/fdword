import Dropdown from "./Dropdown";
import DropdownsLayout from "./DropdownsLayout";
import ManualSection from "./ManualSection";
import ManualSectionHeading from "./ManualSectionHeading";

function ManualInfoSection() {
  return (
    <>
      <ManualSectionHeading>Font settings</ManualSectionHeading>
      <DropdownsLayout>
        <Dropdown title="Font size">
          <ManualSection argName="font size" image="/fontSize.png">
            Specifies the font size in points. Allowed values range from 5 to
            72.
          </ManualSection>
        </Dropdown>

        <Dropdown title="Font type">
          <ManualSection argName="font type" image="/fontType.png">
            Specifies the font family used throughout the document. Available
            options include 9 widely used fonts: Times New Roman, Calibri,
            Arial, Georgia, Helvetica, Verdana, Tahoma, Century and Courier. If
            you omit setting the font type, the app will use your current
            document font.
          </ManualSection>
        </Dropdown>
      </DropdownsLayout>

      <ManualSectionHeading>Page settings</ManualSectionHeading>
      <DropdownsLayout>
        <Dropdown title="Line spacing">
          <ManualSection argName="line spacing" image="/lineSpacing.png">
            Sets the vertical space between the lines of text in your document
            by setting the line spacing.
          </ManualSection>
        </Dropdown>

        <Dropdown title="Margins">
          <ManualSection argName="margins" image="/margins.png">
            Margins in Word are the blank spaces around the edges of a document
            (top, bottom, left, and right) that separate text from the
            paper&apos;s edge. Each page automatically has a 2.54 sm margin.
          </ManualSection>
        </Dropdown>

        <Dropdown title="First line indent">
          <ManualSection
            argName="first line indent"
            image="/firstLineIndent.png"
          >
            Sets the first-line indent for all paragraphs in the document.
          </ManualSection>
        </Dropdown>

        <Dropdown title="Justify content">
          <ManualSection argName="justify content" image="/justifyContent.png">
            Sets the text alignment (left, center, right, or justified) for the
            whole document. Default is left.
          </ManualSection>
        </Dropdown>
      </DropdownsLayout>

      <ManualSectionHeading>First paragraph settings</ManualSectionHeading>
      <DropdownsLayout>
        <Dropdown title="Justify content">
          <ManualSection
            argName="heading justify content"
            image="/headingJustifyContent.png"
          >
            Sets the text alignment (left, center, right or justified) only for
            the first paragraph of the document. <br /> <strong>Tip: </strong>
            to perfectly center the first paragraph, set it&apos;s first-line
            indent to 0.
          </ManualSection>
        </Dropdown>

        <Dropdown title="First line indent">
          <ManualSection
            argName="heading first line indent"
            image="/headingFirstLineIndent.png"
          >
            Sets the first-line indent for the first paragraph only.
          </ManualSection>
        </Dropdown>

        <Dropdown title="Capitalize">
          <ManualSection
            argName="heading capitalize"
            image="/headingCapitalize.png"
          >
            Sets the first paragraph uppercase.
          </ManualSection>
        </Dropdown>

        <Dropdown title="Bold">
          <ManualSection argName="heading bold" image="/headingBold.png">
            Sets the first paragraph bold.
          </ManualSection>
        </Dropdown>
      </DropdownsLayout>
    </>
  );
}

export default ManualInfoSection;
