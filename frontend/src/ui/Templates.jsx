import { templates } from "../services/templatesData";
import MainHeading from "./MainHeading";
import SubHeading from "./SubHeading";
import TemplateCard from "./TemplateCard";

function Templates({ templatesRef }) {
  return (
    <section
      className="flex scroll-mt-16 flex-col items-center gap-4 md:gap-7"
      ref={templatesRef}
    >
      <div className="flex flex-col items-center gap-3 md:gap-4">
        <MainHeading>
          Step 1 <br /> Choose the template
        </MainHeading>
        <SubHeading>
          Select how many first paragraphs <br /> should have custom formatting
        </SubHeading>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-5">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            headingCount={template.headingCount}
          />
        ))}
      </div>
    </section>
  );
}

export default Templates;
