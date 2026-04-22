function Footer() {
  const curYear = new Date();
  return (
    <div className="my-4 flex items-center justify-center">
      Docxfixer {curYear.getFullYear()}. All rights reserved.
    </div>
  );
}

export default Footer;
