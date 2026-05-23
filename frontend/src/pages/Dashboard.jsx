import PageLayout from "../ui/PageLayout";
import CustomMetadata from "../ui/CustomMetadata";
import Templates from "../ui/Templates";
import Presentation from "../ui/Presentation";
import { useRef } from "react";
import Modifier from "../ui/Modifier";

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
      <Modifier />
    </PageLayout>
  );
}

export default Dashboard;
