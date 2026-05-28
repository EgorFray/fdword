import PageLayout from "../ui/PageLayout";
import CustomMetadata from "../ui/CustomMetadata";
import Templates from "../ui/Templates";
import Presentation from "../ui/Presentation";
import { useRef, useState } from "react";
import Modifier from "../ui/Modifier";
import { templates } from "../services/templatesData";
import { useMutation } from "@tanstack/react-query";
import { modifyDoc } from "../services/apiModify";
import toast from "react-hot-toast";
import Download from "../ui/Download";

function Dashboard() {
  const [selectedParagraphs, setSelectedParagraphs] = useState(
    templates.slice(0, 1),
  );
  const [isSelected, setIsSelected] = useState(1);
  const templatesRef = useRef(null);

  const {
    mutate,
    data: fileBlob,
    isLoading: isModifying,
  } = useMutation({
    mutationFn: modifyDoc,
    onSuccess: () => {
      toast.success("Formatted document successfully created");
    },
    onError: (err) => toast.error(err.message),
  });

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
      <Modifier
        selectedParagraphs={selectedParagraphs}
        mutate={mutate}
        isModifying={isModifying}
      />
      {fileBlob && <Download fileBlob={fileBlob} />}
    </PageLayout>
  );
}

export default Dashboard;
