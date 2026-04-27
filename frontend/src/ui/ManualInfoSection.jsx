import Dropdown from "./Dropdown";
import DropdownsLayout from "./DropdownsLayout";
import ManualSection from "./ManualSection";
import ManualSectionHeading from "./ManualSectionHeading";
import { manualSectionData } from "../services/manualSectionData";
import { preload } from "react-dom";
import { Fragment } from "react";

function ManualInfoSection() {
  manualSectionData.forEach((section) =>
    section.items.forEach((data) => preload(data.lazyImg, { as: "image" })),
  );

  return manualSectionData.map((section) => (
    <Fragment key={section.groupTitle}>
      <ManualSectionHeading>{section.groupTitle}</ManualSectionHeading>
      <DropdownsLayout>
        {section.items.map((data) => (
          <Dropdown title={data.title} key={data.argName}>
            <ManualSection
              argName={data.argName}
              image={data.image}
              lazyImg={data.lazyImg}
              ratio={data.ratio}
            >
              {data.description}
            </ManualSection>
          </Dropdown>
        ))}
      </DropdownsLayout>
    </Fragment>
  ));
}

export default ManualInfoSection;
