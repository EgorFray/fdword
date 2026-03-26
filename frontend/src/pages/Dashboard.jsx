import { useRef } from "react";
import Comparator from "../ui/Comparator";
import DashboardHeading from "../ui/DashboardHeading";
import ModifyForm from "../ui/ModifyForm";
import PageLayout from "../ui/PageLayout";

function Dashboard() {
  const formRef = useRef(null);

  return (
    <PageLayout>
      <DashboardHeading formRef={formRef} />
      <Comparator />
      <ModifyForm formRef={formRef} />
    </PageLayout>
  );
}

export default Dashboard;
