import Comparator from "../ui/Comparator";
import Heading from "../ui/Heading";
import ModifyForm from "../ui/ModifyForm";

function Dashboard() {
  return (
    <div className="flex flex-col gap-7 p-4 text-center">
      <Heading />
      <Comparator />
      <ModifyForm />
    </div>
  );
}

export default Dashboard;
