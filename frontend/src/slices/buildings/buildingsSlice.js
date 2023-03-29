import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buildings: [],
  status: "idle",
  error: null,
};

export const buildingsSlice = createSlice({
  name: "buildings",
  initialState,
  reducers: {
    createBuilding: (state, action) => {
      state.buildings.push(action.payload);
    },
    updateBuilding: (state, action) => {},
    deleteBuilding: (state, action) => {
      state.buildings.filter(
        (building) => building.building_id !== action.payload.building_id
      );
    },
  },
});

export const getAllProjects = (state) => state.projects;
export const { createBuilding, updateBuilding, deleteBuilding } =
  buildingsSlice.actions;
export default buildingsSlice.reducer;
