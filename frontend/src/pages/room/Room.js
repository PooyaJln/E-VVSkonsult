import { Outlet, useLoaderData, useOutletContext } from "react-router-dom";
import RoomNavBar from "../../layouts/RoomNavBar";

function Room() {
  return (
    <>
      <h2>Room: </h2>
      <RoomNavBar />
      <Outlet />
    </>
  );
}

export default Room;
