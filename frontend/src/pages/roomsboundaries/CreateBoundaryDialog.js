import { useEffect, useState, forwardRef } from "react";
import { useParams } from "react-router-dom";
import Draggable from "react-draggable";

import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Stack from "@mui/material/Stack";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Paper from "@mui/material/Paper";

import { useRoomBoundariesContext } from "../../hooks/useRoomBoundariesContext";
import { useTemperaturesContext } from "../../hooks/useTemperaturesContext";
import { useComponentsContext } from "../../hooks/useComponentsContext";
import ErrorDialog from "../../components/ErrorDialog";

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
  const project_id = useParams().project_id;
  const room_id = useParams().room_id;

  const boundaryApiCalls = useRoomBoundariesContext().apiCalls;
  const boundaryUiCalls = useRoomBoundariesContext().uiCalls;
  const boundaryState = useRoomBoundariesContext().state;
  let error = boundaryState?.error || undefined;

  const temperatureApiCalls = useTemperaturesContext().apiCalls;
  const temperatureState = useTemperaturesContext().state;
  let temperatures = temperatureState?.items || [];

  const componentsApiCalls = useComponentsContext().apiCalls;
  const componentsState = useComponentsContext().state;
  let components = componentsState?.items || [];

  let [errorOpen, setErrorOpen] = useState(false);
  let [areaError, setAreaError] = useState(false);

  const [itemName, setItemName] = useState("");
  const [boundaryType, setBoundaryType] = useState("");
  const [hasOpenings, setHasOpenings] = useState("");
  const [isBetween0n1, setIsBetween0n1] = useState("");
  const [isBetween1n6, setIsBetween1n6] = useState("");
  const [area, setArea] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [isGroundConnected, setIsGroundConnected] = useState("");
  const [uValueId, setuValueId] = useState("");
  const [outTempId, setoutTempId] = useState("");
  const [boundaryParentIid, setBoundaryParentId] = useState("");

  const setParentOpen = (value) => {
    setErrorOpen(value);
  };

  const handleReset = () => {
    setItemName("");
    setBoundaryType("");
    setHasOpenings("");
    setIsBetween0n1("");
    setIsBetween1n6("");
    setArea("");
    setLength("");
    setWidth("");
    setIsGroundConnected("");
    setuValueId("");
    setoutTempId("");
    setBoundaryParentId("");
  };

  const handleCreateFormClose = () => {
    setItemName("");
    setBoundaryType("");
    setHasOpenings("");
    setIsBetween0n1("");
    setIsBetween1n6("");
    setArea("");
    setLength("");
    setWidth("");
    setIsGroundConnected("");
    setuValueId("");
    setoutTempId("");
    setBoundaryParentId("");
    props.handleClose();
  };

  const handleBoundaryTypeChange = (e) => {
    setBoundaryType(e.target.value);
    if (e.target.value === "window" || e.target.value === "door") {
      setHasOpenings(false);
      setIsGroundConnected(false);
      setIsBetween0n1(false);
      setIsBetween1n6(false);
    }
  };

  const handleIsGroundConnectedChange = (e) => {
    if (e.target.value === "true") {
      setIsGroundConnected(true);
    } else if (e.target.value === "false") {
      setIsGroundConnected(false);
      setIsBetween0n1(false);
      setIsBetween1n6(false);
    }
  };
  const handleHasOpeningsChange = (e) => {
    if (e.target.value === "true") {
      setHasOpenings(true);
      setIsGroundConnected(false);
      setIsBetween0n1(false);
      setIsBetween1n6(false);
    } else if (e.target.value === "false") {
      setHasOpenings(false);
    }
  };

  const handleIsBetween0n1Change = (e) => {
    if (e.target.value === "true") {
      setIsBetween0n1(true);
      setIsBetween1n6(false);
    } else if (e.target.value === "false") {
      setIsBetween0n1(false);
    }
  };
  const handleArea = (length, width, area) => {
    let _area;
    if (length && width && !area) {
      _area = Number(length) * Number(width);
      return _area;
    }
    if (!length && !width && area) {
      return Number(area);
    }
    if (
      length &&
      width &&
      area &&
      Number(area) !== Number(length) * Number(width)
    ) {
      throw Error("either enter both dimensions or the area");
    }
    if (
      length &&
      width &&
      area &&
      Number(area) === Number(length) * Number(width)
    ) {
      return Number(area);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const _area = handleArea(length, width, area);
      const newItem = {
        room1_id: room_id,
        boundary_name: itemName,
        boundary_type: boundaryType,
        has_openings: hasOpenings,
        groundConnected: isGroundConnected,
        isBetween0_1: isBetween0n1,
        isBetween1_6: isBetween1n6,
        area: _area,
        uvalue_id: uValueId,
        out_temp_id: outTempId,
        boundary_parent_id: boundaryParentIid,
      };
      console.log(
        "🚀 ~ file: CreateBoundaryDialog.js:188 ~ handleSubmit ~ newItem:",
        newItem
      );
      boundaryApiCalls.createItem(room_id, newItem);
      if (!error || error === undefined) {
        handleCreateFormClose();
        props.handleClose();
      }
    } catch (error) {
      boundaryUiCalls.setError(error.message);
      console.error(error);
      setAreaError(true);
      setErrorOpen(true);
    }
  };

  useEffect(() => {
    temperatureApiCalls.getItems(project_id);
    componentsApiCalls.getItems(project_id);
  }, [project_id]);

  return (
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
                  Give this boundary a name
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
                <Typography variant="body2">Either enter dimensions</Typography>
                <TextField
                  type="text"
                  label="length"
                  name="boundary_length"
                  onChange={(e) => setLength(e.target.value)}
                  value={length}
                />
                <TextField
                  type="text"
                  label="width/height"
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
                  onClick={() => setAreaError(false)}
                  error={areaError}
                  helperText={areaError ? areaError : ""}
                  InputProps={{
                    style: {
                      color: areaError ? "red" : "inherit",
                    },
                  }}
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
                {temperatures &&
                  temperatures.map((temperature, index) => (
                    <MenuItem key={index} value={temperature.temperature_id}>
                      {temperature.temperature_name},{" "}
                      {temperature.temperature_value}℃
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
                <MenuItem value="wall">wall</MenuItem>
                <MenuItem value="roof">roof slab</MenuItem>
                <MenuItem value="floor">floor slab</MenuItem>
                <MenuItem value="window">window</MenuItem>
                <MenuItem value="door">door</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={3}>
              <InputLabel id="components">Component material:</InputLabel>
              <Select
                labelId="components"
                onChange={(e) => setuValueId(e.target.value)}
                value={uValueId}
                displayEmpty
                sx={{ m: 1, minWidth: 150 }}
              >
                {components &&
                  components.map((component, index) => (
                    <MenuItem key={index} value={component.component_id}>
                      {component.component_name}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              {boundaryType === "wall" || boundaryType === "roof" ? (
                <Stack spacing={1}>
                  <InputLabel id="hasOpening">
                    Does this wall/roof has any window or door?
                  </InputLabel>
                  <Select
                    labelId="hasOpening"
                    onChange={handleHasOpeningsChange}
                    value={hasOpenings}
                    sx={{ m: 1, minWidth: 150 }}
                    displayEmpty
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </Stack>
              ) : null}
            </Grid>
            <Grid item xs={4}>
              {(boundaryType === "wall" || boundaryType === "floor") &&
              !hasOpenings ? (
                <Stack spacing={1}>
                  <InputLabel id="groundConnected">
                    Is it a slab on ground or an underground wall?
                  </InputLabel>
                  <Select
                    labelId="groundConnected"
                    onChange={handleIsGroundConnectedChange}
                    value={isGroundConnected}
                    displayEmpty
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </Stack>
              ) : null}
              {boundaryType === "window" || boundaryType === "door" ? (
                <Stack spacing={1}>
                  <InputLabel id="parentBoundary">Parent Boundary:</InputLabel>
                  <Select
                    labelId="parentBoundary"
                    onChange={(e) => setBoundaryParentId(e.target.value)}
                    value={boundaryParentIid}
                    displayEmpty
                    sx={{ m: 1, minWidth: 150 }}
                  >
                    {props.roomBoundaries &&
                      props.roomBoundaries.map((boundary, index) => {
                        if (
                          boundary.boundary_type !== "window" &&
                          boundary.boundary_type !== "door"
                        ) {
                          return (
                            <MenuItem key={index} value={boundary.boundary_id}>
                              {boundary.boundary_name}
                            </MenuItem>
                          );
                        }
                      })}
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
                    onChange={(e) => handleIsBetween0n1Change(e)}
                    value={isBetween0n1}
                    displayEmpty
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </Stack>
              ) : null}
            </Grid>
            <Grid item xs={4}>
              {isGroundConnected && !isBetween0n1 ? (
                <Stack spacing={1}>
                  <InputLabel id="isBetween1n6">
                    is it between 1 to 6 meter from the building's border or
                    under ground:
                  </InputLabel>
                  <Select
                    labelId="isBetween1n6"
                    onChange={(e) => setIsBetween1n6(e.target.value)}
                    value={isBetween1n6}
                    required
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </Stack>
              ) : null}
            </Grid>
          </Grid2>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => handleSubmit(e)}>Save</Button>
        <Button onClick={handleCreateFormClose}>Cancel</Button>
        <Button onClick={handleReset}>Reset</Button>
      </DialogActions>
      {error && (
        <ErrorDialog
          error={error}
          open={errorOpen}
          setParentOpen={setParentOpen}
        />
      )}
    </Dialog>
  );
}
