import ItemsList from "./ItemsList";
import { useOutletContext } from "react-router-dom";

const Materials = () => {
  const project = useOutletContext();
  return <ItemsList project={project} />;
};

export default Materials;
