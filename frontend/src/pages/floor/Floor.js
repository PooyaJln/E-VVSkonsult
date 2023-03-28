import { Outlet, useLoaderData } from "react-router-dom";
import FloorNavBar from "../../layouts/FloorNavBar";

function Floor() {
  return (
    <>
      <h2>Floor: </h2>
      <FloorNavBar />
      <Outlet />
    </>
  );
}

export default Floor;
