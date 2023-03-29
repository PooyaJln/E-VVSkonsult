import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const projectsURI = "http://localhost:4001/heat-loss/projects";

const initialState = {
  projects: [],
  status: "idle",
  error: null,
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    try {
      const response = await axios.get(projectsURI + "/all");
      return [...response.data];
    } catch (error) {
      return error.error;
    }
  }
);

export const addNewProject = createAsyncThunk(
  "projects/createProject",
  async (initialState) => {
    try {
      const response = await axios.post(projectsURI, initialState);
      return response.data;
    } catch (error) {
      return error.error;
    }
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // getProjects: (state) => state.projects,
    createProject: {
      reducer(state, action) {
        state.projects.push(action.payload);
      },
      prepare(projectName) {
        return {
          project_name: projectName,
        };
      },
    },
    deleteProject: (state, action) => {
      state.projects.filter(
        (project) => project.project_id !== action.payload.project_id
      );
    },
    updateProject: (state, action) =>
      state.projects.map((project) => {
        if (project.project_id === action.payload.project_id) {
          project.project_name = action.payload.project_name;
        }
      }),
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedProjects = action.payload;
        state.projects = state.projects.concat(loadedProjects);
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      });
  },
});
console.log("🚀 ~ file: projectsSlice.js:81 ~ projectsSlice:", projectsSlice);

export const getAllProjects = (state) => state.projects.projects;
export const getProjectsStatus = (state) => state.projects.status;
export const getProjectsError = (state) => state.projects.error;
export const {
  // getProjects,
  createProject,
  deleteProject,
  updateProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
