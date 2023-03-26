import { useOutletContext } from "react-router-dom";
import ItemsList from "./ItemsList";

const Floors = () => {
  const building = useOutletContext();
  return <ItemsList building={building} />;
};

export default Floors;
