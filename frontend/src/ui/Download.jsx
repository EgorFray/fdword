import Button from "./Button";
import Heading from "./Heading";
import MainHeading from "./MainHeading";
import SubHeading from "./SubHeading";

function Download({ fileBlob }) {
  function handleCreateLink() {
    const url = URL.createObjectURL(fileBlob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "formatted.docx";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <section className="flex flex-col items-center gap-4 md:gap-7">
      <div className="flex flex-col items-center gap-3 md:gap-4">
        <Heading>
          <MainHeading>
            Step 3 <br />
            Get your file
          </MainHeading>
          <SubHeading>Your formatted document is ready to download</SubHeading>
        </Heading>
      </div>
      <Button onClick={handleCreateLink}>Download</Button>
    </section>
  );
}

export default Download;
