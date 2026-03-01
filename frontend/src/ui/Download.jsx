import Button from "./Button";

function Download(onClick) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-semibold text-blue-950">
        Here is your updated file
      </p>
      <Button onClick={onClick}>Download</Button>
    </div>
  );
}

export default Download;
