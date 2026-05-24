function TemplateCard({ headingCount, handleSelectParagraphs }) {
  return (
    <button
      onClick={() => handleSelectParagraphs(headingCount)}
      className="flex h-55 w-37.5 cursor-pointer flex-col rounded-xl bg-white p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:ring-2 hover:ring-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 md:h-60 md:w-53.5"
    >
      {Array.from({ length: headingCount }, (_, index) => (
        <p key={index} className="text-xs md:text-sm">
          Heading {index + 1}
        </p>
      ))}

      <p className="mt-auto text-justify indent-5 text-xs md:text-sm">
        Lorem ipsum dolor sit amet, consectetur adipi elit. Asperiores ad
        laudan, atque culpa amet minima eum
      </p>
    </button>
  );
}

export default TemplateCard;
