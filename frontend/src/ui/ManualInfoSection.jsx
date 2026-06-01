import Dropdown from "./Dropdown";
import DropdownsLayout from "./DropdownsLayout";
import ManualSection from "./ManualSection";
import ManualSectionHeading from "./ManualSectionHeading";
import { manualSectionData } from "../services/manualSectionData";
import { preload } from "react-dom";

function ManualInfoSection() {
  manualSectionData.forEach((section) =>
    section.items.forEach((data) => preload(data.lazyImg, { as: "image" })),
  );

  return manualSectionData.map((section) => (
    <section className="flex flex-col gap-4 md:gap-7" key={section.groupTitle}>
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
    </section>
  ));
}

export default ManualInfoSection;
