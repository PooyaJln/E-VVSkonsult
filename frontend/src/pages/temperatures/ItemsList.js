import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateTemperature from "./CreateTemperature";
import TemperaturesTableRow from "./TemperaturesTableRow";
import ErrorDialog from "../../components/ErrorDialog";
import { useTemperaturesContext } from "../../hooks/useTemperaturesContext";

const ItemsList = () => {
  const { state, apiCalls, uiCalls } = useTemperaturesContext();
  const project_id = useParams().project_id;
  let temperatures = state?.items || [];
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
    apiCalls.getItems(project_id);
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
          <span>add a temperature</span>
        </div>
        <table className="materials-table">
          <tbody>
            <tr className="materials-table-headers-row" key={1}>
              <th className="materials-table-cell"> Name</th>
              <th className="materials-table-cell">
                Value [<span>&#176;</span>C]
              </th>
            </tr>
            {toggle && createToggle && (
              <CreateTemperature setParentToggle={setParentToggle} />
            )}
            {/* ) : null} */}
            {temperatures &&
              temperatures.map((temperature, index) => (
                <TemperaturesTableRow
                  key={index + 2}
                  temperature={temperature}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemsList;
