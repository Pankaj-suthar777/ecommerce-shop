import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keywords" content={{ keywords }}></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to ProShipShop",
  description: "We sell the best products",
  keywords: "on sale",
};
export default Meta;
