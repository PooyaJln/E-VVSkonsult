import { useOutletContext } from "react-router-dom";
import ItemsList from "./ItemsList";

const Buildings = () => {
  const project = useOutletContext();
  return <ItemsList project={project} />;
};

export default Buildings;
