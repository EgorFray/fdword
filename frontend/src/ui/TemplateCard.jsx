function TemplateCard({headingCount}) {
  return <div>
    {for(let i = 1; i <= headingCount; i++) {
      <p>Heading ${i}</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    }}
  </div>;
}

export default TemplateCard;
