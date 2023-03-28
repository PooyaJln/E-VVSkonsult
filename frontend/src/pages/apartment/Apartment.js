import { Outlet, useLoaderData, useOutletContext } from "react-router-dom";
import ApartmentNavBar from "../../layouts/ApartmentNavBar";

function Apartment() {
  return (
    <>
      <h2>Apartment: </h2>
      <ApartmentNavBar />
      <Outlet />
    </>
  );
}

export default Apartment;
