function TemplateCard({ headingCount }) {
  return (
    <div className="h-50 w-40 cursor-pointer rounded-xl bg-white md:h-60 md:w-50">
      <div className="mt-5">
        {Array.from({ length: headingCount }, (_, index) => (
          <p key={index}> Heading {index + 1}</p>
        ))}

        <p className="mt-5 p-4 text-left indent-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
}

export default TemplateCard;
