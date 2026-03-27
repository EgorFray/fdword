import { useRef } from "react";
import Comparator from "../ui/Comparator";
import ModifyForm from "../ui/ModifyForm";
import PageLayout from "../ui/PageLayout";
import Heading from "../ui/Heading";
import MainHeading from "../ui/MainHeading";
import SubHeading from "../ui/SubHeading";
import Button from "../ui/Button";

function Dashboard() {
  const formRef = useRef(null);

  function handleClick() {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <PageLayout>
      <Heading>
        <MainHeading>
          Transform your word file into <br /> well-formated document
        </MainHeading>
        <SubHeading>
          Just add your document, choose what <br />
          to format and get the result
        </SubHeading>
        <Button onClick={handleClick}>Format document</Button>
      </Heading>
      <Comparator />
      <ModifyForm formRef={formRef} />
    </PageLayout>
  );
}

export default Dashboard;
