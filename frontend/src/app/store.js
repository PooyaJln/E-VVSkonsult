import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "../slices/projects/projectsSlice";
// import buildingReducer from "../slices/buildings/buildingsSlice";

console.log("🚀 ~ file: store.js:3 ~ projectsReducer:", projectsReducer);
export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    // buildings: buildingReducer,
  },
});
console.log("🚀 ~ file: store.js:12 ~ store:", store);
