import { useEffect, useRef, useState } from "react";
import Comparator from "../ui/Comparator";
import Heading from "../ui/Heading";
import ModifyForm from "../ui/ModifyForm";

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
    <div className="flex flex-col gap-7 p-4 text-center">
      <Heading setOpenForm={setOpenForm} formRef={formRef} />
      <Comparator />
      <ModifyForm formRef={formRef} openForm={openForm} />
    </div>
  );
}

export default Dashboard;
