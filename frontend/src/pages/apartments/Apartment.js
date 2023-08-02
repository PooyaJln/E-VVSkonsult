import {
  Outlet,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import ApartmentNavBar from "../../layouts/ApartmentNavBar";
import { useApartmentsContext } from "../../hooks/useApartmentsContext";
import { useEffect } from "react";

function Apartment() {
  const apartment_id = useParams().apartment_id;

  const { state, apiCalls } = useApartmentsContext();
  const apartment = state?.item || {};
  useEffect(() => {
    apiCalls.getItem(apartment_id);
  }, [apartment_id]);
  return (
    <>
      <h2>Apartment: {apartment?.apartment_name}</h2>
      <ApartmentNavBar />
      <Outlet />
    </>
  );
}

export default Apartment;
