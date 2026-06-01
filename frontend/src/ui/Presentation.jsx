import Button from "./Button";
import Comparator from "./Comparator";
import Heading from "./Heading";
import MainHeading from "./MainHeading";
import SubHeading from "./SubHeading";

function Presentation({ onClick }) {
  return (
    <section className="flex flex-col gap-5">
      <Heading>
        <MainHeading>
          Transform your word file into <br /> well-formated document
        </MainHeading>
        <SubHeading>
          Just add your document, choose what <br />
          to format and get the result
        </SubHeading>
        <Button onClick={onClick}>Format document</Button>
      </Heading>
      <Comparator />
    </section>
  );
}

export default Presentation;
