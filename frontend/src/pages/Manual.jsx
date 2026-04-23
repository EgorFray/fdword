import CustomMetadata from "../ui/CustomMetadata";
import Heading from "../ui/Heading";
import MainHeading from "../ui/MainHeading";
import ManualInfoSection from "../ui/ManualInfoSection";
import PageLayout from "../ui/PageLayout";
import SubHeading from "../ui/SubHeading";

function Manual() {
  return (
    <PageLayout>
      <CustomMetadata
        title="Manual"
        description="Understand every formatting option — see how each setting affects your Word document."
      />
      <Heading>
        <MainHeading>Everything about formatting</MainHeading>
        <SubHeading>
          Explore each option and see <br />
          how it affects your document
        </SubHeading>
      </Heading>

      <ManualInfoSection />
    </PageLayout>
  );
}

export default Manual;
