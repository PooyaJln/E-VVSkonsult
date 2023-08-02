import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRoomsContext } from "../../hooks/useRoomsContext";
import CreateRoomBoundary from "./CreateRoomBoundary";
import RoomBoundaryTableRow from "./RoomBoundaryTableRow";
import { useRoomBoundariesContext } from "../../hooks/useRoomBoundariesContext";

import ErrorDialog from "../../components/ErrorDialog";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import { Box, Stack, Typography } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateBoundaryDialog from "./CreateBoundaryDialog";

const ItemsList = (props) => {
  const room_id = useParams().room_id;
  const project_id = useParams().project_id;
  const roomState = useRoomsContext().state;
  const roomApiCalls = useRoomsContext().apiCalls;
  const room = roomState?.item || {};
  const roomBoundaryState = useRoomBoundariesContext().state;
  const roomBoundaryApiCalls = useRoomBoundariesContext().apiCalls;
  let roomBoundaries = roomBoundaryState?.items || [];
  const roomHeatLoss = roomBoundaries.reduce(
    (sum, boundary) => sum + boundary.total_heat_loss,
    0
  );

  let error = roomBoundaryState?.error || undefined;
  let errorOpen = roomBoundaryState?.open || false;
  const createToggle = roomBoundaryState?.createToggle;

  const [toggle, setToggle] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [UpdateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleClose = () => {
    setCreateDialogOpen(false);
  };

  const handleCreatePlusButtonClick = () => {
    setCreateDialogOpen(true);
  };
  const handleUpdateButtonClick = () => {
    setUpdateDialogOpen(true);
  };

  const handleDelete = async (obj) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${obj.boundary_type}? `
      )
    ) {
      roomBoundaryApiCalls.deleteItem(obj.boundary_id);
    }
  };

  useEffect(() => {
    roomApiCalls.getItem(room_id);
    roomBoundaryApiCalls.getItems(room_id);
  }, [room_id]);

  return (
    <>
      <h2>Room: {room?.room_name}</h2>
      <h2>heat loss: {roomHeatLoss} W</h2>
      {/* {error && (
        <ErrorDialog
          error={error}
          open={errorOpen}
          setParentOpen={setParentOpen}
          setParentToggle={setParentToggle}
        />
      )} */}
      <Stack spacing={3}>
        <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
          <Button
            onClick={handleCreatePlusButtonClick}
            type="submit"
            variant="outlined"
          >
            <AddIcon fontSize="medium" />
          </Button>

          <Typography variant="body2" gutterBottom>
            add a wall / Door / Window
          </Typography>
        </Box>

        {/* {toggle && (
          <CreateRoomBoundary
            temperatures={temperatures}
            roomBoundaries={roomBoundaries}
            setParentToggle={setParentToggle}
          />
        )} */}
        {/* {toggle && (
          <CreateBoundaryDialog
            open={createDialogOpen}
            temperatures={temperatures}
            roomBoundaries={roomBoundaries}
            setParentToggle={setParentToggle}
            handleClose={handleClose}
          />
        )} */}
        {/* <CreateBoundaryDialog
          open={createDialogOpen}
          // temperatures={temperatures}
          roomBoundaries={roomBoundaries}
          setParentToggle={setParentToggle}
          setParentError={setParentError}
          setParentOpen={setParentOpen}
          handleClose={handleClose}
        /> */}
        <CreateBoundaryDialog
          open={createDialogOpen}
          roomBoundaries={roomBoundaries}
          handleClose={handleClose}
        />

        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Parent boundary</TableCell>
                <TableCell align="center">
                  U-Value [W/m<sup>2</sup>.K]
                </TableCell>
                <TableCell align="center">
                  Total Area [ m<sup>2</sup>]
                </TableCell>
                <TableCell align="center">
                  Net Area [ m<sup>2</sup>]
                </TableCell>
                <TableCell align="center">ΔT [℃]</TableCell>
                <TableCell align="center">Inf. heat loss [W]</TableCell>
                <TableCell align="center">trans. heat loss [W]</TableCell>
                <TableCell align="center">Total heat loss [W]</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomBoundaries.map((boundary, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {boundary.boundary_name}
                  </TableCell>
                  <TableCell align="center">{boundary.boundary_type}</TableCell>
                  <TableCell align="center">
                    {boundary?.parent_name || ""}
                  </TableCell>
                  <TableCell align="center">{boundary.uvalue}</TableCell>
                  <TableCell align="center">{boundary.area}</TableCell>
                  <TableCell align="center">{boundary.net_area}</TableCell>
                  <TableCell align="center">
                    {boundary.inside_temp - boundary.outside_temp}
                  </TableCell>
                  <TableCell align="center">
                    {boundary.infilt_heat_loss}
                  </TableCell>
                  <TableCell align="center">
                    {boundary.trans_heat_loss}
                  </TableCell>
                  <TableCell align="center">
                    {boundary.total_heat_loss}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={(e) => handleUpdateButtonClick(e, boundary)}
                    >
                      <EditNoteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(e) => handleDelete(boundary)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Parent boundary</TableCell>
                <TableCell align="center">U-Value</TableCell>
                <TableCell align="center">Total Area</TableCell>
                <TableCell align="center">Net Area</TableCell>
                <TableCell align="center">ΔT</TableCell>
                <TableCell align="center">Inf. heat loss</TableCell>
                <TableCell align="center">trans. heat loss</TableCell>
                <TableCell align="center">Total heat loss</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomBoundaries &&
                roomBoundaries.map((boundary, index) => (
                  <RoomBoundaryTableRow key={index} roomBoundary={boundary} />
                ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Stack>
    </>
  );
};

export default ItemsList;

// <div className="room-boundaries">
//   {error && (
//     <ErrorDialog
//       error={error}
//       open={open}
//       setParentOpen={setParentOpen}
//       setParentToggle={setParentToggle}
//     />
//   )}

//   <div className="boundary-items ">
//     <div>
//       <button
//         onClick={handleCreatePlusButtonClick}
//         type="submit"
//         variant="contained"
//         // onClick={() => setToggle(true)}
//         // endIcon={<AddIcon fontSize="large" />}
//       >
//         {/* <span className="material-symbols-outlined">add</span> */}
//         <AddIcon fontSize="medium" />
//       </button>
//       {/* <IconButton onClick={handleCreatePlusButtonClick}>
//         <AddIcon fontSize="large" />
//       </IconButton> */}
//       <span>add a wall / Door / Window</span>
//     </div>
//     <div className="create-room-boundary">
//       {toggle && (
//         <CreateRoomBoundary
//           temperatures={temperatures}
//           setParentToggle={setParentToggle}
//         />
//       )}
//     </div>
//     <div className="boundaries-list">
//       <ul>
//         {roomBoundaries &&
//           roomBoundaries.map((roomBoundary, index) => (
//             <RoomBoundaryTableRow
//               key={index + 2}
//               roomBoundary={roomBoundary}
//             />
//           ))}
//       </ul>
//     </div>
//   </div>
// </div>;

// testing List
// <List>
//   <ListItem>
//     <ListSubheader>Name</ListSubheader>
//     <ListSubheader>Type</ListSubheader>
//     <ListSubheader>located in:</ListSubheader>
//     <ListSubheader>U-Value</ListSubheader>
//     <ListSubheader>Total area</ListSubheader>
//     <ListSubheader>net area</ListSubheader>
//     <ListSubheader>
//       <span>&#916;</span>T
//     </ListSubheader>
//     <ListSubheader>Infiltration heat Loss</ListSubheader>
//     <ListSubheader>Transmission heat Loss</ListSubheader>
//     <ListSubheader>Total heat Loss</ListSubheader>
//   </ListItem>

//   {roomBoundaries &&
//     roomBoundaries.map((roomBoundary, index) => (
//       <RoomBoundaryTableRow key={index + 2} roomBoundary={roomBoundary} />
//     ))}
// </List>;

// testing DataGrid
// const columns = [
//   { field: "Name", headerName: "Name", width: 150 },
//   { field: "Type", headerName: "Type", width: 150 },
//   { field: "col3", headerName: "Parent boundary", width: 150 },
//   { field: "col4", headerName: "U-Value", width: 150 },
//   { field: "col5", headerName: "Total area", width: 150 },
//   { field: "col6", headerName: "Net area", width: 150 },
//   { field: "col7", headerName: "ΔT", width: 150 },
//   { field: "col8", headerName: "Infiltration heat Loss", width: 175 },
//   { field: "col9", headerName: "Transmission heat Loss", width: 175 },
//   { field: "col10", headerName: "Total heat Loss", width: 150 },
// ];
// let _rows = [];

// roomBoundaries.forEach((boundary, index) => {
//   let obj = {
//     id: index + 1,
//     Name: boundary.boundary_name,
//     Type: boundary.boundary_type,
//     col3: boundary?.parent_name || "",
//     col4: boundary.uvalue,
//     col5: boundary.area,
//     col6: boundary.net_area,
//     col7: boundary.inside_temp - boundary.outside_temp,
//     col8: boundary.infilt_heat_loss,
//     col9: boundary.trans_heat_loss,
//     col10: boundary.total_heat_loss,
//   };
//   _rows.push(obj);
// });

// const rows = _rows;
