import { useState } from "react";
import Comparator from "../ui/Comparator";
import Heading from "../ui/Heading";
import ModifyForm from "../ui/ModifyForm";

function Dashboard() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="flex flex-col gap-7 p-4 text-center">
      <Heading setOpenForm={setOpenForm} />
      <Comparator />
      <ModifyForm openForm={openForm} />
    </div>
  );
}

export default Dashboard;
