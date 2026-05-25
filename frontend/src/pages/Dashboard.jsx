import PageLayout from "../ui/PageLayout";
import CustomMetadata from "../ui/CustomMetadata";
import Templates from "../ui/Templates";
import Presentation from "../ui/Presentation";
import { useRef, useState } from "react";
import Modifier from "../ui/Modifier";
import { templates } from "../services/templatesData";

function Dashboard() {
  const [selectedParagraphs, setSelectedParagraphs] = useState(
    templates.slice(0, 1),
  );
  const [isSelected, setIsSelected] = useState(1);
  const templatesRef = useRef(null);

  function handleClick() {
    templatesRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }

  function handleSelectParagraphs(headingCount) {
    setSelectedParagraphs(templates.slice(0, headingCount));
    setIsSelected(headingCount);
  }

  return (
    <PageLayout>
      <CustomMetadata
        title="Dashboard"
        description="Format your Word document exactly the way you need - control fonts, spacing, margins, and layout in seconds."
      />
      <Presentation onClick={handleClick} />
      <Templates
        templatesRef={templatesRef}
        handleSelectParagraphs={handleSelectParagraphs}
        isSelected={isSelected}
      />
      <Modifier selectedParagraphs={selectedParagraphs} />
    </PageLayout>
  );
}

export default Dashboard;
