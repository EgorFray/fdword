import { useEffect, useRef, useState } from "react";
import Comparator from "../ui/Comparator";
import Heading from "../ui/Heading";
import ModifyForm from "../ui/ModifyForm";
import PageLayout from "../ui/PageLayout";

function Dashboard() {
  const [openForm, setOpenForm] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (openForm && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [openForm]);

  return (
    <PageLayout>
      <Heading setOpenForm={setOpenForm} formRef={formRef} />
      <Comparator />
      <ModifyForm formRef={formRef} openForm={openForm} />
    </PageLayout>
  );
}

export default Dashboard;
