import Heading from "./Heading";
import MainHeading from "./MainHeading";
import ModifyForm from "./ModifyForm";
import SubHeading from "./SubHeading";

function Modifier() {
  return (
    <section className="flex flex-col items-center gap-4 md:gap-7">
      <div className="flex flex-col items-center gap-3 md:gap-4">
        <Heading>
          <MainHeading>
            Step 2 <br />
            Choose what to update
          </MainHeading>
          <SubHeading>
            Only fill in the fields you want to change. <br /> Leave the rest
            empty
          </SubHeading>
        </Heading>
      </div>

      <ModifyForm />
    </section>
  );
}

export default Modifier;
