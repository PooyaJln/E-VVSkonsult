import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApartmentsContext } from "../../hooks/useApartmentsContext";
import CreateApartment from "./CreateApartment";
import ApartmentsTableRow from "./ApartmentsTableRow";
import ErrorDialog from "../../components/ErrorDialog";

const ItemsList = () => {
  const { state, apiCalls, uiCalls } = useApartmentsContext();
  const storey_id = useParams().floor_id;
  let apartments = state?.items || [];
  let error = state?.error || undefined;
  let open = state?.open || false;
  const createToggle = state?.createToggle;
  const [toggle, setToggle] = useState(false);

  const setParentToggle = (value) => {
    setToggle(value);
  };
  const setParentError = (value) => {
    uiCalls.setError(value);
  };
  const setParentOpen = (value) => {
    uiCalls.setOpen(value);
  };
  const handleCreatePlusButtonClick = () => {
    setToggle(true);
    uiCalls.setCreateToggle(true);
  };

  useEffect(() => {
    apiCalls.getItems(storey_id);
  }, []);

  return (
    <>
      {error && (
        <ErrorDialog
          error={error}
          open={open}
          setParentOpen={setParentOpen}
          setParentToggle={setParentToggle}
        />
      )}

      <div className="items">
        <div>
          <button
            onClick={handleCreatePlusButtonClick}
            // onClick={() => setToggle(true)}
          >
            <span className="material-symbols-outlined">add</span>
          </button>
          <span>add a apartment</span>
        </div>
        <table className="items-table">
          <tbody>
            <tr className="items-table-headers" key={1}>
              <th>Apartment name</th>
              <th></th>
            </tr>
            {toggle && createToggle && (
              <CreateApartment setParentToggle={setParentToggle} />
            )}
            {/* ) : null} */}
            {apartments &&
              apartments.map((apartment, index) => (
                <ApartmentsTableRow key={index + 2} apartment={apartment} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemsList;
