import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  console.log(location);
  let currentLink = "";
  const pathParts = location.pathname
    .split("/")
    .filter((part) => part !== "")
    .map((part) => {
      currentLink += `/${part}`;
      return (
        <div className="crumb" key={part}>
          <Link to={currentLink}>{part}</Link>
        </div>
      );
    });

  return <div className="breadcrumbs">{pathParts}</div>;
};

export default Breadcrumbs;
