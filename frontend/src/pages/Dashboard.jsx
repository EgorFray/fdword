import { useRef, useState } from "react";
import Comparator from "../ui/Comparator";
import ModifyForm from "../ui/ModifyForm";
import PageLayout from "../ui/PageLayout";
import Heading from "../ui/Heading";
import MainHeading from "../ui/MainHeading";
import SubHeading from "../ui/SubHeading";
import Button from "../ui/Button";
import CustomMetadata from "../ui/CustomMetadata";
import Templates from "../ui/Templates";
import { templates } from "../services/templatesData";
import Presentation from "../ui/Presentation";

function Dashboard() {
  // const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const formRef = useRef(null);

  function handleClick() {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <PageLayout>
      <CustomMetadata
        title="Dashboard"
        description="Format your Word document exactly the way you need - control fonts, spacing, margins, and layout in seconds."
      />
      <Presentation onClick={handleClick} />
      <Templates />
      <ModifyForm formRef={formRef} />
    </PageLayout>
  );
}

export default Dashboard;
