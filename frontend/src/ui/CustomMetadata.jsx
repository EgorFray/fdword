import { Helmet } from "react-helmet-async";

function CustomMetadata({ title, description }) {
  return (
    <Helmet titleTemplate="%s | Docxfixer" defaultTitle="Docxfixer">
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}

export default CustomMetadata;
