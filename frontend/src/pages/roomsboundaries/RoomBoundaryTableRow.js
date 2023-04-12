import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRoomsContext } from "../../hooks/useRoomsContext";
import { useRoomBoundariesContext } from "../../hooks/useRoomBoundariesContext";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const RoomBoundaryTableRow = ({ roomBoundary }) => {
  const { state, apiCalls, uiCalls } = useRoomBoundariesContext();

  const [updateToggle, setUpdateToggle] = useState(false);
  const [checked, setChecked] = useState(false);

  const [itemName, setItemName] = useState(roomBoundary?.boundary_name || "");
  const [boundaryType, setBoundaryType] = useState(
    roomBoundary?.boundary_type || ""
  );
  const [hasOpenings, setHasOpenings] = useState(false);
  const [isBetween0n1, setIsBetween0n1] = useState(false);
  const [isBetween1n6, setIsBetween1n6] = useState(false);
  const [area, setArea] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [isGroundConnected, setIsGroundConnected] = useState(false);
  const [uValueId, setuValueId] = useState("");
  const [outTempId, setoutTempId] = useState("");
  const [boundaryParentIid, setBoundaryParentId] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      apiCalls.deleteItem(id);
    }
  };

  const handleUpdateIconClick = async (item) => {
    setUpdateToggle(!updateToggle);
    setItemName(item.boundary_name);
    console.log("Edit item", item.boundary_name);
  };

  const handleUpdateSave = async (e, item) => {
    e.preventDefault();
    const itemToUpdate = {
      ...item,
      boundary_name: itemName,
    };
    apiCalls.updateItem(item.boundary_id, itemToUpdate);
    setUpdateToggle(!updateToggle);
  };

  return (
    <>
      {!updateToggle ? (
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell align="center" component="th" scope="row">
            {roomBoundary.boundary_name}
          </TableCell>
          <TableCell align="center">{roomBoundary.boundary_type}</TableCell>
          <TableCell align="center">
            {roomBoundary?.parent_name || ""}
          </TableCell>
          <TableCell align="center">{roomBoundary.uvalue}</TableCell>
          <TableCell align="center">{roomBoundary.area}</TableCell>
          <TableCell align="center">{roomBoundary.net_area}</TableCell>
          <TableCell align="center">
            {roomBoundary.inside_temp - roomBoundary.outside_temp}
          </TableCell>
          <TableCell align="center">{roomBoundary.infilt_heat_loss}</TableCell>
          <TableCell align="center">{roomBoundary.trans_heat_loss}</TableCell>
          <TableCell align="center">{roomBoundary.total_heat_loss}</TableCell>
          <TableCell align="center">
            <Button>
              <IconButton onClick={(e) => handleUpdateSave(e, roomBoundary)}>
                <EditNoteIcon />
              </IconButton>
            </Button>
          </TableCell>
          <TableCell align="center">
            <Button>
              <IconButton onClick={(e) => handleDelete(e, roomBoundary)}>
                <DeleteIcon />
              </IconButton>
            </Button>
          </TableCell>
        </TableRow>
      ) : (
        <form>
          <TextField
            type="text"
            placeholder={roomBoundary?.boundary_name}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            type="text"
            placeholder={roomBoundary?.boundary_type}
            value={boundaryType}
            onChange={(e) => setBoundaryType(e.target.value)}
          />
          <IconButton onClick={(e) => handleUpdateSave(e, roomBoundary)}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => setUpdateToggle(!updateToggle)}>
            <CancelIcon />
          </IconButton>
        </form>
      )}
    </>
  );
};

export default RoomBoundaryTableRow;

// <tr className="items-table-data-row">
//   <td className="items-table-cell-name">
//     {!updateToggle ? (
//       <span className="items-table-cell-name-a">
//         {roomBoundary?.boundary_name}
//       </span>
//     ) : (
//       <form className="item-update-form">
//         <input
//           type="text"
//           className="items-table-cell-name-input"
//           placeholder={roomBoundary?.boundary_name}
//           value={itemName}
//           onChange={(e) => setItemName(e.target.value)}
//           autoFocus
//         />
//       </form>
//     )}
//   </td>
//   <td className="items-table-cell ">
//     {!updateToggle ? (
//       <button onClick={() => handleUpdateIconClick(roomBoundary)}>
//         <span className="material-symbols-outlined">edit_note</span>
//       </button>
//     ) : (
//       <>
//         <button onClick={(e) => handleUpdateSave(e, roomBoundary)}>
//           <span className="material-symbols-outlined">save</span>
//         </button>
//         <button onClick={() => setUpdateToggle(!updateToggle)}>
//           <span className="material-symbols-outlined">cancel</span>
//         </button>
//       </>
//     )}
//   </td>
//   <td className="items-table-cell">
//     <button onClick={() => handleDelete(roomBoundary?.boundary_id)}>
//       <span className="material-symbols-outlined">delete</span>
//     </button>
//   </td>
// </tr>;
