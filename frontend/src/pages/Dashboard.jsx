import Comparator from "../ui/Comparator";
import Heading from "../ui/Heading";

function Dashboard() {
  return (
    <div className="flex flex-col gap-7 p-4 text-center">
      <Heading />
      <Comparator />
    </div>
  );
}

export default Dashboard;
