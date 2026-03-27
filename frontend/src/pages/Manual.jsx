import Heading from "../ui/Heading";
import MainHeading from "../ui/MainHeading";
import ManualInfoSection from "../ui/ManualInfoSection";
import PageLayout from "../ui/PageLayout";
import SubHeading from "../ui/SubHeading";

function Manual() {
  return (
    <PageLayout>
      <Heading>
        <MainHeading>
          All you need to know <br />
          about word properties and formating
        </MainHeading>
        <SubHeading>Some text just to check how it looks</SubHeading>
      </Heading>

      <ManualInfoSection />
    </PageLayout>
  );
}

export default Manual;
