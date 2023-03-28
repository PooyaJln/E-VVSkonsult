import { useOutletContext } from "react-router-dom";
import ItemsList from "./ItemsList";

const Floors = (props) => {
  const building = useOutletContext();

  return <ItemsList context={building} />;
};

export default Floors;
