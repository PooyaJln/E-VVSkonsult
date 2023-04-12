import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import {
  Container,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import { useRoomBoundariesContext } from "../../hooks/useRoomBoundariesContext";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function CreateBoundaryDialog(props) {
  // const handleClickOpen = () => {
  //   props.setParentCreateOpenDialog(true);
  // };

  // const handleClose = () => {
  //   props.setParentCreateOpenDialog(false);
  // };
  const room_id = useParams().room_id;

  const boundaryApiCalls = useRoomBoundariesContext().apiCalls;
  const boundaryUiCalls = useRoomBoundariesContext().uiCalls;

  const [itemName, setItemName] = useState("");
  const [boundaryType, setBoundaryType] = useState("");
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

  const handleBoundaryTypeChange = (e) => {
    setBoundaryType(e.target.value);
    if (e.target.value === "window" || e.target.value === "door") {
      setHasOpenings(false);
      setIsGroundConnected(false);
    }
  };

  const handleIsGroundConnectedChange = (e) => {
    if (e.target.value === "true") {
      setIsGroundConnected(true);
    } else if (e.target.value === "false") {
      setIsGroundConnected(false);
    }
    if (e.target.value === "false") {
      setIsBetween0n1(false);
      setIsBetween1n6(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      boundary_name: itemName,
      boundary_type: boundaryType,
      has_openings: hasOpenings,
      groundConnected: isGroundConnected,
      isBetween0_1: isBetween0n1,
      isBetween1_6: isBetween1n6,
      area: area,
      uvalue_id: uValueId,
      out_temp_id: outTempId,
      boundary_parent_id: boundaryParentIid,
    };

    boundaryApiCalls.createItem(room_id, newItem);
    setItemName("");
    !props.error ? props.setParentToggle(false) : props.setParentToggle(true);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Create a Room Boundary
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <Grid2 container gap={2}>
              <Grid item xs={3}>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    type in for a new room boundary
                  </Typography>
                  <TextField
                    variant="outlined"
                    label="room boundary name"
                    name="boundary_name"
                    onChange={(e) => setItemName(e.target.value)}
                    value={itemName}
                    autoFocus
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    Either enter dimensions
                  </Typography>
                  <TextField
                    type="text"
                    label="length"
                    name="boundary_length"
                    onChange={(e) => setLength(e.target.value)}
                    value={length}
                  />
                  <TextField
                    type="text"
                    label="width"
                    name="boundary_width"
                    onChange={(e) => setWidth(e.target.value)}
                    value={width}
                  />
                  <Typography variant="body2">or only the area</Typography>
                  <TextField
                    type="text"
                    label="area"
                    name="boundary_area"
                    onChange={(e) => setArea(e.target.value)}
                    value={area}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <InputLabel id="outTempId">cold side temperature:</InputLabel>
                <Select
                  labelId="outTempId"
                  onChange={(e) => setoutTempId(e.target.value)}
                  value={outTempId}
                  displayEmpty
                  sx={{ m: 1, minWidth: 150 }}
                >
                  {props.temperatures &&
                    props.temperatures.map((temperature, index) => (
                      <MenuItem key={index} value={temperature.temperature_id}>
                        {temperature.temperature_name}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
              <Grid item xs={3}>
                <InputLabel id="components">Component material:</InputLabel>
                <Select
                  labelId="components"
                  // className="create-material-select-categ"
                  onChange={(e) => setuValueId(e.target.value)}
                  value={uValueId}
                  displayEmpty
                  sx={{ m: 1, minWidth: 150 }}
                >
                  {props.temperatures &&
                    props.temperatures.map((temperature, index) => (
                      <MenuItem key={index} value={temperature.temperature_id}>
                        {temperature.temperature_name}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
            </Grid2>
            <Grid2 container gap={2}>
              <Grid item xs={4}>
                <InputLabel id="boundary_type_label">
                  Choose a Category:
                </InputLabel>
                <Select
                  labelId="boundary_type_label"
                  id="boundary_type"
                  value={boundaryType}
                  label="boundary_type"
                  onChange={handleBoundaryTypeChange}
                  sx={{ m: 1, minWidth: 215 }}
                  displayEmpty
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="wall">wall</MenuItem>
                  <MenuItem value="roof">roof slab</MenuItem>
                  <MenuItem value="floor">floor slab</MenuItem>
                  <MenuItem value="window">window</MenuItem>
                  <MenuItem value="door">door</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                {boundaryType === "wall" || boundaryType === "floor" ? (
                  <Stack spacing={1}>
                    <InputLabel id="groundConnected">
                      slab on ground / underground wall?:
                    </InputLabel>
                    <Select
                      labelId="groundConnected"
                      onChange={handleIsGroundConnectedChange}
                      value={isGroundConnected}
                      displayEmpty
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value="true">Yes</MenuItem>
                      <MenuItem value="false">No</MenuItem>
                    </Select>
                  </Stack>
                ) : null}
                {boundaryType === "window" || boundaryType === "door" ? (
                  <Stack spacing={1}>
                    <InputLabel id="parentBoundary">
                      Parent Boundary:
                    </InputLabel>
                    <Select
                      labelId="parentBoundary"
                      // className="create-material-select-categ"
                      onChange={(e) => setBoundaryParentId(e.target.value)}
                      value={outTempId}
                      displayEmpty
                      sx={{ m: 1, minWidth: 150 }}
                    >
                      <MenuItem value=""></MenuItem>
                      {props.roomBoundaries &&
                        props.roomBoundaries.map((boundary, index) => {
                          if (
                            boundary.boundary_type !== "window" &&
                            boundary.boundary_type !== "door"
                          ) {
                            return (
                              <MenuItem
                                key={index}
                                value={boundary.boundary_id}
                              >
                                {boundary.boundary_name}
                              </MenuItem>
                            );
                          }
                        })}
                    </Select>
                  </Stack>
                ) : null}
              </Grid>
              <Grid item xs={4}>
                {(boundaryType === "wall" ||
                  boundaryType === "roof" ||
                  boundaryType === "floor") &&
                !isGroundConnected ? (
                  <Stack spacing={1}>
                    <InputLabel id="hasOpening">
                      any door/window in this wall/roof?:
                    </InputLabel>
                    <Select
                      labelId="hasOpening"
                      onChange={(e) => setHasOpenings(e.target.value)}
                      value={hasOpenings}
                      sx={{ m: 1, minWidth: 150 }}
                      displayEmpty
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value="true">Yes</MenuItem>
                      <MenuItem value="false">No</MenuItem>
                    </Select>
                  </Stack>
                ) : null}
              </Grid>
            </Grid2>
            <Grid2 container gap={2}>
              <Grid item xs={4}>
                {isGroundConnected ? (
                  <Stack spacing={1}>
                    <InputLabel id="isBetween0n1">
                      is it between 0 to 1 meter from the building's border or
                      under ground:
                    </InputLabel>
                    <Select
                      labelId="isBetween0n1"
                      // className="create-material-select-categ"
                      onChange={(e) => setIsBetween0n1(e.target.value)}
                      value={isBetween0n1}
                      displayEmpty
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value="true">Yes</MenuItem>
                      <MenuItem value="false">No</MenuItem>
                    </Select>
                  </Stack>
                ) : null}
              </Grid>
              <Grid item xs={4}>
                {isGroundConnected ? (
                  <Stack spacing={1}>
                    <InputLabel id="isBetween1n6">
                      is it between 1 to 6 meter from the building's border or
                      under ground:
                    </InputLabel>
                    <Select
                      labelId="isBetween1n6"
                      // className="create-material-select-categ"
                      onChange={(e) => setIsBetween1n6(e.target.value)}
                      value={isBetween1n6}
                      required
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value="true">Yes</MenuItem>
                      <MenuItem value="false">No</MenuItem>
                    </Select>
                  </Stack>
                ) : null}
              </Grid>
            </Grid2>
            <div>
              <IconButton onClick={(e) => handleSubmit(e)}>
                <SaveIcon />
              </IconButton>
              <IconButton onClick={() => props.setParentToggle(false)}>
                <CancelIcon />
              </IconButton>
            </div>
          </form>
        </DialogContent>
        {/* <DialogActions>
          <IconButton onClick={(e) => handleSubmit(e)}>
            <SaveIcon />
          </IconButton>

          <IconButton onClick={() => props.setParentToggle(false)}>
            <CancelIcon />
          </IconButton>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
