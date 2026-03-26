import Button from "./Button";
import Heading from "./Heading";
import MainHeading from "./MainHeading";
import SubHeading from "./SubHeading";

function DashboardHeading({ formRef }) {
  function handleClick() {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <Heading>
      <MainHeading>
        Transform your word file into <br /> well-formated document
      </MainHeading>
      <SubHeading>
        Just add your document, choose what <br />
        to format and get the result
      </SubHeading>
      <Button handleClick={handleClick}>Forrmat document</Button>
    </Heading>
  );
}

export default DashboardHeading;
