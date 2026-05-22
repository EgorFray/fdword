import { templates } from "../services/templatesData";
import MainHeading from "./MainHeading";
import SubHeading from "./SubHeading";
import TemplateCard from "./TemplateCard";

function Templates() {
  return (
    <section className="flex flex-col items-center gap-4 p-6 md:gap-7">
      <div className="flex flex-col items-center gap-3 md:gap-4">
        <MainHeading>
          Step 1 <br /> Choose the template
        </MainHeading>
        <SubHeading>
          Select how many first paragraphs should have custom formatting{" "}
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
